
// import { StyleSheet,View,Image,Text} from 'react-native';
// import { useNavigation,useRouter } from 'expo-router';
// import { useEffect, useContext } from 'react';
// import { Colors } from '@/constants/Colors';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// // import { EXPO_PUBLIC_GOOGLE_MAP_API_KEY } from '@env';
// import { CreateTripContext } from '../../context/CreateTripContext';

// const SearchPlace = () => {
//   const navigation = useNavigation();
//   const router = useRouter();

//   const { tripData, setTripData } = useContext(CreateTripContext);

//   useEffect(() => {
//     navigation.setOptions({
//       headerShown: true,
//       headerTransparent: true,
//       headerTitle: 'Search',
//     });
//   }, [navigation]);

//   useEffect(() => {
//     console.log("tripData",tripData)
//   }, [tripData]);


//   return (
//     <View style={styles.container}>

//       <Text style={styles.title}>Search Your Destination</Text>

//         <GooglePlacesAutocomplete
//           placeholder='Search Place'
//           fetchDetails={true}
//           onPress={(data, details = null) => {
//             console.log(data, details);
//             setTripData({
//               ...tripData,
//               locationInfo: {
//                 name: data.description,
//                 coordinate: details?.geometry.location,
//                 photoRef: details?.photos[0].photo_reference,
//                 url:details?.url
//               },
//             });
//             router.push('create-trip/Select-Traveler')
//           }}
//           query={{
//             key: process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY,
//             language: 'en',
//           }}
//           styles={{
//             textInputContainer: {
//               backgroundColor: Colors.white,
//               borderWidth:1,
//               borderRadius:15,
//               marginTop:25,
              
//             },
            
//           }}
//         />     
//     </View>
//   );
// }

// export default SearchPlace;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: Colors.white,
//     paddingTop: 85,
//     padding: 25,
//     height: '100%',
//   },
  
//   title: {
//     fontFamily: 'Outfit-Bold',
//     fontSize: 30,
//     textAlign:'center',
//     marginTop:10
//   },
// });

import { View, Text,Button  } from 'react-native';
import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import { EXPO_PUBLIC_GOOGLE_MAP_API_KEY } from '@env';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SearchPlace() {
  const navigation=useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);
  useEffect(()=>{
navigation.setOptions({
  headerShown:true,
  headerTransparent:true,
  headerTitle:"Search"
})
  },[])

  useEffect(() => {
    console.log(tripData);
  }, [tripData]);

  const defaultPlace = {
    name: "Eiffel Tower, Paris, France",
    coordinates: {
      lat: "48.8588443",
      lng: "2.2943506",
    },
    photoRef: "ATJ83zhSSAtkh5LTozXMhBghqubeOxnZWUV2m7Hv2tQaIzKQJgvZk9yCaEjBW0r0Zx1oJ9RF1G7oeM34sQQMOv8s2zA0sgGBiyBgvdyMxeVByRgHUXmv-rkJ2wyvNv17jyTSySm_-_6R2B0v4eKX257HOxvXlx_TSwp2NrICKrZM2d5d2P4q",
    url: "https://www.google.com/maps/place/Eiffel+Tower",
  };

  const handleNextPage = () => {
    // Use the selected place or the default place
    const placeToUse = defaultPlace;

    setTripData({
      locationInfo: placeToUse,
    });

    // Navigate to the Select-Traveler page
    navigation.navigate('create-trip/Select-Traveler');
  };


  return (
    <View
    style={{
      padding:25,
      paddingTop:75,
      backgroundColor: Colors.WHITE,
      height:'100%'
    }}
    >

<GooglePlacesAutocomplete

      placeholder='Search places'
      fetchDetails={true}
      onFail={error=>console.log(error)} 
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        
        console.log(data.description);
        console.log(details?.geometry.location);
        console.log(details?.photo[0]?.photo_reference);
        console.log(details?.url);
        setTripData({
        locationInfo: {
          // name: data.description,
          // coordinates:details?.geometry.location,
          // photoRef:details?.photo[0]?.photo_reference,
          // url:details?.url,

name: "Eiffel Tower, Paris, France",
          coordinates:{
      lat: "48.8588443",
      lng: "2.2943506",
    },
          photoRef:"ATJ83zhSSAtkh5LTozXMhBghqubeOxnZWUV2m7Hv2tQaIzKQJgvZk9yCaEjBW0r0Zx1oJ9RF1G7oeM34sQQMOv8s2zA0sgGBiyBgvdyMxeVByRgHUXmv-rkJ2wyvNv17jyTSySm_-_6R2B0v4eKX257HOxvXlx_TSwp2NrICKrZM2d5d2P4q",
          url:"https://www.google.com/maps/place/Eiffel+Tower",
        },
      });
      router.push('create-trip/Select-Traveler')
      }}
      query={{
        key: "AIzaSyAUZF6gwDehwTmUpkqsNimUk3cA2wDR1GY",
        language: 'en',
      }}

      styles={{
        textInputContainer:{
          borderWidth:1,
          borderRadius:5,
          marginTop:25,
        }
      }}
    />

<Button
        title="Continue to Select Travelers"
        onPress={handleNextPage}
        color={Colors.primary} // Use your primary color or any color you prefer
        style={{ marginTop: 20 }}
      />
      <Text>search-place</Text>
      
    </View> 
  )
}