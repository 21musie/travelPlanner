// hooks/useAuth.ts

import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  email: string;
  fullName: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
  });

  useEffect(() => {
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("userToken");
      const storedExpiration = await AsyncStorage.getItem("tokenExpiration");

      if (storedToken && storedExpiration) {
        const expirationDate = new Date(storedExpiration);

        if (new Date() > expirationDate) {
          // Token has expired
          await AsyncStorage.multiRemove([
            "userToken",
            "tokenExpiration",
            "userData",
          ]);
          setAuthState({ user: null, token: null });
        } else {
          const userDataString = await AsyncStorage.getItem("userData");
          const userData = userDataString ? JSON.parse(userDataString) : null;
          setAuthState({ user: userData, token: storedToken });
        }
      }
    } catch (error) {
      console.error("Error loading auth state:", error);
    }
  };

  const signIn = async (user: User, token: string) => {
    try {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7); // Set expiration to 7 days from now

      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem(
        "tokenExpiration",
        expirationDate.toISOString()
      );
      await AsyncStorage.setItem("userData", JSON.stringify(user));
      setAuthState({ user, token });
    } catch (error) {
      console.error("Error saving auth state:", error);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.multiRemove([
        "userToken",
        "tokenExpiration",
        "userData",
      ]);
      setAuthState({ user: null, token: null });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return { ...authState, signIn, signOut };
}
