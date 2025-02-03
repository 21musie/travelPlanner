import {
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
    Image,
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
  import { Colors } from '@/constants/Colors';
  import Ionicons from '@expo/vector-icons/Ionicons';
  import StartNewTripCard from '@/components/MyTrips/StartNewTripCard';
  import { useRouter } from 'expo-router';
  import { auth, db } from '@/configs/FirebaseConfig';
  import { collection, getDocs, query, where } from 'firebase/firestore';
  import UserTripList from '@/components/MyTrips/UserTripList';
  
  export default function MyTrip() {
    const router = useRouter();
    const [userTrips, setUserTrips] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = auth.currentUser;
  
    useEffect(() => {
      if (user) {
        GetMyTrips();
      }
    }, [user]);
  
    const GetMyTrips = async () => {
      setLoading(true);
      setUserTrips([]);
      const q = query(
        collection(db, 'UserTrips'),
        where('userEmail', '==', user?.email)
      );
  
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const tripData = doc.data(); // No type casting needed
        setUserTrips((prev) => [...prev, { ...tripData, docId: doc.id }]);
      });
      setLoading(false);
    };
  
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.WHITE,
          padding: 16,
        }}
      >
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Image
              source={require('@/assets/images/icon.png')}
              style={{ width: 52, height: 52 }}
            />
            <Text
              style={{
                fontFamily: 'roboto-bold',
                fontSize: 33,
              }}
            >
              My Trips
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/create-trip/search-place')}
            >
              <Ionicons name="add-circle" size={50} color="black" />
            </TouchableOpacity>
          </View>
  
          {loading && <ActivityIndicator size={'large'} color={Colors.PRIMARY} />}
          {userTrips.length === 0 ? (
            <StartNewTripCard />
          ) : (
            <UserTripList userTrips={userTrips} />
          )}
        </ScrollView>
      </View>
    );
  }