export default function isBetweenDates(
  start: Date | number | null,
  end: Date | number | null,
  date: Date | number | null
) {
  if (start === null || end === null || date === null) {
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
