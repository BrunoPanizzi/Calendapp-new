import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'

import { theme } from '../../constants/Colors'

type props = {
  children: JSX.Element
  disabled?: boolean
  onPress: () => void
  loading?: boolean
  danger?: boolean
  outline?: boolean
}

// TODO: fix theming on the button
export default function Button({
  children,
  disabled,
  onPress,
  loading,
  danger,
  outline,
}: props) {
  const color = danger ? theme.colors.danger : theme.colors[500]

  return (
    <TouchableOpacity
      style={[
        styles.button,
        outline
          ? {
              borderColor: color,
              backgroundColor: color,
            }
          : {
              borderColor: color,
            },
      ]}
      disabled={disabled}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors[100]} size='large' />
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: theme.borderRadius,
    padding: theme.spacing.small,
    alignItems: 'center',
    marginTop: theme.spacing.small,
    borderWidth: 3,
  },
})
