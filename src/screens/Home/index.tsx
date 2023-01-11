import { Pressable, StyleSheet } from 'react-native'

import { Text, View } from '../../components/Themed'

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
  },
  button: {
    backgroundColor: 'aquamarine',
    padding: 12,
    marginTop: 16,
  },
})
