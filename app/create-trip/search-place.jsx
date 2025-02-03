/* eslint-disable @next/next/no-img-element */
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { CreateTripContext } from '@/context/CreateTripContext';
import { Ionicons } from '@expo/vector-icons';

export default function SearchPlace() {
  const [locationName, setLocationName] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const typingTimeout = useRef(null);
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: 'Search',
    });
  }, []);

  useEffect(() => {
    console.log(tripData);
  }, [tripData]);

  const handleSetLocation = () => {
    if (locationName.trim()) {
      setTripData({
        locationInfo: {
          name: locationName,
          coordinates: {
            lat: 21.0285,
            lng: 105.8542,
          },
          photoRef:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Thap_Rua.jpg/396px-Thap_Rua.jpg',
        },
      });
      router.push('/create-trip/select-traveler');
    }
  };

  const fetchPredictions = async (input) => {
    try {
      const response = await fetch(
        `https://rsapi.goong.io/Place/AutoComplete?api_key=${process.env.EXPO_PUBLIC_REACT_APP_GOONG_API_KEY}&input=${input}`
      );
      const data = await response.json();

      if (data.status === 'OK') {
        const formattedPredictions = data.predictions.map((prediction) => ({
          place_id: prediction.place_id,
          main_text: prediction.structured_formatting.main_text,
          secondary_text: prediction.structured_formatting.secondary_text,
        }));
        setPredictions(formattedPredictions);
        setIsOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLocationChange = (input) => {
    setLocationName(input);

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    if (input.trim()) {
      typingTimeout.current = setTimeout(() => {
        fetchPredictions(input);
      }, 1000);
    } else {
      setPredictions([]);
      setIsOpen(false);
    }
  };

  const handleSelectPlace = (placeId) => {
    const selectedPrediction = predictions.find(
      (p) => p.place_id === placeId
    );
    setSelectedPlaceId(placeId);
    if (selectedPrediction) {
      setLocationName(
        `${selectedPrediction.main_text}, ${selectedPrediction.secondary_text}`
      );
    }
    setPredictions([]);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.nativeEvent.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < predictions.length - 1 ? prev + 1 : prev
      );
    } else if (e.nativeEvent.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.nativeEvent.key === 'Enter' && selectedIndex >= 0) {
      handleSelectPlace(predictions[selectedIndex].place_id);
    } else if (e.nativeEvent.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <View
      style={{
        marginTop: 75,
        flexDirection: 'column',
        alignItems: 'center',
        margin: 20,
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <View style={{ position: 'relative', flex: 1 }}>
          <TextInput
            placeholder="Search for places..."
            value={locationName}
            onChangeText={handleLocationChange}
            onFocus={() => setIsOpen(true)}
            onKeyPress={handleKeyDown}
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
              padding: 10,
              marginRight: 5,
              fontSize: 16,
            }}
          />
        </View>
        <TouchableOpacity
          onPress={handleSetLocation}
          style={{
            backgroundColor: Colors.PRIMARY,
            borderRadius: 5,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {isOpen && predictions.length > 0 && (
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            marginTop: 10,
            overflow: 'hidden',
            width: '100%',
          }}
        >
          <FlatList
            data={predictions}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => handleSelectPlace(item.place_id)}
                style={{
                  padding: 15,
                  borderBottomWidth: 1,
                  borderBottomColor: '#ccc',
                  backgroundColor:
                    selectedPlaceId === item.place_id
                      ? Colors.PRIMARY
                      : selectedIndex === index
                      ? '#e0f7fa'
                      : 'white',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Ionicons
                  name="navigate-circle-outline"
                  size={30}
                  color="gray"
                  style={{
                    marginRight: 10,
                  }}
                />

                <View style={{ flexDirection: 'column', gap: 2 }}>
                  <Text
                    style={{
                      color:
                        selectedPlaceId === item.place_id ? 'white' : 'black',
                      fontWeight: 'normal',
                      fontSize: 16,
                    }}
                  >
                    {item.main_text}
                  </Text>
                  <Text
                    style={{
                      color: 'gray',
                      fontWeight: 'light',
                      fontSize: 14,
                    }}
                  >
                    {item.secondary_text}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            style={{ maxHeight: 400 }}
          />
        </View>
      )}
    </View>
  );
}