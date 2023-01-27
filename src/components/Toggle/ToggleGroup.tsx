import { StyleSheet, Text, View } from 'react-native'

import { theme } from '../../constants/Colors'

type props = {
  children: React.ReactNode
  label: string
  width: string | number
}

export default function ToggleGroup({ children, label, width }: props) {
  return (
    <View style={[styles.container, { width }]}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors[800],
    marginBottom: 4,
    width: '75%',
  },
})
