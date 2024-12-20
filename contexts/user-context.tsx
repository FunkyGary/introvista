'use client'

import * as React from 'react'

import type { User } from '@/types/user'
import { useAuthClient } from '@/hooks/use-auth-client'

export interface UserContextValue {
  user: User | null
  error: string | null
  isLoading: boolean
  checkSession?: () => Promise<void>
}

export const UserContext = React.createContext<UserContextValue | undefined>(
  undefined
)

export interface UserProviderProps {
  children: React.ReactNode
}

export function UserProvider({
  children,
}: UserProviderProps): React.JSX.Element {
  const [state, setState] = React.useState<{
    user: User | null
    error: string | null
    isLoading: boolean
  }>({
    user: null,
    error: null,
    isLoading: true,
  })

  const authClient = useAuthClient()
  const checkSession = React.useCallback(async (): Promise<void> => {
    try {
      const { data, error } = await authClient.getUser()

      if (error) {
        setState((prev) => ({
          ...prev,
          user: null,
          error: 'Something went wrong',
          isLoading: false,
        }))
        return
      }

      setState((prev) => ({
        ...prev,
        user: data ?? null,
        error: null,
        isLoading: false,
      }))
    } catch (err) {
      setState((prev) => ({
        ...prev,
        user: null,
        error: 'Something went wrong',
        isLoading: false,
      }))
    }
  }, [])

  React.useEffect(() => {
    checkSession().catch((err: unknown) => {
      console.log(err)
    })
  }, [checkSession])

  React.useEffect(() => {
    authClient.onUserChange((user) => {
      setState((prev) => ({
        ...prev,
        user,
        error: null,
        isLoading: false,
      }))
    })
  }, [])

  return (
    <UserContext.Provider value={{ ...state, checkSession }}>
      {children}
    </UserContext.Provider>
  )
}

export const UserConsumer = UserContext.Consumer
