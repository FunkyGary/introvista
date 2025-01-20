'use client'

import withAuthRequired from '@/components/hoc/with-auth-required'

function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex relative flex-col min-h-full bg-background">
      {/* <Header /> */}
      {children}
    </div>
  )
}

export default withAuthRequired(ProtectedLayout)
