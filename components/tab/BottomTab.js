import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Camera from '../../screens/Camera';
import Home from '../../screens/Home';
import Saved from '../../screens/Saved';
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    position: 'absolute',
                    right: 100,
                    left: 100,
                    bottom: 15,
                    borderRadius: 40,
                    height: 60,
                },
                tabBarActiveTintColor: 'green',
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen 
                name="Camera" 
                component={Camera}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name={'camera'} size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen 
                name="Home" 
                component={Home} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name={'home'} size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen 
                name="Saved" 
                component={Saved} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name={'bookmark'} solid size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    );
};