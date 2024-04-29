import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
// screens
import { InitialStack } from './navigation/stack';



export default function App() {
  return (
    <NavigationContainer>
      <InitialStack />
    </NavigationContainer>
  );
}

