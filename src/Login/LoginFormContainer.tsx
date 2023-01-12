import { useState, useRef } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native'
import { Text, View } from '../components/Themed'

import { theme } from '../constants/Colors'
import Form from './Form'

export default function LoginFormContainer() {
  const [width, setWidth] = useState(0)
  const selectionRef = useRef()

  return (
    <View
      style={styles.container}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      <View style={styles.navBar}>
        <Animated.View style={styles.selector} />
        <TouchableOpacity style={styles.textContainer}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.textContainer} onPress={() => {}}>
          <Text style={styles.text}>Criar conta</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
      >
        <View style={{ width, marginRight: theme.spacing.medium }}>
          <Form mode='login' />
        </View>
        <View style={{ width, marginLeft: theme.spacing.medium }}>
          <Form mode='signup' />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // marginBottom: theme.spacing.large * 3
  },
  navBar: {
    backgroundColor: theme.colors[100],
    borderRadius: theme.borderRadius,
    paddingVertical: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  selector: {
    position: 'absolute',
    width: '50%',
    top: 0,
    bottom: 0,
    borderRadius: theme.borderRadius,
    borderWidth: 3,
    borderColor: theme.colors[500],
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: theme.text.big,
    fontWeight: 'bold',
    color: theme.colors[700],
  },
})
