import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';

const places = [
    { id: '1', name: 'Musie Mengesha' },
    { id: '2', name: 'Natnael Ambachew' },
    { id: '3', name: 'Yeabsira Fikr' },
    { id: '4', name: 'Yunus Mohammed' },
];

export default function Aboutus() {
    return (
        <View style={styles.page}>
            <Text style={styles.header}>Group Members</Text>
            <FlatList
                data={places}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.placeText}>{item.name}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        padding: 25,
        paddingTop: 100,
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: Colors.primary,
    },
    card: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        alignItems: 'center',
    },
    placeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.BLACK,
    },
});