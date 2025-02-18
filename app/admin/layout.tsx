'use client'

import '@/styles/global.css'
import * as React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import GlobalStyles from '@mui/material/GlobalStyles'

import { MainNav } from '@/components/layout/main-nav'
import { SideNav } from '@/components/layout/side-nav'
import withAuthRequired from '@/components/hoc/with-auth-required'

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            '--MainNav-height': '56px',
            '--MainNav-zIndex': 1000,
            '--SideNav-width': '240px',
            '--SideNav-zIndex': 1100,
            '--MobileNav-width': '320px',
            '--MobileNav-zIndex': 1100,
          },
        }}
      />
      <Box
        sx={{
          bgcolor: 'var(--mui-palette-background-default)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minHeight: '100%',
        }}
      >
        <SideNav />
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            pl: 'var(--SideNav-width)',
          }}
        >
          <MainNav />
          <main>
            <Container maxWidth="xl" sx={{ py: '48px' }}>
              {children}
            </Container>
          </main>
        </Box>
      </Box>
    </>
  )
}

export default withAuthRequired(RootLayout)
