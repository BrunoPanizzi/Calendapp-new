import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { isSameDay } from 'date-fns'

import DateSelector from '../../components/DateSelector'
import ColorSelection from '../../components/ColorSelector'

import useErrors from '../../hooks/useErrors'

import CalendarService from '../../services/CalendarService'

import { Input, InputGroup } from '../../components/Inputs'
import Button from '../../components/Button'

import { theme } from '../../constants/Colors'

import { RootStackScreenProps } from '../../../types'

export default function CreateEvent({
  route,
  navigation,
}: RootStackScreenProps<'CreateEvent'>) {
  const { addError, getErrorMessageByField, removeError } = useErrors()
  const [loading, setLoading] = useState(false)

  const [eventName, setEventName] = useState('')
  const [description, setDescription] = useState('')
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

  const handleSetStart = (date: Date) => {
    removeError('start')
    removeError('end')
    setStart(date)
  }

  const handleOpenEndSelector = () => {
    if (!start) {
      addError({
        field: 'end',
        message: 'Selecione uma data de inicio primeiro',
      })
    }
    return !!start
  }
  const handleSetColor = (colorHue: number) => {
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
    if (!start) {
      return addError({
        field: 'start',
        message: 'Selecione uma data de inicio',
      })
    }
    if (!color) {
      return addError({
        field: 'color',
        message: 'Escolha uma cor para o evento',
      })
    }

    try {
      setLoading(true)
      await CalendarService.addEvent(route.params.calendarId, {
        title: eventName,
        colorHue: color,
        description,
        type: isSameDay(start, end!) || !end ? 'single' : 'span',
        start: start?.valueOf(),
        end: end ? end.valueOf() : null, // firestore things, it doesn't understand `undefined`, just `null`
      })

      navigation.goBack()
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <InputGroup
        label='Nome do evento'
        error={!!getErrorMessageByField('eventName')}
        errorMessage={getErrorMessageByField('eventName')}
      >
        <Input value={eventName} onChange={handleChangeName} />
      </InputGroup>

      <InputGroup label='Descrição'>
        <Input value={description} onChange={setDescription} multiline />
      </InputGroup>

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <InputGroup
          label='Inicio'
          width={'47%'}
          error={!!getErrorMessageByField('start')}
          errorMessage={getErrorMessageByField('start')}
        >
          <DateSelector
            placeholder='Escolha uma data'
            onRequestOpen={() => null}
            date={start}
            setDate={handleSetStart}
            minDate={new Date(Date.now())}
          />
        </InputGroup>
        <InputGroup
          label='Fim'
          width={'47%'}
          error={!!getErrorMessageByField('end')}
          errorMessage={getErrorMessageByField('end')}
        >
          <DateSelector
            placeholder='Escolha uma data'
            date={end}
            setDate={setEnd}
            minDate={start}
            onRequestOpen={handleOpenEndSelector}
          />
        </InputGroup>
      </View>

      <InputGroup
        label='Selecione uma cor'
        error={!!getErrorMessageByField('color')}
        errorMessage={getErrorMessageByField('color')}
      >
        <ColorSelection
          selectedColor={color}
          setSelectedColor={handleSetColor}
        />
      </InputGroup>

      <Button width='100%' onPress={handleSubmit} loading={loading}>
        <Text style={styles.text}>Criar</Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors[0],
    padding: theme.spacing.large,
  },
  text: {
    color: theme.colors[0],
    fontSize: theme.text.huge,
    fontWeight: 'bold',
  },
})
