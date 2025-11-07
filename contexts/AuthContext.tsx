'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  user: { email: string; name: string } | null
  setUser: (user: { email: string; name: string } | null) => void
  login: (email: string, name: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ email: string; name: string } | null>(null)

  useEffect(() => {
    // Check if user is authenticated from localStorage
    const authStatus = localStorage.getItem('isAuthenticated')
    const userData = localStorage.getItem('user')
    
    if (authStatus === 'true' && userData) {
      setIsAuthenticated(true)
      setUser(JSON.parse(userData))
    }
  }, [])

  const login = (email: string, name: string) => {
    setIsAuthenticated(true)
    const userData = { email, name }
    setUser(userData)
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

