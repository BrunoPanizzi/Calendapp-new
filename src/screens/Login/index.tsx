import { StyleSheet } from 'react-native'
import { Text, View } from '../../components/Themed'

import { theme } from '../../constants/Colors'
import LoginFormContainer from './LoginFormContainer'

export default function Login() {
  // TODO: make something better looking because holy shit
  return (
    <View style={styles.container}>
      <View
        darkColor={theme.colors[100]}
        lightColor={theme.colors[600]}
        style={styles.logo}
      >
        <Text
          style={styles.largeText}
          darkColor={theme.colors[600]}
          lightColor={theme.colors[0]}
        >
          Calendapp
        </Text>
      </View>
      <LoginFormContainer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.large,
    paddingBottom: theme.spacing.small,
  },
  logo: {
    paddingHorizontal: theme.spacing.large,
    paddingVertical: theme.spacing.medium,
    borderRadius: theme.bigBorderRadius,
    marginBottom: theme.spacing.large * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeText: {
    fontSize: theme.text.huge * 2,
    fontWeight: 'bold',
  },
})
