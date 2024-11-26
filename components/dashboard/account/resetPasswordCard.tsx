'use client'

import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { enqueueSnackbar } from 'notistack'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import { Stack } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { z as zod } from 'zod'
import { useAuthClient } from '@/hooks/use-auth-client'
import { useRouter } from 'next/navigation'

const schema = zod.object({
  oldPassword: zod.string().min(1, { message: '請輸入舊密碼' }),
  newPassword: zod.string().min(6, { message: '密碼至少需要 6 個字元' }),
})

type Values = zod.infer<typeof schema>

const defaultValues = {
  oldPassword: '',
  newPassword: '',
} satisfies Values

export function ResetPasswordCard(): React.JSX.Element {
  const [isPending, setIsPending] = React.useState<boolean>(false)
  const authClient = useAuthClient()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) })

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true)

      try {
        const result = await authClient.updatePassword(values)

        if (result) {
          enqueueSnackbar('更新密碼成功！', { variant: 'success' })
          reset(defaultValues)
          router.refresh()
        }
      } catch (err) {
        setError('root', {
          type: 'server',
          message: 'An error occurred while processing your request',
        })
      } finally {
        setIsPending(false)
      }
    },
    [setError, authClient, router, reset]
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader title="重設密碼" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>舊密碼</InputLabel>
                <Controller
                  name="oldPassword"
                  control={control}
                  render={({ field }) => (
                    <OutlinedInput {...field} type="password" label="新密碼" />
                  )}
                />
              </FormControl>
              {errors.root ? (
                <Alert color="error">{errors.root.message}</Alert>
              ) : null}
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>新密碼</InputLabel>
                <Controller
                  name="newPassword"
                  control={control}
                  render={({ field }) => (
                    <OutlinedInput {...field} type="password" label="新密碼" />
                  )}
                />
              </FormControl>
              {errors.root ? (
                <Alert color="error">{errors.root.message}</Alert>
              ) : null}
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained">
            更新密碼
          </Button>
        </CardActions>
      </Card>
    </form>
  )
}
