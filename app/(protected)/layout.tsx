'use client'

import withAuthRequired from '@/components/hoc/with-auth-required'
import HeaderBar from '@/components/ui/headerbar'

function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative w-full min-h-full bg-background overscroll-none">
      <HeaderBar />
      <div className="flex relative">{children}</div>
    </div>
  )
}

export default withAuthRequired(ProtectedLayout)
