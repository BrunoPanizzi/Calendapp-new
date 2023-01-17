import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Entypo } from '@expo/vector-icons'

import { theme } from '../../constants/Colors'

import AnimatedMonth from './AnimatedMonth'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

type props = {
  currDate: Date
  previousMonth: () => void
  nextMonth: () => void
}

export default function Header({ currDate, previousMonth, nextMonth }: props) {
  const arrowConfig = {
    size: theme.spacing.large,
    color: theme.colors[700],
  }

  return (
    <>
      <View style={styles.months}>
        <TouchableOpacity onPress={previousMonth}>
          <Entypo name='chevron-left' {...arrowConfig} />
        </TouchableOpacity>

        <AnimatedMonth currDate={currDate} />

        <TouchableOpacity onPress={nextMonth}>
          <Entypo name='chevron-right' {...arrowConfig} />
        </TouchableOpacity>
      </View>
      <View style={styles.weekDays}>
        {weekDays.map((day, i) => (
          <Text style={styles.day} key={i}>
            {day}
          </Text>
        ))}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  months: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weekDays: {
    borderRadius: theme.borderRadius,
    backgroundColor: theme.colors[0],
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: theme.spacing.small,
  },
  day: {
    textAlign: 'center',
    width: '13%',
    fontSize: theme.text.normal,
    fontWeight: 'bold',
    color: theme.colors[400],
    borderRadius: theme.borderRadius,
    padding: theme.spacing.small,
  },
})
