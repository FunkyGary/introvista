import * as React from 'react'
import type { Metadata } from 'next'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'

import Account from '@/components/dashboard/account/account'

export const metadata = {
  title: `Account | Dashboard`,
} satisfies Metadata

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Account />
    </Stack>
  )
}
