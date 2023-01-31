import { useEffect } from 'react'
import { StyleSheet, Pressable } from 'react-native'
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

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

const config = {
  damping: 20,
  mass: 1.3,
  stiffness: 200,
}

export default function Toggle({
  width,
  value,
  onChange,
  trackColor,
  headColor,
}: props) {
  const halfWidth = width / 2

  const headPos = useSharedValue(value ? halfWidth : 0)
  const isTouching = useSharedValue(0)

  const animatedHeadStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: headPos.value },
      { scale: interpolate(isTouching.value, [0, 1], [1, 1.25]) },
    ],
    backgroundColor: interpolateColor(
      headPos.value,
      [0, halfWidth],
      [headColor.on, headColor.off]
    ),
  }))

  const animatedTrackStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(isTouching.value, [0, 1], [1, 0.85]) }],

    backgroundColor: interpolateColor(
      headPos.value,
      [0, halfWidth],
      [trackColor.on, trackColor.off]
    ),
  }))

  useEffect(() => {
    headPos.value = withSpring(value ? halfWidth : 0, config)
  }, [value])

  return (
    <Pressable
      onPress={onChange}
      onPressIn={() => {
        isTouching.value = withSpring(1, config)
      }}
      onPressOut={() => {
        isTouching.value = withSpring(0, config)
      }}
    >
      <Animated.View style={[styles.track, animatedTrackStyle, { width }]}>
        <Animated.View
          style={[styles.head, animatedHeadStyle, { width: halfWidth }]}
        />
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  track: {
    aspectRatio: 2,
    borderRadius: 999,
  },
  head: {
    aspectRatio: 1,
    borderRadius: 999,
  },
})
