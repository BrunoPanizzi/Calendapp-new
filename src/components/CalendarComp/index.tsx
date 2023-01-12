import { useState, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import propTypes from 'prop-types'

import { theme } from '../../constants/Colors'

import Day from './Day'
import Header from './Header'

import { calendar } from '../../services/CalendarService/types'

type props = {
  compact: boolean
  calendar: calendar
}
// TODO: big ass code review for this thing
export default function CalendarComp({ compact, calendar }: props) {
  const today = new Date()
  const [month, setMonth] = useState(
    new Date(today.getFullYear(), today.getMonth())
  )

  const daysArr = useMemo(() => {
    // timestamp to the first day of the calendar
    const calendarStart = month.valueOf() - month.getDay() * 24 * 60 * 60 * 1000

    let assistArr = Array(42)
      .fill('')
      .map((_, i) => {
        const currentDay = new Date(calendarStart + 24 * 60 * 60 * 1000 * i)
        return (
          <Day
            compact={compact}
            events={calendar.events || []}
            key={Math.random()}
            day={currentDay}
            isThisMonth={currentDay.getMonth() === month.getMonth()}
          />
        )
      })

    return assistArr
  }, [month, calendar])

  const nextMonth = () => {
    setMonth(
      (prevMonth) => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1)
    )
  }

  const previousMonth = () => {
    setMonth(
      (prevMonth) => new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1)
    )
  }

  return (
    <>
      {!compact && (
        <Header
          currDate={month}
          previousMonth={previousMonth}
          nextMonth={nextMonth}
        />
      )}
      <View style={styles.days}>{daysArr}</View>
    </>
  )
}

CalendarComp.propTypes = {
  compact: propTypes.bool,
  calendar: propTypes.object.isRequired,
}

CalendarComp.defaultProps = {
  compact: false,
}

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius,
    backgroundColor: theme.colors[100],
  },
  days: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
