import AuthClient from '@/lib/auth/client'
import { useInjection } from 'inversify-react'

export const useAuthClient = () => {
  const authClient = useInjection(AuthClient)
  return authClient
}
