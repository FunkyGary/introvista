'use client'

import * as React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Controller, useForm } from 'react-hook-form'
import { z as zod } from 'zod'
import { useAuthClient } from '@/hooks/use-auth-client'
import { useRouter } from 'next/navigation'
import { paths } from '@/paths'

const schema = zod.object({
  password: zod.string().min(1, { message: 'Password is required.' }),
})

type Values = zod.infer<typeof schema>

const defaultValues = {
  password: '',
} satisfies Values

export function ResetPasswordForm(): React.JSX.Element {
  const [isPending, setIsPending] = React.useState<boolean>(false)
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false)
  const authClient = useAuthClient()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) })

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true)

      try {
        const code = new URLSearchParams(window.location.search).get('oobCode')

        if (!code) {
          setError('root', {
            type: 'server',
            message: '無效的重設密碼連結',
          })
          return
        }

        const { error } = await authClient.confirmPasswordReset({
          code,
          newPassword: values.password,
        })

        if (error) {
          setError('root', { type: 'server', message: error })
          return
        }

        setIsSuccess(true)
        setTimeout(() => {
          router.push(paths.auth.signIn)
        }, 3000)
      } catch (err) {
        setError('root', {
          type: 'server',
          message: 'An error occurred while processing your request',
        })
      } finally {
        setIsPending(false)
      }
    },
    [setError, authClient, router]
  )

  if (isSuccess) {
    return (
      <Stack spacing={2}>
        <Alert severity="success">
          密碼重設成功！3 秒後將自動跳轉至登入頁面...
        </Alert>
        <Typography>
          如果沒有自動跳轉，請
          <Button onClick={() => router.push('/auth/login')}>點此</Button>
          前往登入頁面
        </Typography>
      </Stack>
    )
  }

  return (
    <Stack spacing={4}>
      <Typography variant="h5">重設密碼</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>新密碼</InputLabel>
                <OutlinedInput
                  {...field}
                  type="password"
                  label="新密碼"
                  autoComplete="new-password"
                />
                {errors.password ? (
                  <FormHelperText>{errors.password.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          {errors.root ? (
            <Alert severity="error">{errors.root.message}</Alert>
          ) : null}
          <Button
            disabled={isPending}
            type="submit"
            variant="contained"
            fullWidth
          >
            {isPending ? '處理中...' : '更新密碼'}
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}
