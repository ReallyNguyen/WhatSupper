import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Camera from '../../screens/Camera';
import Home from '../../screens/Home';
import Saved from '../../screens/Saved';
import Recipe from '../../screens/Recipe';
import RecipeInfo from '../../screens/RecipeInfo';
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="MainStack"
            screenOptions={{
                tabBarStyle: {
                    position: 'absolute',
                    right: 100,
                    left: 100,
                    bottom: 25,
                    borderRadius: 40,
                    height: 60,
                    width: 200
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
                        <FontAwesome5 name={'camera'} size={size} color={color} style={{ position: 'relative', top: 15 }} />
                    ),
                    tabBarStyle: { display: "none" },
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="MainStack"
                component={MainStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name={'home'} size={size} color={color} style={{ position: 'relative', top: 15 }} />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Saved"
                component={Saved}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name={'bookmark'} solid size={size} color={color} style={{ position: 'relative', top: 15 }} />
                    ),
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    );
}

function MainStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Recipe" component={Recipe} options={{ headerShown: false }} />
            <Stack.Screen name="RecipeInfo" component={RecipeInfo} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
