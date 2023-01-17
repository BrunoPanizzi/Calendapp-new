import { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { onSnapshot } from 'firebase/firestore'

import { RootStackScreenProps } from '../../../types'

import { calendar } from '../../services/CalendarService/types'

import CalendarProvider from '../../context/calendarContext'
import CalendarService from '../../services/CalendarService'

import { theme } from '../../constants/Colors'

import CalendarComp from '../../components/CalendarComp'
import NewEventButton from './NewEventButton'
import DayDetails from './DayDetails'
import NoEventsMessage from './NoEventsMessage'

export default function Calendar({ route }: RootStackScreenProps<'Calendar'>) {
  const { id } = route.params
  const [calendarInfo, setCalendarInfo] = useState<calendar>()

  useEffect(() => {
    const calendarRef = CalendarService.getCalendar(id)
    const unsub = onSnapshot(calendarRef, (calendarData) => {
      setCalendarInfo(calendarData.data() as calendar)
    })

    return unsub
  }, [])

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ padding: theme.spacing.medium }}
      >
        <CalendarProvider>
          <View style={styles.contentContainer}>
            <CalendarComp calendar={calendarInfo!} />
          </View>
          <View style={styles.contentContainer}>
            {calendarInfo?.events.length ? (
              <DayDetails events={calendarInfo.events} />
            ) : (
              <NoEventsMessage />
            )}
          </View>
        </CalendarProvider>
      </ScrollView>
      <NewEventButton calendarId={id} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors[0],
    flex: 1,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: theme.colors[100],
    padding: theme.spacing.medium,
    borderRadius: theme.bigBorderRadius,
    marginBottom: theme.spacing.medium,
  },
})
