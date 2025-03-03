import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../configs/FirebaseConfig';

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerShown: false,
  //   });
  // }, []);

  const onSignIn = () => {
    if (!email && !password) {
      ToastAndroid.show('Please enter Email & Password', ToastAndroid.BOTTOM);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        ToastAndroid.show('Signed In successfully', ToastAndroid.BOTTOM);
        router.replace('/mytrip');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // console.log(errorCode);
        if(errorCode=='auth/invalid-credential'){
          ToastAndroid.show("Invalid credentials",ToastAndroid.LONG)
        }
      });
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 60,
        backgroundColor: Colors.WHITE,
        height: '100%',
      }}
    >
      {/* Back button */}
      <TouchableOpacity onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      <Text style={{ fontFamily: 'roboto-bold', fontSize: 30, paddingTop: 30 }}>
        Let's Sign You In
      </Text>
      <Text
        style={{
          fontFamily: 'roboto-regular',
          fontSize: 30,
          color: Colors.GRAY,
          marginTop: 20,
        }}
      >
        Welcome Back
      </Text>
      <Text
        style={{
          fontFamily: 'roboto-regular',
          fontSize: 30,
          color: Colors.GRAY,
          marginTop: 10,
        }}
      >
        You've been missed!
      </Text>

      {/* Email */}
      <View style={{ marginTop: 50 }}>
        <Text style={{ fontFamily: 'roboto-regular' }}>Email</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          onChangeText={(value) => setEmail(value)}
        />
      </View>

      {/* Password */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontFamily: 'roboto-regular' }}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Enter Password"
          onChangeText={(value) => setPassword(value)}
        />
      </View>

      {/* Sign In Button */}
      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 50,
        }}
        onPress={onSignIn}
      >
        <Text style={{ color: Colors.WHITE, textAlign: 'center' }}>
          Sign In
        </Text>
      </TouchableOpacity>

      {/* Create Account Button */}
      <TouchableOpacity onPress={() => router.push('/auth/sign-up')}>
        <View
          style={{
            padding: 15,
            backgroundColor: Colors.WHITE,
            borderRadius: 15,
            marginTop: 20,
            borderWidth: 1,
          }}
        >
          <Text style={{ color: Colors.PRIMARY, textAlign: 'center' }}>
            Create Account
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    fontFamily: 'roboto-regular',
  },
});
