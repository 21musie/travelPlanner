import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import moment from 'moment';
import { Colors } from '@/constants/Colors';
import UserTripCard from './UserTripCard';
import { useRouter } from 'expo-router';

export default function UserTripList({ userTrips }) {
  const LatestTrip = JSON.parse(userTrips[0].tripData);
  const router = useRouter();
  const [selectedTrip, setSelectedTrip] = useState(null);

  const imageSources = [
    require('./../../assets/images/places_1.png'),
    require('./../../assets/images/places_2.png'),
    require('./../../assets/images/places_3.png'),
    require('./../../assets/images/places_4.png'),
    require('./../../assets/images/places_5.png'),
    require('./../../assets/images/places_6.png'),
    require('./../../assets/images/places_7.png'),
    require('./../../assets/images/places_8.png'),
  ];

  // Function to get a random image source
  const getRandomImageSource = () => {
    const randomIndex = Math.floor(Math.random() * imageSources.length); // Random index between 0 and 7
    return imageSources[randomIndex]; // Return the random image source
  };

  return (
    <View>
      <View style={{ marginTop: 20 }}>
        <Image
          source={getRandomImageSource()}
          style={{
            width: '100%',
            height: 240,
            borderRadius: 15,
          }}
        />
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontFamily: 'roboto-medium',
              fontSize: 20,
            }}
          >
            {userTrips[1]?.tripPlan?.travelPlan?.destination ||
              userTrips[1]?.tripPlan?.travelPlan?.location}
          </Text>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}
          >
            <Text
              style={{
                fontFamily: 'roboto-regular',
                fontSize: 17,
                color: Colors.GRAY,
              }}
            >
              {moment(LatestTrip.startDate).format('DD MMM yyyy')}
            </Text>

            <Text
              style={{
                fontFamily: 'roboto-regular',
                fontSize: 17,
                color: Colors.GRAY,
              }}
            >
              🚌 {LatestTrip.traveller.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              console.log('userTrip: ' + JSON.stringify(userTrips[1]));

              router.push({
                pathname: '/trip-details',
                params: {
                  trip: JSON.stringify(userTrips[1]),
                },
              });
            }}
            style={{
              backgroundColor: Colors.PRIMARY,
              padding: 15,
              borderRadius: 15,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: Colors.WHITE,
                textAlign: 'center',
                fontFamily: 'roboto-medium',
                fontSize: 15,
              }}
            >
              See your plan
            </Text>
          </TouchableOpacity>
        </View>

        {userTrips.map((trip) => (
          <View
            key={trip.docId}
            style={{
              borderRadius: 15,
              borderColor: 'black',
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedTrip(trip);

                router.push({
                  pathname: '/trip-details',
                  params: {
                    trip: JSON.stringify(trip),
                  },
                });
              }}
            >
              <UserTripCard trip={trip} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}