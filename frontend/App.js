import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { StatusBar, useColorScheme } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  const isDark = useColorScheme() === 'dark';

  return (
    <AuthProvider>
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
