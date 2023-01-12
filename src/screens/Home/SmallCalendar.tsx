import { useState } from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
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

type props = {
  calendar: calendar
  id: string
  width: number | string
}

export default function SmallCalendar({ calendar, id, width }: props) {
  const navigation = useNavigation()
  const [dangerModalVisible, setDangerModalVisible] = useState(false)

  const deleteCalendar = async () => await CalendarService.deleteCalendar(id)

  return (
    <TouchableOpacity
      style={[styles.calendarContainer, { width }]}
      onPress={() =>
        navigation.navigate('Calendar', { id, title: calendar.title })
      }
    >
      <View style={styles.header}>
        <Text style={styles.text}>{calendar.title}</Text>
        <Menu>
          <MenuTrigger>
            <FontAwesome5
              name='ellipsis-v'
              size={16}
              color={theme.colors[600]}
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
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: theme.colors[100],
    marginBottom: theme.spacing.medium,
    padding: theme.spacing.medium,
    borderRadius: theme.bigBorderRadius,
  },
  text: {
    color: theme.colors[700],
    fontWeight: 'bold',
    fontSize: 16,
  },
  header: {
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
