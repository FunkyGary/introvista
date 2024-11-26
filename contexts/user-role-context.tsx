'use client'

import * as React from 'react'
import { useAuthClient } from '@/hooks/use-auth-client'

export interface UserRoleContextValue {
  userRole: string | null
  error: string | null
  isLoading: boolean
  checkSessionRole?: () => Promise<void>
}

export const UserRoleContext = React.createContext<
  UserRoleContextValue | undefined
>(undefined)

export interface UserRoleProviderProps {
  children: React.ReactNode
}

export function UserRoleProvider({
  children,
}: UserRoleProviderProps): React.JSX.Element {
  const [state, setState] = React.useState<{
    userRole: string | null
    error: string | null
    isLoading: boolean
  }>({
    userRole: null,
    error: null,
    isLoading: true,
  })

  const authClient = useAuthClient()
  const checkSessionRole = React.useCallback(async (): Promise<void> => {
    try {
      const { data, error } = await authClient.getUserRole()

      if (error) {
        setState((prev) => ({
          ...prev,
          userRole: null,
          error: 'Something went wrong',
          isLoading: false,
        }))
        return
      }

      setState((prev) => ({
        ...prev,
        userRole: data ?? null,
        error: null,
        isLoading: false,
      }))
    } catch (err) {
      setState((prev) => ({
        ...prev,
        userRole: null,
        error: 'Something went wrong',
        isLoading: false,
      }))
    }
  }, [authClient])

  React.useEffect(() => {
    const unsubscribe = authClient.onUserChange(async (user) => {
      if (user) {
        await checkSessionRole()
      } else {
        setState((prev) => ({
          ...prev,
          userRole: null,
          error: null,
          isLoading: false,
        }))
      }
    })

    return unsubscribe
  }, [authClient, checkSessionRole])

  return (
    <UserRoleContext.Provider value={{ ...state, checkSessionRole }}>
      {children}
    </UserRoleContext.Provider>
  )
}

export const UserConsumer = UserRoleContext.Consumer
