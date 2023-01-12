import { StyleSheet, ScrollView } from 'react-native'

import { theme } from '../../constants/Colors'

import CalendarsList from './CalendarsList'
import NewCalendarButton from './NewCalendarButton'

export default function Home() {
  return (
    <>
      <ScrollView style={styles.container}>
        <CalendarsList />
      </ScrollView>
      <NewCalendarButton />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors[0],
    flex: 1,
    padding: theme.spacing.medium,
  },
})
