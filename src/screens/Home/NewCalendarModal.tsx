import { useState } from 'react'
import { Keyboard, Modal, StyleSheet } from 'react-native'

import Button from '../../components/Button'
import { Input, InputGroup } from '../../components/Inputs'
import { Text, Pressable } from '../../components/Themed'

import { theme } from '../../constants/Colors'

import useErrors from '../../hooks/useErrors'

import CalendarService from '../../services/CalendarService'

const examples = ['Faculdade', 'Metas pessoais', 'Férias', 'Trabalho']

type props = {
  visible: boolean
  onClose: () => void
}

export default function NewCalendarModal({ visible, onClose }: props) {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')

  const { addError, getErrorMessageByField, removeError } = useErrors()

  const handleNameChange = (newName: string) => {
    removeError('name')
    setName(newName)
    if (!newName)
      addError({
        field: 'name',
        message: 'Escolha um nome para seu calendário',
      })
  }

  const handleSubmit = async () => {
    Keyboard.dismiss()

    if (!name) {
      addError({
        field: 'name',
        message: 'Escolha um nome para seu calendário',
      })
      return
    }

    setLoading(true)

    try {
      await CalendarService.addCalendar({ title: name })
      setName('')
      onClose()
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          style={styles.contentContainer} /* Pressable is the new View */
          darkColor={theme.colors[700]}
        >
          <Text style={styles.title}>Novo calendário</Text>

          <InputGroup
            label='Nome'
            error={!!getErrorMessageByField('name')}
            errorMessage={getErrorMessageByField('name')}
          >
            <Input
              value={name}
              onChange={handleNameChange}
              placeholder={`Ex: ${
                examples[Math.floor(Math.random() * examples.length)]
              }`}
            />
          </InputGroup>
          <Button onPress={handleSubmit} loading={loading}>
            <Text
              style={styles.buttonLabel}
              lightColor={theme.colors[0]}
              darkColor={theme.colors[800]}
            >
              Criar
            </Text>
          </Button>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '60%',
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: theme.spacing.medium,
  },
  buttonLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
