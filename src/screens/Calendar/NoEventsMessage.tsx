import { StyleSheet, Text, View } from 'react-native'

import { theme } from '../../constants/Colors'

export default function NoEventsMessage() {
  return (
    <View>
      <Text style={[styles.text, { marginBottom: theme.spacing.medium }]}>
        Parece que você ainda não tem nenhum evento por aqui...
      </Text>
      <Text style={[styles.text, { color: theme.colors[500], fontSize: 24 }]}>
        Crie um no botão abaixo!
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: theme.colors[700],
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing.small,
  },
})
