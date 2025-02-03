import SignUp from '@/app/auth/sign-up';
import Login from '@/components/Login';
import {auth} from '@/configs/FirebaseConfig'
import { Redirect } from 'expo-router';
import { useEffect } from 'react';
import {Text, ToastAndroid, View, Platform, Alert } from 'react-native';

export default function Index() {
  const user = auth.currentUser;

  useEffect(() => {
    console.log(user);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Welcome to the app', ToastAndroid.SHORT);
    } else {
      Alert.alert('Welcome to the app');
    }
  }, [user]);

  //   ToastAndroid.show('Welcome to the app', ToastAndroid.SHORT);
  // }, [user]);

  return (
    <View style={{ flex: 1 }}>
      {/* {user ? <Redirect href={'/(tabs)/mytrip'} /> : <Login />} */}
      <Login />
    </View>
  );
}