import { date } from './date'

export default function isBetweenDates(start: date, end: date, date: date) {
  if (!start || !end || !date) {
    return false
  }

  let s = new Date(start)
  let e = new Date(end)
  let d = new Date(date)

  s = new Date(s.getFullYear(), s.getMonth(), s.getDate())
  e = new Date(e.getFullYear(), e.getMonth(), e.getDate())
  d = new Date(d.getFullYear(), d.getMonth(), d.getDate())

  return s <= d && d <= e
}
