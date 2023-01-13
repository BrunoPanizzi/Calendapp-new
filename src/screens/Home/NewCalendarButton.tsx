import { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { View } from '../../components/Themed'

import { theme } from '../../constants/Colors'

import NewCalendarModal from './NewCalendarModal'

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
})
