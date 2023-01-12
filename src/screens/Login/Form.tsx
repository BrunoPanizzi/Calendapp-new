import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Text, View } from '../../components/Themed'

import isEmailValid from '../../utils/isEmailValid'

import UserService from '../../services/UserService'

import useErrors from '../../hooks/useErrors'

import { theme } from '../../constants/Colors'

import { Input, InputGroup, PasswordInput } from '../../components/Inputs'
import Button from '../../components/Button'

type props = {
  mode: 'login' | 'signup'
}
export default function Form({ mode }: props) {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { addError, getErrorMessageByField, removeError } = useErrors()

  const handleEmail = (value: string) => {
    setEmail(value)
    if (!isEmailValid(email)) {
      addError({ field: 'email', message: 'Formato de email inválido' })
    }
    removeError('email')
  }

  const handlePassword = (value: string) => {
    setPassword(value)

    removeError('password')
  }

  const handleSubmit = async () => {
    if (!email) {
      addError({ field: 'email', message: 'Email incorreto' })
      return
    }
    if (!password) {
      addError({ field: 'password', message: 'Senha incorreta' })
      return
    }

    const method = mode === 'login' ? UserService.login : UserService.createUser

    try {
      setLoading(true)
      const userCredential = await method(email, password)

      console.log(`user logged in\n ${userCredential}`)
    } catch (err) {
      console.log(err)
      addError({ field: 'email', message: 'Email incorreto' })
      addError({ field: 'password', message: 'Senha incorreta' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <InputGroup
        label='Email'
        error={!!getErrorMessageByField('email')}
        errorMessage={getErrorMessageByField('email')}
      >
        <Input value={email} onChange={handleEmail} />
      </InputGroup>
      <InputGroup
        label='Senha'
        error={!!getErrorMessageByField('password')}
        errorMessage={getErrorMessageByField('password')}
      >
        <PasswordInput value={password} onChange={handlePassword} />
      </InputGroup>
      {mode === 'login' && (
        <Text darkColor={theme.colors[200]} style={styles.forgotPassword}>
          Esqueceu sua senha?
        </Text>
      )}
      <Button onPress={handleSubmit} width='100%' loading={loading}>
        <Text style={styles.buttonLabel}>
          {mode === 'login' ? 'Login' : 'Criar Conta'}
        </Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
  },
  buttonLabel: {
    fontWeight: 'bold',
    fontSize: 36,
    color: theme.colors[0],
  },
  forgotPassword: {
    fontSize: theme.text.small,
    marginBottom: theme.spacing.small / 2,
  },
})
