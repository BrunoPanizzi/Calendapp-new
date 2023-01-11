import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { DrawerScreenProps as _DrawerScreenProps } from '@react-navigation/drawer'
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Drawer: NavigatorScreenParams<DrawerParamList> | undefined
  Calendar: { title: string }
  CreateEvent: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>

export type DrawerParamList = {
  Home: undefined
}

export type DrawerScreenProps<Screen extends keyof DrawerParamList> =
  CompositeScreenProps<
    _DrawerScreenProps<DrawerParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >
