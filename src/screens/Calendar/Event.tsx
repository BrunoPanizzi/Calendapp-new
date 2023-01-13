import { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu'

import useColorScheme from '../../hooks/useColorScheme'

import CalendarService from '../../services/CalendarService'

import { parseDate, parseTime } from '../../utils/parseDate'

import { theme } from '../../constants/Colors'

import DangerModal from '../../components/DangerModal'

import { event } from '../../services/CalendarService/types'

type props = {
  event: event
}

export default function Event({ event }: props) {
  const colorScheme = useColorScheme()

  const { title, colorHue, description, start, end, type } = event
  const originalEvent = { title, colorHue, description, start, end, type }
  const [dangerModalVisible, setDangerModalVisible] = useState(false)

  const { id } = useRoute().params as { id: string }

  return (
    <TouchableOpacity
      style={[
        styles.container,

        { borderColor: `hsla(${colorHue}, 100%, 50%, 0.5)` },
      ]}
      onPress={() => console.log('figure out how to expand event')}
    >
      <View style={styles.rows}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
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
      </View>
      <View style={styles.rows}>
        <View style={[styles.half, { marginRight: theme.spacing.small }]}>
          <Text style={{ marginBottom: 2 }}>
            Início: {`${parseDate(start, false)}, ${parseTime(start)}`}
          </Text>
          {end && (
            <Text>Fim: {`${parseDate(end, false)}, ${parseTime(end)}`}</Text>
          )}
        </View>
        <View style={styles.half}>
          <Text
            style={[styles.description, !description && { color: 'gray' }]}
            numberOfLines={3}
          >
            {description ? description : 'Sem descrição para esse evento'}
          </Text>
        </View>
      </View>
      <DangerModal
        visible={dangerModalVisible}
        onClose={() => setDangerModalVisible(false)}
        dangerLabel='Excluir'
        dangerousAction={
          async () =>
            await CalendarService.deleteEvent(id, originalEvent as event) // TODO: this might fuck some thing up
        }
        message={`Você realmente deseja excluir o evento ${title}?`}
        title={`Excluir ${title}`}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.medium / 2,
    borderLeftWidth: 4,
    paddingLeft: theme.spacing.small,
  },
  rows: {
    maxWidth: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  half: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: theme.colors[800],
    textAlignVertical: 'center',
    textAlign: 'center',
    flex: 1,
  },
})
