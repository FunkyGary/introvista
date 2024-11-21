"use client"

import * as React from "react"

import { SignUpForm } from "@/components/auth/signUpForm"
import withAuthOnly from "@/components/hoc/with-auth-only"

function Page(): React.JSX.Element {
  return <SignUpForm />
}

export default withAuthOnly(Page)
