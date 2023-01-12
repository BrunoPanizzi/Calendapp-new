import { useRef, useEffect, useState } from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import propTypes from 'prop-types'

import { theme } from '../../constants/Colors'

const meses = [
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dez',
]

export default function AnimatedMonth({ currDate }: { currDate: Date }) {
  const [prevMonth, setPrevMonth] = useState(
    new Date(currDate.getFullYear(), currDate.getMonth() - 1)
  )
  const [midMonth, setMidMonth] = useState(new Date(currDate))
  const [nextMonth, setNextMonth] = useState(
    new Date(currDate.getFullYear(), currDate.getMonth() + 1)
  )

  const leftAnim = useRef(new Animated.Value(-50)).current
  const midAnim = useRef(new Animated.Value(0)).current
  const rightAnim = useRef(new Animated.Value(50)).current

  const resetValues = () => {
    // resets every state and animation value
    leftAnim.setValue(-50)
    midAnim.setValue(0)
    rightAnim.setValue(50)
    setPrevMonth(new Date(currDate.getFullYear(), currDate.getMonth() - 1))
    setMidMonth(new Date(currDate))
    setNextMonth(new Date(currDate.getFullYear(), currDate.getMonth() + 1))
  }

  const prevMonthAnim = () => {
    const left = Animated.timing(leftAnim, {
      useNativeDriver: true,
      toValue: 0,
      duration: 300,
    })
    const mid = Animated.timing(midAnim, {
      useNativeDriver: true,
      toValue: 50,
      duration: 300,
    })
    Animated.parallel([left, mid]).start(({ finished }) => {
      if (finished) {
        resetValues()
      }
    })
  }

  const nextMonthAnim = () => {
    const right = Animated.timing(rightAnim, {
      useNativeDriver: true,
      toValue: 0,
      duration: 300,
    })
    const mid = Animated.timing(midAnim, {
      useNativeDriver: true,
      toValue: -50,
      duration: 300,
    })
    Animated.parallel([right, mid]).start(({ finished }) => {
      if (finished) {
        resetValues()
      }
    })
  }

  useEffect(() => {
    if (currDate > midMonth) {
      nextMonthAnim()
    } else if (currDate < midMonth) {
      prevMonthAnim()
    }
  }, [currDate])

  return (
    <View style={styles.container}>
      <Animated.Text // previous month
        style={[
          styles.text,
          {
            opacity: leftAnim.interpolate({
              inputRange: [-50, 0],
              outputRange: [0, 1],
            }),
            transform: [{ translateX: leftAnim }],
          },
        ]}
      >
        {meses[prevMonth.getMonth()]}, {prevMonth.getFullYear()}
      </Animated.Text>

      <Animated.Text // current month
        style={[
          styles.text,
          {
            opacity: midAnim.interpolate({
              inputRange: [-50, 0, 50],
              outputRange: [0, 1, 0],
            }),
            transform: [{ translateX: midAnim }],
          },
        ]}
      >
        {meses[midMonth.getMonth()]}, {midMonth.getFullYear()}
      </Animated.Text>

      <Animated.Text // next month
        style={[
          styles.text,
          {
            opacity: rightAnim.interpolate({
              inputRange: [0, 50],
              outputRange: [1, 0],
            }),
            transform: [{ translateX: rightAnim }],
          },
        ]}
      >
        {meses[nextMonth.getMonth()]}, {nextMonth.getFullYear()}
      </Animated.Text>
    </View>
  )
}

AnimatedMonth.propTypes = {
  currDate: propTypes.instanceOf(Date).isRequired,
}

const styles = StyleSheet.create({
  text: {
    position: 'absolute',
    color: theme.colors[700],
    fontSize: theme.text.big,
    textAlignVertical: 'center',
  },
  container: {
    position: 'relative',
    height: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
