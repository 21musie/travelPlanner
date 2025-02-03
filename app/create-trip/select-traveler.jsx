import { Colors } from '@/constants/Colors';
import { useNavigation, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SelectTravellerList } from '@/constants/Options';
import OptionCard from '@/components/CreateTrip/OptionCard';
import { CreateTripContext } from '@/context/CreateTripContext';

const SelectTraveller = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const [selectedTraveller, setSelectedTraveller] = useState(null);
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, []);

  useEffect(() => {
    setTripData({ ...tripData, traveller: selectedTraveller });
  }, [selectedTraveller]);

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: '100%',
      }}
    >
      <Text
        style={{
          fontSize: 35,
          fontFamily: 'roboto-bold',
          marginTop: 20,
        }}
      >
        Who's Travelling
      </Text>

      <View>
        <Text
          style={{
            paddingVertical: 10,
            fontFamily: 'roboto-bold',
            fontSize: 23,
          }}
        >
          Choose your traveller
        </Text>

        <FlatList
          data={SelectTravellerList}
          keyExtractor={(item) => item.id.toString()} // Ensure each item has a unique key
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                marginVertical: 10,
              }}
              onPress={() => {
                setSelectedTraveller(item);
              }}
            >
              <OptionCard option={item} selectedOptions={selectedTraveller} />
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity
        style={{
          marginTop: 20,
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
        }}
        onPress={() => {
          router.push('/create-trip/select-dates');
        }}
      >
        <Text
          style={{
            textAlignVertical: 'center',
            fontFamily: 'roboto-medium',
            fontSize: 20,
            color: Colors.WHITE,
            textAlign: 'center',
          }}
        >
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectTraveller;