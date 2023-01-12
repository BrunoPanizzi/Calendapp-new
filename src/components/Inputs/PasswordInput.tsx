import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import useToggle from '../../hooks/useToggle'

import { theme } from '../../constants/Colors'

import Input, { InputProps } from './Input'

export default function PasswordInput(props: InputProps) {
  const [showPassword, togglePassword] = useToggle(false, true)

  return (
    <View style={{ justifyContent: 'center' }}>
      <Input {...props} passwordVisible={showPassword} />
      <TouchableOpacity onPress={togglePassword} style={styles.eye}>
        <Ionicons
          name={showPassword ? 'eye' : 'eye-off'}
          size={theme.spacing.large}
          color={theme.colors[700]}
        />
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  eye: {
    position: 'absolute',
    right: theme.spacing.small,
  },
})
