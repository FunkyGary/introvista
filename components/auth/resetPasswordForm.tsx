"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import InputLabel from "@mui/material/InputLabel"
import OutlinedInput from "@mui/material/OutlinedInput"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { Controller, useForm } from "react-hook-form"
import { z as zod } from "zod"
import { useAuthClient } from "@/hooks/use-auth-client"

const schema = zod.object({
  password: zod.string().min(8, { message: "密碼至少需要 8 個字元" }),
})

type Values = zod.infer<typeof schema>

const defaultValues = {
  password: "",
} satisfies Values

export function ResetPasswordForm(): React.JSX.Element {
  const [isPending, setIsPending] = React.useState<boolean>(false)
  const authClient = useAuthClient()

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
        // const { error } = await authClient.resetPassword(values)
        // if (error) {
        //   setError("root", { type: "server", message: error })
        //   return
        // }
      } catch (err) {
        setError("root", {
          type: "server",
          message: "An error occurred while processing your request",
        })
      } finally {
        setIsPending(false)
      }
    },
    [setError]
  )

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
                <OutlinedInput {...field} type="password" label="新密碼" />
                {errors.password ? (
                  <FormHelperText>{errors.password.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          {errors.root ? (
            <Alert color="error">{errors.root.message}</Alert>
          ) : null}
          <Button disabled={isPending} type="submit" variant="contained">
            更新密碼
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}
