import { startTransition, useState } from 'react'
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
import Toggle from '../../components/Toggle'
import ToggleGroup from '../../components/Toggle/ToggleGroup'
import { event } from '../../services/CalendarService/types'

export default function CreateEvent({
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

  const handleSetStart = (date: Date | undefined) => {
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

      <ToggleGroup label='Dia inteiro: ' width='100%'>
        <Toggle
          width={60}
          headColor={{ on: theme.colors[500], off: theme.colors[800] }}
          trackColor={{ on: theme.colors[200], off: theme.colors[200] }}
          value={isFullDay}
          onChange={() => setIsFullDay((p) => !p)}
        />
      </ToggleGroup>

      {!isFullDay ? (
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
              onRequestOpen={() => true}
              date={start}
              setDate={handleSetStart}
              minDate={new Date()}
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
              setDate={(date) => setEnd(date)}
              minDate={start}
              onRequestOpen={handleOpenEndSelector}
            />
          </InputGroup>
        </View>
      ) : (
        <InputGroup label='Início'>
          <DateSelector
            date={start}
            setDate={handleSetStart}
            onRequestOpen={() => true}
            placeholder='Escolha uma data'
            minDate={new Date()}
            onlyDate
          />
        </InputGroup>
      )}

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
  toggleGroup: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

function makeEvent(
  title: string,
  isFullDay: boolean,
  start: Date,
  end: Date | undefined,
  colorHue: number,
  description: string = ''
): event {
  let baseEvent = {
    title,
    description,
    colorHue,
    creatorId: '',
  }

  if (isFullDay) {
    const type = 'fullDay'
    return { ...baseEvent, type, start: start.valueOf() }
  }
  let type: 'single' | 'span'

  if (!end || isSameDay(start, end)) {
    type = 'single'
  } else {
    type = 'span'
  }

  return {
    ...baseEvent,
    type: type,
    start: start.valueOf(),
    end: end ? end.valueOf() : null,
  }
}
