import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { colors } from './theme';
import { useCallback } from 'react';
import { useFonts, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold } from "@expo-google-fonts/manrope";
import * as SplashScreen from 'expo-splash-screen';

import Home from './screens/Home';
import About from './screens/About';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const Stack = createNativeStackNavigator();

  const [fontsLoaded, fontError] = useFonts ({
    "Manrope-Regular": Manrope_400Regular,
    "Manrope-Medium": Manrope_500Medium,
    "Manrope-SemiBold": Manrope_600SemiBold,
    "Manrope-Bold": Manrope_700Bold,
    "Manrope-ExtraBold": Manrope_800ExtraBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView style={{flex: 1}} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen 
            name="Home"
            component={Home}
            options={{
              title: 'Welcome!',
              headerStyle: {
                backgroundColor: colors.olivine,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontFamily: 'Manrope-Bold',
              },
            }}
          />
          <Stack.Screen name="About" component={About}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
