import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'

import { theme } from '../../constants/Colors'

import Button from '../Button'

type props = {
  title: string
  message: string
  visible: boolean
  onClose: () => void
  dangerousAction: () => void
  dangerLabel: string
}

export default function DangerModal({
  title,
  message,
  visible,
  onClose,
  dangerousAction,
  dangerLabel,
}: props) {
  const handleDangerousAction = () => {
    onClose()
    dangerousAction()
  }

  return (
    <Modal
      animationType='fade'
      transparent
      statusBarTranslucent
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          style={styles.contentContainer} /* Pressable is the new View */
        >
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View
            style={{
              flexDirection: 'row',
              marginTop: theme.spacing.medium,
            }}
          >
            <View style={{ flex: 1, marginRight: theme.spacing.medium }}>
              <Button onPress={onClose} outline>
                <Text style={styles.cancelLabel}>Cancelar</Text>
              </Button>
            </View>
            <View style={{ flex: 1 }}>
              <Button onPress={handleDangerousAction} danger>
                <Text style={styles.dangerLabel}>{dangerLabel}</Text>
              </Button>
            </View>
          </View>
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
    minWidth: '65%',
    maxWidth: '80%',
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
  cancelLabel: {
    fontSize: 20,
    color: theme.colors[500],
    fontWeight: 'bold',
  },
  dangerLabel: {
    fontSize: 20,
    color: theme.colors[0],
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
    color: theme.colors[700],
    textAlign: 'center',
  },
})
