import { StyleSheet, Text, View } from 'react-native'

import DateSelector from '../../components/DateSelector'
import ColorSelection from '../../components/ColorSelector'

import { RootStackScreenProps } from '../../../types'

import { Input, InputGroup } from '../../components/Inputs'
import Button from '../../components/Button'
import Toggle from '../../components/Toggle'
import ToggleGroup from '../../components/Toggle/ToggleGroup'

import { theme } from '../../constants/Colors'
import useCreateEvent from './useCreateEvent'

export default function CreateEvent({
  route,
  navigation,
}: RootStackScreenProps<'CreateEvent'>) {
  const {
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
  } = useCreateEvent({ route, navigation })

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
        <Input
          value={description}
          onChange={handleChangeDescription}
          multiline
        />
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

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <InputGroup
          label='Inicio'
          width={isFullDay ? '100%' : '47%'}
          error={!!getErrorMessageByField('start')}
          errorMessage={getErrorMessageByField('start')}
        >
          <DateSelector
            placeholder='Escolha uma data'
            onRequestOpen={() => true}
            date={start}
            setDate={handleChangeStart}
            minDate={new Date()}
            onlyDate={isFullDay}
          />
        </InputGroup>
        {!isFullDay ? (
          <InputGroup
            label='Fim'
            width={'47%'}
            error={!!getErrorMessageByField('end')}
            errorMessage={getErrorMessageByField('end')}
          >
            <DateSelector
              placeholder='Escolha uma data'
              date={end}
              setDate={handleChangeEnd}
              minDate={start}
              onRequestOpen={handleOpenEndSelector}
            />
          </InputGroup>
        ) : null}
      </View>

      <InputGroup
        label='Selecione uma cor'
        error={!!getErrorMessageByField('color')}
        errorMessage={getErrorMessageByField('color')}
      >
        <ColorSelection
          selectedColor={color}
          setSelectedColor={handleChangeColor}
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
