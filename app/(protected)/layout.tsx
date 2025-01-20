'use client'

import withAuthRequired from '@/components/hoc/with-auth-required'
import HeaderBar from '@/components/ui/headerbar'

function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex relative flex-col min-h-full bg-background">
      <HeaderBar />
      {children}
    </div>
  )
}

export default withAuthRequired(ProtectedLayout)
