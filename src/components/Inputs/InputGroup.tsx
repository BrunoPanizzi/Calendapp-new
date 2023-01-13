import { StyleSheet } from 'react-native'
import { Text, View } from '../Themed'

import { theme } from '../../constants/Colors'

type props = {
  label: string
  children: JSX.Element
  width?: number | string
  error?: boolean
  errorMessage?: string
}

export default function InputGroup({
  label,
  children,
  width = '100%',
  error,
  errorMessage,
}: props) {
  return (
    <View style={[styles.container, { width }]}>
      <Text
        style={styles.label}
        darkColor={theme.colors[100]}
        lightColor={theme.colors[800]}
      >
        {label}
      </Text>
      <View style={[styles.border, error && styles.borderDanger]}>
        {children}
      </View>
      {error && (
        <Text style={[styles.label, styles.errorLabel]}>{errorMessage}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  errorLabel: {
    color: theme.colors.danger,
    marginBottom: 0,
    marginTop: 4,
  },
  border: {
    borderRadius: theme.borderRadius,
    borderWidth: 2,
    borderColor: theme.colors[500],
  },
  borderDanger: {
    borderColor: theme.colors.danger,
  },
})
