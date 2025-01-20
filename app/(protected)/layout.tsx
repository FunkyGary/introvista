'use client'

import withAuthRequired from '@/components/hoc/with-auth-required'
import HeaderBar from '@/components/ui/headerbar'

function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-full bg-background">
      <HeaderBar />
      <div className="flex">{children}</div>
    </div>
  )
}

export default withAuthRequired(ProtectedLayout)
