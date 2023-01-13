import { StyleSheet } from 'react-native'
import { ScrollView } from '../../components/Themed'

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
    flex: 1,
    padding: theme.spacing.medium,
  },
})
