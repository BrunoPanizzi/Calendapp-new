import { memo } from 'react'
import { Pressable, StyleSheet, ActivityIndicator } from 'react-native'

import { theme } from '../../constants/Colors'

type props = {
  children: JSX.Element
  disabled?: boolean
  onPress: () => void
  loading?: boolean
  danger?: boolean
  outline?: boolean
  width?: string | number | undefined
}

// TODO: fix theming on the button
function Button({
  children,
  disabled,
  onPress,
  loading,
  danger,
  outline,
  width = undefined,
}: props) {
  const color = danger ? theme.colors.danger : theme.colors[500]

  return (
    <Pressable
      style={[
        styles.button,
        { width },
        outline
          ? {
              borderColor: color,
            }
          : {
              borderColor: color,
              backgroundColor: color,
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
    </Pressable>
  )
}
export default memo(Button)

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.borderRadius,
    padding: theme.spacing.small,
    alignItems: 'center',
    marginTop: theme.spacing.small,
    borderWidth: 3,
  },
})
