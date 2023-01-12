import { createContext, useContext, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'

import { Auth } from '../../firebase'

type authContext = {
  user: User | null
}

const AuthContext = createContext<authContext>({ user: null })

type providerProps = {
  children: JSX.Element
}

export default function AuthProvider({ children }: providerProps) {
  const [user, setUser] = useState(Auth.currentUser)

  onAuthStateChanged(Auth, (u) => {
    setUser(u)
  })

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export function useAuth(): authContext {
  return useContext(AuthContext)
}
