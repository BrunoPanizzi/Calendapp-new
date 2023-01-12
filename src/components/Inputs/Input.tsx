import { TextInput, StyleSheet } from 'react-native'

import { theme } from '../../constants/Colors'

export type InputProps = {
  value: string
  onChange: (text: string) => void
  placeholder?: string
  multiline?: boolean
  passwordVisible?: boolean
}

export default function Input({
  value,
  onChange,
  placeholder,
  multiline,
  passwordVisible,
}: InputProps) {
  return (
    <TextInput
      style={styles.input}
      selectionColor={theme.colors[200]}
      value={value}
      onChangeText={onChange}
      multiline={multiline}
      placeholder={placeholder}
      secureTextEntry={passwordVisible}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: theme.colors[0],
    borderRadius: theme.borderRadius,
    padding: theme.spacing.small,
    fontSize: theme.text.normal,
  },
})
