import { useRef, useEffect, useState } from 'react'
import { StyleSheet, View, Animated } from 'react-native'

import { theme } from '../../constants/Colors'
import { addMonths } from 'date-fns/esm'
import { format } from 'date-fns'

type props = { currDate: Date }

export default function AnimatedMonth({ currDate = new Date() }: props) {
  const [prevMonth, setPrevMonth] = useState(addMonths(currDate, -1))
  const [midMonth, setMidMonth] = useState(currDate)
  const [nextMonth, setNextMonth] = useState(addMonths(currDate, 1))

  const leftAnim = useRef(new Animated.Value(-50)).current
  const midAnim = useRef(new Animated.Value(0)).current
  const rightAnim = useRef(new Animated.Value(50)).current

  const resetValues = () => {
    leftAnim.setValue(-50)
    midAnim.setValue(0)
    rightAnim.setValue(50)
    setPrevMonth(addMonths(currDate, -1))
    setMidMonth(currDate)
    setNextMonth(addMonths(currDate, +1))
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
        {format(prevMonth, 'MMM, yyyy')}
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
        {format(midMonth, 'MMM, yyyy')}
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
        {format(nextMonth, 'MMM, yyyy')}
      </Animated.Text>
    </View>
  )
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
