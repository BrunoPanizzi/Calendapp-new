import { StyleSheet } from 'react-native'

import { Text, View } from '../../components/Themed'

export default function CreateEvent() {
  return (
    <View style={styles.container}>
      <Text> this is the create event screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
