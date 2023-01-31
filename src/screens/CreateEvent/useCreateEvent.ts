import { useState } from 'react'
import { RootStackScreenProps } from '../../../types'
import useErrors from '../../hooks/useErrors'
import CalendarService from '../../services/CalendarService'
import makeEvent from '../../utils/makeEvent'

export default function useCreateEvent({
  route,
  navigation,
}: RootStackScreenProps<'CreateEvent'>) {
  const { addError, getErrorMessageByField, removeError } = useErrors()
  const [loading, setLoading] = useState(false)

  const [eventName, setEventName] = useState('')
  const [description, setDescription] = useState('')
  const [isFullDay, setIsFullDay] = useState(true)
  const [start, setStart] = useState<Date>()
  const [end, setEnd] = useState<Date>()
  const [color, setColor] = useState<number>()

  const handleChangeName = (newName: string) => {
    removeError('eventName')
    setEventName(newName)
    if (!newName) {
      addError({ field: 'eventName', message: 'Escolha um nome para o evento' })
    }
  }
  const handleChangeDescription = (newDesc: string) => {
    setDescription(newDesc)
  }
  const handleChangeStart = (date: Date | undefined) => {
    removeError('start')
    removeError('end')
    setStart(date)
  }
  const handleChangeEnd = (date: Date | undefined) => {
    removeError('end')
    setEnd(date)
  }
  const handleOpenEndSelector = () => {
    if (!start) {
      addError({
        field: 'end',
        message: 'Selecione uma data de inicio primeiro',
      })
    }
    return Boolean(start)
  }
  const handleChangeColor = (colorHue: number) => {
    removeError('color')
    setColor(colorHue)
  }
  const handleSubmit = async () => {
    if (!eventName) {
      return addError({
        field: 'eventName',
        message: 'Escolha um nome para o evento',
      })
    }
    if (!color) {
      return addError({
        field: 'color',
        message: 'Escolha uma cor para o evento',
      })
    }

    if (!start) {
      return addError({
        field: 'start',
        message: 'Selecione uma data de inicio',
      })
    }

    const event = makeEvent(
      eventName,
      isFullDay,
      start!,
      end,
      color,
      description
    )

    try {
      setLoading(true)
      await CalendarService.addEvent(route.params.calendarId, event)

      navigation.goBack()
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return {
    getErrorMessageByField,
    eventName,
    handleChangeName,
    description,
    handleChangeDescription,
    isFullDay,
    setIsFullDay,
    start,
    handleChangeStart,
    end,
    handleChangeEnd,
    handleOpenEndSelector,
    color,
    handleChangeColor,
    handleSubmit,
    loading,
  }
}
