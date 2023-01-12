import { NavigationContainer, Theme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ColorSchemeName } from 'react-native'

import { theme } from '../constants/Colors'
import { RootStackParamList, DrawerParamList } from '../../types'
import LinkingConfiguration from './LinkingConfiguration'
import { createDrawerNavigator } from '@react-navigation/drawer'

import Calendar from '../screens/Calendar'
import Home from '../screens/Home'
import CreateEvent from '../screens/CreateEvent'
import Login from '../Login'

const darkTheme: Theme = {
  dark: true,
  colors: {
    background: theme.colors[800],
    border: theme.colors[200],
    card: theme.colors[800],
    notification: theme.colors[500],
    primary: theme.colors[500],
    text: theme.colors[100],
  },
}
const lightTheme: Theme = {
  dark: false,
  colors: {
    background: theme.colors[0],
    border: theme.colors[700],
    card: theme.colors[0],
    notification: theme.colors[500],
    primary: theme.colors[500],
    text: theme.colors[700],
  },
}

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName
}) {
  const isLogged = false

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? darkTheme : lightTheme}
    >
      {isLogged ? <RootNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  )
}

const headerConfig = {
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 24,
  },
} as const

const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        ...headerConfig,
        presentation: 'card',
        gestureEnabled: true,
      })}
    >
      <Stack.Screen
        name='Drawer'
        component={DrawerNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Calendar'
        component={Calendar}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        name='CreateEvent'
        component={CreateEvent}
        options={{ title: 'Novo Evento' }}
      />
    </Stack.Navigator>
  )
}

const Drawer = createDrawerNavigator<DrawerParamList>()

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

function LoginNavigator() {
  return <Login />
}
