import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DefaultScreen, MapScreen} from '../../screens';

const Stack = createNativeStackNavigator();

export const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Map">
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Default" component={DefaultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
