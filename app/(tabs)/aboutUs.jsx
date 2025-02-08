// import { StyleSheet, Text, View, FlatList } from 'react-native';
// import React from 'react';
// import { Colors } from '@/constants/Colors';

// const places = [
//     { id: '1', name: 'Musie Mengesha' },
//     { id: '2', name: 'Natnael Ambachew' },
//     { id: '3', name: 'Yeabsira Fikr' },
//     { id: '4', name: 'Yunus Mohammed' },
// ];

// export default function Aboutus() {
//     return (
//         <View style={styles.page}>
//             <Text style={styles.header}>Group Members</Text>
//             <FlatList
//                 data={places}
//                 keyExtractor={(item) => item.id}
//                 renderItem={({ item }) => (
//                     <View style={styles.card}>
//                         <Text style={styles.placeText}>{item.name}</Text>
//                     </View>
//                 )}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     page: {
//         padding: 25,
//         paddingTop: 100,
//         flex: 1,
//         backgroundColor: Colors.WHITE,
//     },
//     header: {
//         fontSize: 30,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         textAlign: 'center',
//         color: Colors.primary,
//     },
//     card: {
//         backgroundColor: '#f0f0f0',
//         padding: 15,
//         borderRadius: 10,
//         marginBottom: 15,
//         shadowColor: '#000',
//         shadowOpacity: 0.1,
//         shadowRadius: 5,
//         elevation: 3,
//         alignItems: 'center',
//     },
//     placeText: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: Colors.BLACK,
//     },
// });



import React from "react";
import { View, Text, TouchableOpacity, Linking, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import the icon library

export default function AboutUs() {
  const phoneNumber = "0914600242";
  const telegramUsername = "mohjema"; // Removed '@' as it's added in the link

  const handlePhoneCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleTelegram = () => {
    Linking.openURL(`https://t.me/${telegramUsername}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.description}>
        We are a team of expert developers specializing in mobile apps, websites, and ERP solutions.
        Our mission is to build high-quality, scalable, and user-friendly digital products tailored to your business needs.
      </Text>

      <TouchableOpacity style={styles.contactButton} onPress={handlePhoneCall}>
        <Icon name="phone" size={20} color="#fff" />
        <Text style={styles.buttonText}>Call Us</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.contactButton} onPress={handleTelegram}>
        <Icon name="send" size={20} color="#fff" />
        <Text style={styles.buttonText}>Message on Telegram</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    width: "80%",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
