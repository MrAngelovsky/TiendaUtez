import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/modules/auth/screens/Login';
import CreateAccount from './src/modules/auth/screens/CreateAccount';

import './src/config/utils/firebaseConnection';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="LoginScreen"
        screenOptions={{
          headerShown: false, // Opcional, si no quieres que se muestre el header
        }}
      >
        <Stack.Screen
          name="LoginScreen"
          component={Login}
          options={{ title: 'Iniciar Sesión' }}
        />
        <Stack.Screen
          name="CreateAccountScreen"
          component={CreateAccount}
          options={{ title: 'Crear Cuenta' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
