import { date } from './date'

export default function isSameDay(date1: date, date2: date) {
  if (!date1 || !date2) {
    return false
  }

  const d1 = new Date(date1)
  const d2 = new Date(date2)

  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}
