import { useState } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import { Pressable, Text, View } from '../../components/Themed'
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu'

import CalendarService from '../../services/CalendarService'

import { theme } from '../../constants/Colors'

import CalendarComp from '../../components/CalendarComp'
import DangerModal from '../../components/DangerModal'

import { calendar } from '../../services/CalendarService/types'
import useColorScheme from '../../hooks/useColorScheme'

type props = {
  calendar: calendar
  id: string
  width: number | string
}

export default function SmallCalendar({ calendar, id, width }: props) {
  const colorScheme = useColorScheme()
  const navigation = useNavigation()
  const [dangerModalVisible, setDangerModalVisible] = useState(false)

  const deleteCalendar = async () => await CalendarService.deleteCalendar(id)

  return (
    <Pressable
      style={[styles.calendarContainer, { width }]}
      onPress={() =>
        navigation.navigate('Calendar', { id, title: calendar.title })
      }
      darkColor={theme.colors[600]}
      lightColor={theme.colors[100]}
    >
      <View style={styles.header}>
        <Text
          style={styles.text}
          darkColor={theme.colors[0]}
          lightColor={theme.colors[700]}
        >
          {calendar.title}
        </Text>
        <Menu>
          <MenuTrigger>
            <FontAwesome5
              name='ellipsis-v'
              size={16}
              color={
                colorScheme === 'light' ? theme.colors[600] : theme.colors[200]
              }
            />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption
              text='excluir'
              onSelect={() => setDangerModalVisible(true)}
            />
          </MenuOptions>
        </Menu>
        <DangerModal
          title={`Excluir ${calendar.title}?`}
          message={`Você realmente quer excluir ${calendar.title}?\nEssa ação é irreversível`}
          visible={dangerModalVisible}
          onClose={() => setDangerModalVisible(false)}
          dangerousAction={deleteCalendar}
          dangerLabel='Excluir'
        />
      </View>
      <CalendarComp compact calendar={calendar} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  calendarContainer: {
    marginBottom: theme.spacing.medium,
    padding: theme.spacing.medium,
    borderRadius: theme.bigBorderRadius,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  header: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  menuButton: {
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
  },
})
