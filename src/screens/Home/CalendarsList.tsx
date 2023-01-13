import { useState, useEffect } from 'react'
import { StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import {
  DocumentData,
  onSnapshot,
  QueryDocumentSnapshot,
} from 'firebase/firestore'
import { Text, View } from '../../components/Themed'

import { theme } from '../../constants/Colors'

import UserService from '../../services/UserService'
import CalendarService from '../../services/CalendarService'

import SmallCalendar from './SmallCalendar'
import { useAuth } from '../../context/authContext'
import { calendar } from '../../services/CalendarService/types'

export default function CalendarsList() {
  const { width } = Dimensions.get('screen')
  const [calendars, setCalendars] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const calendarsQuery = CalendarService.getCalendars(user!.uid)
    const unsub = onSnapshot(calendarsQuery, (querySnapshot) => {
      setCalendars(querySnapshot.docs)
      setLoading(false)
    })

    return unsub
  }, [])

  return (
    <>
      <Text
        style={styles.title}
        darkColor={theme.colors[100]}
        lightColor={theme.colors[700]}
      >
        Seus calendários:
      </Text>
      {!loading ? (
        <View style={styles.calendarsContainer}>
          {calendars.map((calendar) => (
            <SmallCalendar
              key={calendar.id}
              calendar={calendar.data() as calendar}
              id={calendar.id}
              width={(width - theme.spacing.medium * 3) / 2} // magic number do not change
            />
          ))}
        </View>
      ) : (
        <ActivityIndicator size={'large'} color={'#f0f'} />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing.small,
  },
  calendarsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
})
