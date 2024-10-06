"use client";

import * as React from "react";

import { SignInForm } from "@/components/auth/sign-in-form";
import withAuthOnly from "@/components/hoc/with-auth-only";

function Page(): React.JSX.Element {
  return <SignInForm />;
}

export default withAuthOnly(Page);
