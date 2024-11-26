import * as React from 'react'
import type { Metadata } from 'next'

import { Layout } from '@/components/auth/layout'

export const metadata = {
  title: `Sign in | Auth | introvista`,
} satisfies Metadata

function PageLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return <Layout>{children}</Layout>
}

export default PageLayout
