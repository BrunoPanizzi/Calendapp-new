import { StyleSheet, Text, View } from 'react-native'

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
    backgroundColor: 'white',
  },
})
