import { Pressable, StyleSheet, Text, View } from 'react-native'

import { DrawerScreenProps } from '../../../types'

export default function Home({ navigation }: DrawerScreenProps<'Home'>) {
  return (
    <View style={styles.container}>
      <Text> this is the home screen</Text>
      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.navigate('Calendar', {
            title: 'Calendar',
          })
        }}
      >
        <Text>Go to the calendar screeen</Text>
      </Pressable>
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
  button: {
    backgroundColor: 'aquamarine',
    padding: 12,
    marginTop: 16,
  },
})
