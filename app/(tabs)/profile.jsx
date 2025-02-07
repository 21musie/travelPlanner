import React, { useState } from 'react';
import { 
    View, Text, TextInput, TouchableOpacity, 
    StyleSheet, Alert, Image, KeyboardAvoidingView, 
    ScrollView, Platform, Keyboard, TouchableWithoutFeedback 
} from 'react-native';
import { auth } from '@/configs/FirebaseConfig';
import { reauthenticateWithCredential, updatePassword, EmailAuthProvider } from 'firebase/auth';

export default function ProfileUpdate() {
    const user = auth.currentUser;
    
    const [currentPassword, setCurrentPassword] = useState('');
    const [newEmail, setNewEmail] = useState(user?.email || '');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Function to reauthenticate the user
    const reauthenticateUser = async () => {
        if (!user || !currentPassword) {
            Alert.alert('Error', 'Please enter your current password to proceed.');
            return false;
        }

        const credential = EmailAuthProvider.credential(user.email || '', currentPassword);
        try {
            await reauthenticateWithCredential(user, credential);
            return true;
        } catch (error) {
            Alert.alert('Authentication Failed', 'Incorrect password. Please try again.');
            return false;
        }
    };

    // Function to update email and/or password
    const handleUpdate = async () => {
        setLoading(true);
        try {
            const isReauthenticated = await reauthenticateUser();
            if (!isReauthenticated) return;

            if (newPassword.length > 0) {
                await updatePassword(user, newPassword);
                Alert.alert('Success', 'Password updated successfully!');
            }

            Alert.alert('Profile Updated', 'Your profile has been updated.');
        } catch (error) {
            Alert.alert('Update Failed', error.message || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView 
                    contentContainerStyle={styles.scrollContainer} 
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.innerContainer}>
                        <Image
                            source={require('../../assets/images/profileSettings.png')}
                            style={styles.profileImage}
                        />
                        <Text style={styles.title}>Update Profile</Text>

                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter new email"
                            value={newEmail}
                            onChangeText={setNewEmail}
                            editable={false}
                            keyboardType="email-address"
                        />

                        <Text style={styles.label}>New Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter new password"
                            secureTextEntry
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />

                        <Text style={styles.label}>Current Password (Required)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter current password"
                            secureTextEntry
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                        />

                        <TouchableOpacity style={styles.button} onPress={handleUpdate} disabled={loading}>
                            <Text style={styles.buttonText}>{loading ? 'Updating...' : 'Update Profile'}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingBottom: 150, // Ensures space for the button
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
    },
    input: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});