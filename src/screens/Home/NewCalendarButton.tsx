import { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { theme } from '../../constants/Colors'

export default function NewCalendarButton() {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setModalVisible(true)}
    >
      <NewCalendarModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <View style={styles.line} />
      <View style={[styles.line, { transform: [{ rotate: '90deg' }] }]} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: theme.colors[500],
    bottom: theme.spacing.medium,
    right: theme.spacing.medium,
    borderRadius: 999,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    position: 'absolute',
    height: 3,
    left: 12,
    right: 12,
    borderRadius: 2,
    backgroundColor: theme.colors[100],
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '60%',
    backgroundColor: theme.colors[0],
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors[700],
    marginBottom: theme.spacing.medium,
  },
  buttonLabel: {
    fontSize: 20,
    color: theme.colors[0],
    fontWeight: 'bold',
  },
})

///////////////////////////////////
/////// NEW CALENDAR MODAL ////////
///////////////////////////////////

import { Text, Modal, Pressable, Keyboard } from 'react-native'

import CalendarService from '../../services/CalendarService'

import useErrors from '../../hooks/useErrors'

import { InputGroup, Input } from '../../components/Inputs'
import Button from '../../components/Button'

const examples = ['Faculdade', 'Metas pessoais', 'Férias', 'Trabalho']

function NewCalendarModal({
  visible,
  onClose,
}: {
  visible: boolean
  onClose: () => void
}) {
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
      onClose()
      setName('')
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
            <Text style={styles.buttonLabel}>Criar</Text>
          </Button>
        </Pressable>
      </Pressable>
    </Modal>
  )
}
