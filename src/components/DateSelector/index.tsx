import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, Platform } from 'react-native'
import { format } from 'date-fns'
// TODO: maybe take a look at this package
// https://www.npmjs.com/package/react-native-date-picker
// also this one:
// https://hosseinshabani.github.io/react-native-modern-datepicker/
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'

import { theme } from '../../constants/Colors'

type props = {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  placeholder: any
  minDate: Date | undefined
  onRequestOpen: () => boolean
}

export default function DateSelector({
  date,
  setDate,
  placeholder,
  minDate,
  onRequestOpen,
}: props) {
  const [hasBeenEdited, setHasBeenEdited] = useState(false)
  const [mode, setMode] = useState<'date' | 'datetime' | 'time' | undefined>(
    Platform.OS === 'ios' ? 'datetime' : 'date'
  )
  const [show, setShow] = useState(false)

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(false)

    if (event.type === 'dismissed') {
      return
    }

    setDate(selectedDate)
    setHasBeenEdited(true)
    if (mode === 'date' && Platform.OS === 'android') {
      setMode('time')
      setShow(true)
    }
  }

  const handleOpenDatepicker = () => {
    const shouldOpen = onRequestOpen()
    if (!shouldOpen) return

    Platform.OS === 'android' && setMode('date')
    setShow(true)
  }

  return (
    <>
      {show && (
        <DateTimePicker
          minimumDate={minDate}
          value={date || new Date()}
          mode={mode as any}
          is24Hour={true}
          onChange={onChange}
        />
      )}

      <TouchableOpacity style={styles.container} onPress={handleOpenDatepicker}>
        <Text
          style={{
            fontSize: theme.text.normal,
            color: theme.colors[hasBeenEdited ? 800 : 200],
          }}
        >
          {hasBeenEdited ? format(date!, 'dd/MM/yyyy') : placeholder}
        </Text>
        <Text
          style={{
            fontSize: theme.text.normal,
            color: theme.colors[hasBeenEdited ? 800 : 200],
          }}
        >
          {hasBeenEdited && format(date!, 'HH:mm')}
        </Text>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.colors[0],
    borderRadius: theme.borderRadius,
    padding: theme.spacing.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
