import { StyleSheet, View, Pressable } from 'react-native'

import { theme } from '../../constants/Colors'

type props = {
  selectedColor: number | undefined
  setSelectedColor: (color: number) => void
}

export default function ColorSelector({
  selectedColor,
  setSelectedColor,
}: props) {
  const colors = [1, 60, 120, 180, 240, 300]

  return (
    <View style={styles.selection}>
      {colors.map((color) => (
        <Pressable
          key={color}
          style={[
            styles.ball,
            {
              backgroundColor: `hsla(${color}, 100%, 50%, 0.5)`,
              borderColor: `hsl(${color}, 75%, 35%)`,
            },
            color === selectedColor && {
              borderWidth: 2,
              transform: [{ scale: 1.2 }],
            },
          ]}
          onPress={() => setSelectedColor(color)}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  selection: {
    borderRadius: theme.borderRadius,
    paddingVertical: theme.spacing.small,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  ball: {
    width: theme.spacing.large,
    height: theme.spacing.large,
    borderRadius: 99,
  },
})
