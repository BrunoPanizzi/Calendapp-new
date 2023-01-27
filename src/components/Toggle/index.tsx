import { useEffect, useRef } from 'react'
import { StyleSheet, Animated, Pressable } from 'react-native'

type props = {
  width: number
  value: boolean
  onChange: () => void
  trackColor: {
    on: string
    off: string
  }
  headColor: {
    on: string
    off: string
  }
}

// TODO: some good code review for this thing, might use reanimated
// also change the colors, its pretty bad right now
export default function Toggle({
  width,
  value,
  onChange,
  trackColor,
  headColor,
}: props) {
  const headPosition = useRef(new Animated.Value(0)).current
  const headScale = useRef(new Animated.Value(1)).current

  const halfWidth = width / 2

  useEffect(() => {
    Animated.timing(headPosition, {
      useNativeDriver: false,
      duration: 300,
      toValue: value ? halfWidth : 0,
    }).start()
  }, [value])

  return (
    <Pressable
      onPress={onChange}
      onPressIn={() => {
        Animated.timing(headScale, {
          useNativeDriver: false,
          duration: 150,
          toValue: 1.2,
        }).start()
      }}
      onTouchEnd={() => {
        Animated.timing(headScale, {
          useNativeDriver: false,
          duration: 150,
          toValue: 1,
        }).start()
      }}
    >
      <Animated.View
        style={[
          styles.track,
          {
            width,
            backgroundColor: headPosition.interpolate({
              inputRange: [0, halfWidth],
              outputRange: [trackColor.off, trackColor.on],
            }),
          },
        ]}
      >
        <Animated.View
          style={[
            styles.head,
            {
              width: halfWidth,
              backgroundColor: headPosition.interpolate({
                inputRange: [0, halfWidth],
                outputRange: [headColor.off, headColor.on],
              }),
              transform: [{ translateX: headPosition }, { scale: headScale }],
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  track: {
    aspectRatio: 2,
    backgroundColor: '#f0f',
    borderRadius: 999,
  },
  head: {
    aspectRatio: 1,
    backgroundColor: '#0ff',
    borderRadius: 999,
  },
})
