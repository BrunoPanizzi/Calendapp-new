import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { theme } from '../../constants/Colors'

type props = {
  calendarId: string
}

export default function NewEventButton({ calendarId }: props) {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('CreateEvent', { calendarId })}
    >
      <View style={styles.line} />
      <View style={[styles.line, { transform: [{ rotate: '90deg' }] }]} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: theme.colors[500],
    bottom: theme.spacing.medium,
    right: theme.spacing.medium,
    borderRadius: 999,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    position: 'absolute',
    height: 3,
    left: 12,
    right: 12,
    borderRadius: 2,
    backgroundColor: theme.colors[100],
  },
})
