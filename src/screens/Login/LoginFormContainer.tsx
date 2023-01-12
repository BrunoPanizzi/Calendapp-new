import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Text, View } from '../../components/Themed'

import { theme } from '../../constants/Colors'

import useToggle from '../../hooks/useToggle'

import Button from '../../components/Button'
import Form from './Form'

export default function LoginFormContainer() {
  const [width, setWidth] = useState(0)
  const [mode, toggleMode] = useToggle('login' as const, 'signup' as const)

  return (
    <View
      style={styles.container}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      <View style={styles.navBar}>
        <Text style={styles.text}>
          {mode === 'login' ? 'Faça login em sua conta' : 'Crie uma conta nova'}
        </Text>
        <Button onPress={toggleMode}>
          <Text>{mode === 'login' ? 'Criar conta' : 'Login'}</Text>
        </Button>
      </View>
      <View style={{ width, marginRight: theme.spacing.medium }}>
        <Form mode={mode} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  navBar: {
    borderRadius: theme.borderRadius,
    marginBottom: theme.spacing.medium,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: theme.text.big,
    fontWeight: 'bold',
  },
})
