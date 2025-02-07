import React, { useEffect, useState } from 'react';
import { 
    View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, Alert 
} from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import Timeline from 'react-native-timeline-flatlist';
import { auth, db } from '@/configs/firebaseConfig';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default function MyTrips() {
    const user = auth.currentUser;
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    const backgroundColors = [
        '#B2EBF2', '#FFE0B2', '#C5E1A5', '#FFCCBC', '#D1C4E9', '#FFECB3', '#B3E5FC'
    ];

    useEffect(() => {
        const fetchTrips = async () => {
            if (!user) return;
            setLoading(true);

            try {
                const q = query(collection(db, 'userTrips'), where('userEmail', '==', user.email));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const fetchedTrips = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setTrips(fetchedTrips);
                } else {
                    setTrips([]);
                }
            } catch (error) {
                console.error('Error fetching trips:', error);
                Alert.alert('Error', 'Failed to load trips.');
            } finally {
                setLoading(false); 
            }
        };

        fetchTrips();
    }, [user]);

    if (loading) {
        return <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />;
    }

    if (trips.length === 0) {
        return (
            <View style={styles.center}>
                <Text style={styles.noTripText}>No trips found for your account.</Text>
            </View>
        );
    }

    const handleDeleteTrip = (tripId) => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this trip?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            await deleteDoc(doc(db, 'userTrips', tripId));
                            setTrips(trips.filter(trip => trip.id !== tripId));
                            Alert.alert('Success', 'Trip deleted successfully.');
                        } catch (error) {
                            console.error('Error deleting trip:', error);
                            Alert.alert('Error', 'Failed to delete trip.');
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <>
            <View style={styles.container}>
                <Image
                    source={require('../../assets/images/travelBag.png')}
                    style={{ width: 40, height: 40, alignSelf: 'center' }} 
                />
                <Text style={styles.title}>MyTrip</Text>
                <Image
                    source={require('../../assets/images/passport.png')}
                    style={{ width: 40, height: 40, alignSelf: 'center' }} 
                />
            </View>

            <FlatList
                data={trips}
                keyExtractor={(item) => item.id}
                renderItem={({ item: tripData, index }) => (
                    <View style={[styles.tripContainer, { backgroundColor: backgroundColors[index % backgroundColors.length] }]}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>
                                {trips.indexOf(tripData) + 1}. Trip to {tripData?.tripData?.location?.name || 'Unknown'}
                            </Text>
                            <TouchableOpacity onPress={() => handleDeleteTrip(tripData.id)}>
                                <Image
                                    source={require('../../assets/images/delete.png')}
                                    style={{ width: 50, height: 50, alignSelf: 'center' }} 
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.card}>
                            <Image
                                source={{
                                    uri: tripData?.tripData?.location?.photoRef
                                        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${tripData.tripData.location.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY}`
                                        : 'https://img.freepik.com/free-vector/travel-background-flat-style_23-2147765771.jpg'
                                }}
                                style={styles.image} 
                            />
                            <Text style={styles.tripTitle}>{tripData?.tripData?.location?.name || 'Unnamed Location'}</Text>
                            <Text style={styles.text}>
                                📅 {tripData?.tripData?.travelDuration?.startDate?.toDate()?.toLocaleDateString() || 'N/A'} -
                                {tripData?.tripData?.travelDuration?.endDate?.toDate()?.toLocaleDateString() || 'N/A'}
                            </Text>
                            <Text style={styles.text}>
                                👨‍👩‍👧‍👦 {tripData?.tripData?.travelers?.people || 'N/A'} ({tripData?.tripData?.travelers?.title || 'N/A'})
                            </Text>
                            <Text style={styles.text}>🗺️ Best Time to Visit: {tripData?.tripPlan?.bestTimeToVisit || 'N/A'}</Text>
                        </View>

                        {/* Flight Details */}
                        <View style={styles.card}>
                            <Text style={styles.sectionTitle}>✈️ Flight Details</Text>
                            <Text style={styles.text}>🛫 {tripData.tripPlan?.flight?.details?.departureAirport} → {tripData.tripPlan?.flight?.details?.arrivalAirport}</Text>
                            <Text style={styles.text}>⏳ {tripData.tripPlan?.flight?.details?.departureDate} at {tripData.tripPlan?.flight?.details?.departureTime}</Text>
                            <Text style={styles.text}>💵 {tripData.tripPlan?.flight?.price?.amount} {tripData.tripPlan?.flight?.price?.currency}</Text>
                        </View>

                        {/* Hotels */}
                        <View style={styles.card}>
                            <Text style={styles.sectionTitle}>🏨 Hotels</Text>
                            {tripData.tripPlan?.hotels?.map((hotel, index) => (
                                <View key={index} style={styles.hotelItem}>
                                    <Image source={{ uri: hotel.imageUrl }} style={styles.hotelImage} />
                                    <View>
                                        <Text style={styles.text}>{hotel.name}</Text>
                                        <Text style={styles.text}>⭐ {hotel.rating} | 💵 {hotel.price} USD</Text>
                                    </View>
                                </View>
                            ))}
                        </View>

                        {/* Places to Visit */}
                        <View style={styles.card}>
                            <Text style={styles.sectionTitle}>📍 Places to Visit</Text>
                            {tripData.tripPlan?.placesToVisit?.map((place, index) => (
                                <View key={index} style={styles.placeItem}>
                                    <Image source={{ uri: place.imageUrl }} style={styles.placeImage} />
                                    <View>
                                        <Text style={styles.text}>{place.name}</Text>
                                        <Text style={styles.text}>🎟 {place.ticketPricing} | ⏳ {place.timeToTravel}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>

                        {/* Daily Schedule - Timeline */}
                        <View style={styles.card}>
                            <Text style={styles.sectionTitle}>📅 Daily Schedules</Text>
                            {tripData.tripPlan?.dailyPlan?.length > 0 ? (
                                tripData.tripPlan.dailyPlan.map((day, index) => (
                                    <View key={index}>
                                        <Text style={styles.dayTitle}>Day {index + 1}</Text>
                                        <Timeline
                                            data={day.schedule.map((event) => ({
                                                time: event.time,
                                                title: event.activity,
                                                description: event.location,
                                                lineColor: Colors.primary,
                                                circleColor: Colors.primary,
                                            }))}
                                            circleSize={20}
                                            circleColor={Colors.primary}
                                            lineColor={Colors.primary}
                                            timeContainerStyle={{ minWidth: 52 }}
                                            timeStyle={styles.timelineTime}
                                            titleStyle={styles.timelineTitle}
                                            descriptionStyle={styles.timelineDescription}
                                            separator
                                            showTime
                                        />
                                    </View>
                                ))
                            ) : (
                                <Text style={styles.text}>No schedule available</Text>
                            )}
                        </View>
                    </View>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 10, backgroundColor: '#f0f0f0' }} />} 
            />
        </>
    );
}

// Styles
const styles = StyleSheet.create({
    tripContainer: { 
        padding: 20, 
        backgroundColor: 'white', 
        marginBottom: 20, 
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000', 
        shadowOpacity: 0.1, 
        shadowRadius: 8, 
        elevation: 5 
    },
    header: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 20 
    },
    headerText: { 
        fontSize: 26, 
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
    timelineTime: { 
        fontSize: 14, 
        color: Colors.primary 
    },
    timelineTitle: { 
        fontSize: 16, 
        fontWeight: 'bold', 
        color: '#333' 
    },
    timelineDescription: { 
        fontSize: 14, 
        color: '#666' 
    },
    loader: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    center: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    noTripText: { 
        fontSize: 18, 
        color: '#666' 
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        backgroundColor: '#f8f9fa',
        shadowColor: '#000',
        borderRadius: 10,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        fontFamily: 'outfit-bold',
        textAlign: 'center',
        marginHorizontal: 20,
    },
    dayTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
});