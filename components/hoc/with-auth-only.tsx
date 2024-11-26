'use client'

import { useUser } from '@/hooks/use-user'
import AuthRedirect from '@/lib/auth/auth-redirect'
import { Backdrop, CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function withAuthOnly(
  WrappedComponent: React.FC<any> | React.ComponentClass<any, any>
) {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component'

  const ComponentWithAuthOnly = (props: any) => {
    const router = useRouter()
    const session = useUser()

    React.useEffect(() => {
      if (session.user) {
        const afterLoginPath = AuthRedirect.getAfterLoginPath()
        router.push(afterLoginPath)
      }
    }, [router, session.user])

    return <WrappedComponent {...props} />
  }
  ComponentWithAuthOnly.displayName = `withAuthOnly(${displayName})`

  return ComponentWithAuthOnly
}
