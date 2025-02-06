import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import { collection, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../configs/firebaseConfig';
import { Colors } from '@/constants/Colors';

// Define TypeScript interface for Trip Data
interface TripData {
    location: {
        name: string;
        photo: string;
    };
    travelDuration: {
        startDate: any; // Firestore Timestamp
        endDate: any;   // Firestore Timestamp
    };
    travelers: {
        people: string;
        title: string;
    };
    tripPlan: {
        bestTimeToVisit: string;
        dailyPlan: {
            day: string;
            schedule: {
                time: string;
                activity: string;
                location: string;
            }[]; 
        }[];
        flight?: {
            details?: {
                departureAirport: string;
                arrivalAirport: string;
                departureDate: string;
                departureTime: string;
            };
            price?: {
                amount: string;
                currency: string;
            };
        };
        hotel?: {
            name: string;
            price: string;
            rating: number;
            imageUrl: string;
        }[];
        placesToVisit?: {
            name: string;
            ticketPricing: string;
            timeToTravel: string;
            imageUrl: string;
        }[];
    };
}

export default function MyTrip() {
    const [tripData, setTripData] = useState<TripData | null>(null);
    const [loading, setLoading] = useState(false);
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            getTripData();
        }
    }, [user]);

    const getTripData = async () => {
        setLoading(true);
        try {
            const docRef = doc(db, 'UserTrip', '1738762403914'); // Replace with actual document ID
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                console.log('Fetched trip data:', data);
                setTripData(data?.tripData as TripData); // Type assertion
            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.error('Error fetching trip data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />;
    }

    if (!tripData) {
        return <Text style={styles.errorText}>No trip data found.</Text>;
    }

    // Convert Timestamps to Date objects
    const startDate = tripData?.travelDuration?.startDate?.toDate
        ? tripData.travelDuration.startDate.toDate().toLocaleDateString()
        : 'N/A';
    const endDate = tripData?.travelDuration?.endDate?.toDate
        ? tripData.travelDuration.endDate.toDate().toLocaleDateString()
        : 'N/A';

    return (
        <ScrollView style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>My Trip to {tripData?.location?.name}</Text>
                <TouchableOpacity>
                    <FontAwesome6 name="circle-plus" size={35} color={Colors.primary} />
                </TouchableOpacity>
            </View>

            {/* Trip Details */}
            <View style={styles.card}>
                {tripData?.location?.photo && (
                    <Image source={{ uri: tripData.location.photo }} style={styles.image} />
                )}
                <Text style={styles.tripTitle}>{tripData?.location?.name}</Text>
                <Text style={styles.text}>
                    📅 {startDate} - {endDate}
                </Text>
                <Text style={styles.text}>
                    👨‍👩‍👧‍👦 {tripData?.travelers?.people} ({tripData?.travelers?.title})
                </Text>
                <Text style={styles.text}>🗺️ Best Time to Visit: {tripData?.tripPlan?.bestTimeToVisit}</Text>
            </View>

            {/* Flight Details */}
            {tripData?.tripPlan?.flight && (
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>✈️ Flight Details</Text>
                    <Text style={styles.text}>
                        🛫 {tripData?.tripPlan?.flight?.details?.departureAirport} → {tripData?.tripPlan?.flight?.details?.arrivalAirport}
                    </Text>
                    <Text style={styles.text}>
                        ⏳ {tripData?.tripPlan?.flight?.details?.departureDate} at {tripData?.tripPlan?.flight?.details?.departureTime}
                    </Text>
                    <Text style={styles.text}>
                        💵 {tripData?.tripPlan?.flight?.price?.amount} {tripData?.tripPlan?.flight?.price?.currency}
                    </Text>
                </View>
            )}

            {/* Hotels */}
            {tripData?.tripPlan?.hotel && (
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>🏨 Hotels</Text>
                    {tripData?.tripPlan?.hotel?.map((hotel, index) => (
                        <View key={index} style={styles.hotelItem}>
                            <Image source={{ uri: hotel.imageUrl }} style={styles.hotelImage} />
                            <View>
                                <Text style={styles.text}>{hotel.name}</Text>
                                <Text style={styles.text}>⭐ {hotel.rating} | 💵 {hotel.price} USD</Text>
                            </View>
                        </View>
                    ))}
                </View>
            )}

            {/* Places to Visit */}
            {tripData?.tripPlan?.placesToVisit && (
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>📍 Places to Visit</Text>
                    {tripData?.tripPlan?.placesToVisit?.map((place, index) => (
                        <View key={index} style={styles.placeItem}>
                            <Image source={{ uri: place.imageUrl }} style={styles.placeImage} />
                            <View>
                                <Text style={styles.text}>{place.name}</Text>
                                <Text style={styles.text}>🎟 {place.ticketPricing} | ⏳ {place.timeToTravel}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            )}

            {/* Daily Schedule  */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>📅 Daily Schedules</Text>
                {tripData?.tripPlan?.dailyPlan?.map((day, index) => (
                    <View key={index} style={styles.itineraryDay}>
                        <Text style={styles.dayTitle}>{day.day}</Text>
                        {day.schedule.map((event, idx) => (
                            <Text key={idx} style={styles.text}>⏰ {event.time} - {event.activity} ({event.location})</Text>
                        ))}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    page: { 
        padding: 20, 
        backgroundColor: 'white',
        flex: 1 
    },
    header: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 20 
    },
    headerText: { 
        fontSize: 30, 
        fontFamily: 'outfit-bold', 
        color: Colors.primary 
    },
    card: { 
        backgroundColor: '#ffffff', 
        padding: 20, 
        borderRadius: 15, 
        marginBottom: 15, 
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5 
    },
    tripTitle: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 5, 
        color: '#333' 
    },
    text: { 
        fontSize: 16, 
        marginBottom: 5, 
        color: '#666' 
    },
    sectionTitle: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        marginBottom: 10, 
        color: Colors.primary 
    },
    image: { 
        width: '100%', 
        height: 200, 
        borderRadius: 15, 
        marginBottom: 15 
    },
    hotelItem: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 15 
    },
    hotelImage: { 
        width: 80, 
        height: 80, 
        borderRadius: 15, 
        marginRight: 15 
    },
    placeItem: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 15 
    },
    placeImage: { 
        width: 80, 
        height: 80, 
        borderRadius: 15, 
        marginRight: 15 
    },
    itineraryDay: { 
        marginBottom: 20 
    },
    dayTitle: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 10, 
        color: '#333' 
    },
    loader: { 
        marginTop: 50 
    },
    errorText: { 
        textAlign: 'center', 
        color: 'red' 
    },
});
