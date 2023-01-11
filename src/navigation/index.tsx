import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { ColorSchemeName, Pressable, Text, View } from 'react-native'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../../types'
import LinkingConfiguration from './LinkingConfiguration'
import { createDrawerNavigator } from '@react-navigation/drawer'

// importing the screens
import Calendar from '../screens/Calendar'
import Home from '../screens/Home'
import CreateEvent from '../screens/CreateEvent'

//

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}

const headerConfig = {
  headerStyle: {
    backgroundColor: '#ccffff',
  },
  headerTintColor: '#000000',
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 24,
  },
} as const

const Stack = createNativeStackNavigator() //TODO: type this thing

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...headerConfig,
        presentation: 'card',
        gestureEnabled: true,
      }}
    >
      <Stack.Screen
        name='Drawer'
        component={DrawerNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Calendar'
        component={Calendar}
        // options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        name='CreateEvent'
        component={CreateEvent}
        options={{ title: 'Novo Evento' }}
      />
    </Stack.Navigator>
  )
}

const Drawer = createDrawerNavigator() // TODO: type this thing too

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        ...headerConfig,
        headerShown: true,
      }}
    >
      <Drawer.Screen name='Home' component={Home} />
    </Drawer.Navigator>
  )
}
