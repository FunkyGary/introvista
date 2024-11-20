import * as React from "react"
import type { Metadata } from "next"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Unstable_Grid2"

import AccountForm from "@/components/dashboard/account/accountForm"

export const metadata = {
  title: `Account | Dashboard`,
} satisfies Metadata

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <AccountForm />
    </Stack>
  )
}
