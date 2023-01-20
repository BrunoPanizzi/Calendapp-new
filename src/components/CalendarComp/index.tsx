import { useState, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { View } from '../Themed'

import {
  startOfMonth,
  startOfWeek,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  isSameMonth,
} from 'date-fns'

import Day from './Day'
import Header from './Header'

import { calendar } from '../../services/CalendarService/types'

type props = {
  calendar: calendar
  compact?: boolean
}
export default function CalendarComp({ compact, calendar }: props) {
  const [month, setMonth] = useState(startOfMonth(Date.now()))

  const daysThisMonth = useMemo(() => {
    const calendarStart = startOfWeek(month)
    const calendarEnd = endOfWeek(endOfMonth(month))

    return eachDayOfInterval({
      start: calendarStart,
      end: calendarEnd,
    })
  }, [month])

  const handleNextMonth = () => setMonth(addMonths(month, 1))
  const handlePreviousMonth = () => setMonth(addMonths(month, -1))

  return (
    <>
      {!compact && (
        <Header
          currDate={month}
          previousMonth={handlePreviousMonth}
          nextMonth={handleNextMonth}
        />
      )}
      <View style={styles.days}>
        {daysThisMonth.map((day) => (
          <Day
            compact={compact}
            events={calendar?.events || []}
            key={Math.random()}
            day={day}
            isThisMonth={isSameMonth(day, month)}
          />
        ))}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  days: {
    backgroundColor: 'transparent',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
