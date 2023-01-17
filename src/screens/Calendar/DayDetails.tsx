import { StyleSheet, Text, View } from 'react-native'
import { format, isSameDay } from 'date-fns'

import isBetweenDates from '../../utils/isBetweenDates'

import { useCalendar } from '../../context/calendarContext'

import { theme } from '../../constants/Colors'

import Event from './Event'

type props = {
  events: any // TODO: yeah events are going to be a pain in the ass
}
export default function DayDetails({ events }: props) {
  const { selectedDay } = useCalendar()!

  let eventsOnDate: any[] = []
  events.forEach((e: any) => {
    if (e.type === 'single') {
      if (isSameDay(e.start, selectedDay!)) {
        eventsOnDate.push(e)
      }
    } else if (isBetweenDates(e.start, e.end, selectedDay)) {
      eventsOnDate.push(e)
    }
  })

  return (
    <>
      <Text style={styles.title}>
        {selectedDay ? format(selectedDay, 'dd/MM/yyyy') : 'Selecione um dia'}
      </Text>
      {eventsOnDate.length ? (
        <View style={styles.info}>
          {eventsOnDate.map((item) => (
            <Event event={item} key={Math.random()} />
          ))}
        </View>
      ) : (
        <Text style={styles.noEvents}>Sem eventos...</Text>
      )}
    </>
  )
}
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  info: {
    width: '100%',
    backgroundColor: theme.colors[0],
    marginTop: theme.spacing.medium,
    padding: theme.spacing.medium,
    paddingVertical: theme.spacing.medium / 2,
    borderRadius: theme.borderRadius,
  },
  noEvents: {
    margin: theme.spacing.large,
    fontSize: theme.text.huge,
    color: theme.colors[700],
  },
})
