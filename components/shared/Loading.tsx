import { Box, CircularProgress } from '@mui/material'

export function Loading() {
  return (
    <Box display="flex" justifyContent="center" p={4}>
      <CircularProgress />
    </Box>
  )
}
