import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react'

export type calendarContext = {
  selectedDay: Date | null
  setSelectedDay: Dispatch<SetStateAction<Date | null>>
}

export const calendarContext = createContext<calendarContext | null>(null)

export default function CalendarProvider({
  children,
}: {
  children: JSX.Element
}) {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)

  return (
    <calendarContext.Provider
      value={{
        selectedDay,
        setSelectedDay,
      }}
    >
      {children}
    </calendarContext.Provider>
  )
}

export function useCalendar() {
  return useContext(calendarContext)
}
