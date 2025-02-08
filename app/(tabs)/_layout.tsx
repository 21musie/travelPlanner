import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { Image } from 'react-native';


export default function TabLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: Colors.BLACK }}>
            <Tabs.Screen 
        name="myTrip"
        options={{
            tabBarLabel: 'New Trip',
            tabBarIcon: ({ focused }) => (
                <Image
                    source={require('../../assets/images/location.png')} // Use the relative path for the local image
                    style={{ 
                        width: 24, 
                        height: 24,
                        tintColor: focused ? undefined : 'gray' // No tint when focused, gray when not
                    }} 
                />
            ),
        }}
    />
            <Tabs.Screen name="discover"
                options={{
                    tabBarLabel: 'Discover',
                    // tabBarIcon: ({ color }) => <FontAwesome name="globe" size={24} color={color} />            
                    tabBarIcon: ({ focused }) => (
                        focused ? (
                            <Image
                                source={require('../../assets/images/discover.png')} // Local image for active state
                                style={{ 
                                    width: 24, 
                                    height: 24,
                                    tintColor: undefined // No tint when focused
                                }} 
                            />
                        ) : (
                            <FontAwesome name="globe" size={24} color="gray" /> // FontAwesome icon for inactive state
                        )
                    ),
                }}
            />
            <Tabs.Screen name="profile"
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../../assets/images/user.png')} // Use the relative path for the local image
                            style={{ 
                                width: 24, 
                                height: 24,
                                tintColor: focused ? undefined : 'gray' // No tint when focused, gray when not
                            }} 
                        />
                    ),
                }}
            />
            
            <Tabs.Screen 
                name="schedule"
                options={{
                    tabBarLabel: 'Schedule',
                    // tabBarIcon: ({ color }) => <FontAwesome name="calendar" size={24} color={color} /> // Calendar icon
                    tabBarIcon: ({ focused }) => (
                        focused ? (
                            <Image
                                source={require('../../assets/images/schedule.png')} // Local image for active state
                                style={{ 
                                    width: 24, 
                                    height: 24,
                                    tintColor: undefined // No tint when focused
                                }} 
                            />
                        ) : (
                            <FontAwesome name="calendar" size={24} color="gray" /> // FontAwesome icon for inactive state
                        )
                    ),
                }}
            />

            <Tabs.Screen 
                name="aboutUs"
                options={{
                    tabBarLabel: 'About Us',
                    // tabBarIcon: ({ color }) => <FontAwesome name="info-circle" size={24} color={color} /> // Info circle icon
                    tabBarIcon: ({ focused }) => (
                        focused ? (
                            <Image
                                source={require('../../assets/images/info.png')} // Local image for active state
                                style={{ 
                                    width: 24, 
                                    height: 24,
                                    tintColor: undefined // No tint when focused
                                }} 
                            />
                        ) : (
                            <FontAwesome name="info-circle" size={24} color="gray" /> // FontAwesome icon for inactive state
                        )
                    ),
                }}
            />
        </Tabs>
    )
}
