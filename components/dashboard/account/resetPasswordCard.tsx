"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid"
import InputLabel from "@mui/material/InputLabel"
import OutlinedInput from "@mui/material/OutlinedInput"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import { Controller, useForm } from "react-hook-form"
import { z as zod } from "zod"

const schema = zod.object({
  password: zod.string().min(8, { message: "密碼至少需要 8 個字元" }),
})

type Values = zod.infer<typeof schema>

const defaultValues = {
  password: "",
} satisfies Values

export function ResetPasswordCard(): React.JSX.Element {
  const [isPending, setIsPending] = React.useState<boolean>(false)

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
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader title="重設密碼" />
        <Divider />
        <CardContent>
          <Grid xs={6}>
            <FormControl fullWidth>
              <InputLabel>新密碼</InputLabel>
              <Controller
                name="password"
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
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained">
            更新密碼
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}
