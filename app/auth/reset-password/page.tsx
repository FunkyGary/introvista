import * as React from "react"
import type { Metadata } from "next"

import { Layout } from "@/components/auth/layout"
import { ResetPasswordForm } from "@/components/auth/resetPasswordForm"
import { ResetPasswordView } from "@/components/auth/resetPasswordView"

export const metadata = {
  title: `Forget password | Innova`,
} satisfies Metadata

export default function Page(): React.JSX.Element {
  return (
    <Layout>
      {/* <ResetPasswordView /> */}
      <ResetPasswordForm />
    </Layout>
  )
}
