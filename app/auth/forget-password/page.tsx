import * as React from 'react'
import type { Metadata } from 'next'

import { Layout } from '@/components/auth/layout'
import { ForgetPasswordForm } from '@/components/auth/forgetPasswordForm'

export const metadata = {
  title: `Reset password | Innova`,
} satisfies Metadata

export default function Page(): React.JSX.Element {
  return (
    <Layout>
      <ForgetPasswordForm />
    </Layout>
  )
}
