import { date } from './date'
import isSameDay from './isSameDay'

function fixNumber(n: number) {
  // adds the 0 on front of the number if needed
  return ('0' + n).slice(-2)
}

function parseDate(date: date, showYear = true) {
  if (!date) return null

  const today = new Date()
  const myDate = new Date(date)

  if (isSameDay(today, myDate)) return 'Hoje'

  const day = fixNumber(myDate.getDate())
  const month = fixNumber(myDate.getMonth() + 1)
  const year = myDate.getFullYear()

  return `${day}/${month}${showYear ? '/' + year : ''}`
}

function parseTime(date: date) {
  if (!date) return null

  const myDate = new Date(date)

  const hour = fixNumber(myDate.getHours())
  const min = fixNumber(myDate.getMinutes())

  return `${hour}:${min}`
}

export { parseDate, parseTime }
