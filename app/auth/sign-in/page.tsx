"use client"

import * as React from "react"

import { SignInForm } from "@/components/auth/signInForm"
import withAuthOnly from "@/components/hoc/with-auth-only"

function Page(): React.JSX.Element {
  return <SignInForm />
}

export default withAuthOnly(Page)
