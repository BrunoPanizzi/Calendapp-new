import { FontAwesome } from '@expo/vector-icons'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Auth } from '../../firebase'

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false)
  const [isAuthLoaded, setIsAuthLoaded] = useState(false)

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync()

        onAuthStateChanged(Auth, () => {
          setIsAuthLoaded(true)
        })

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        })
      } catch (e) {
        console.warn(e)
      } finally {
        setLoadingComplete(true)
        SplashScreen.hideAsync()
      }
    }

    loadResourcesAndDataAsync()
  }, [])

  return isLoadingComplete && isAuthLoaded
}
