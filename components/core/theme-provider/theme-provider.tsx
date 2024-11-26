'use client'

import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'

import { createTheme } from '@/styles/theme/create-theme'

export interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({
  children,
}: ThemeProviderProps): React.JSX.Element {
  const theme = createTheme()

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      {children}
    </CssVarsProvider>
  )
}
