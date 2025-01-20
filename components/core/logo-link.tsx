'use client'

import React from 'react'
import { Logo } from '../core/logo'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import RouterLink from 'next/link'
import { paths } from '@/paths'

const LogoLink = () => {
  return (
    <Stack sx={{ p: 1.6, background: 'white' }}>
      <Box
        component={RouterLink}
        href={paths.home}
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Logo color="light" height={32} width={62} />
        <Typography color="#9900FF" variant="h4">
          IntroVista
        </Typography>
      </Box>
    </Stack>
  )
}

export default LogoLink
