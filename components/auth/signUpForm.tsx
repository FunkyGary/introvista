"use client"

import * as React from "react"
import RouterLink from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import FormHelperText from "@mui/material/FormHelperText"
import InputLabel from "@mui/material/InputLabel"
import Link from "@mui/material/Link"
import OutlinedInput from "@mui/material/OutlinedInput"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import { Controller, FormProvider, useForm } from "react-hook-form"
import {
  signUpSchema,
  SignUpValues,
  defaultSignUpValues,
} from "@/lib/auth/schemas"

import { paths } from "@/paths"
import { useAuthClient } from "@/hooks/use-auth-client"

export function SignUpForm(): React.JSX.Element {
  const router = useRouter()
  const [isPending, setIsPending] = React.useState<boolean>(false)

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm<SignUpValues>({
    defaultValues: defaultSignUpValues,
    resolver: zodResolver(signUpSchema),
  })

  const authClient = useAuthClient()
  const onSubmit = React.useCallback(
    async (data: SignUpValues) => {
      setIsPending(true)

      const { error } = await authClient.signUp(data)

      if (error) {
        setError("root", { type: "server", message: error })
        setIsPending(false)
        return
      }

      // UserProvider, for this case, will not refresh the router
      // After refresh, GuestGuard will handle the redirect
      router.refresh()
    },
    [router, setError, authClient]
  )

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4">註冊帳號</Typography>
        <Typography color="text.secondary" variant="body2">
          已經有帳號了？{" "}
          <Link
            component={RouterLink}
            href={paths.auth.signIn}
            underline="hover"
            variant="subtitle2"
          >
            登入
          </Link>
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <FormControl error={Boolean(errors.username)}>
                <InputLabel>使用者名稱</InputLabel>
                <OutlinedInput {...field} label="使用者名稱" />
                {errors.username && (
                  <FormHelperText>{errors.username.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput {...field} label="Email address" type="email" />
                {errors.email ? (
                  <FormHelperText>{errors.email.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput {...field} label="Password" type="password" />
                {errors.password ? (
                  <FormHelperText>{errors.password.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <FormControl error={Boolean(errors.role)}>
                <InputLabel>角色</InputLabel>
                <Select {...field} label="角色">
                  <MenuItem value="designer">設計師</MenuItem>
                  <MenuItem value="supplier">供應商</MenuItem>
                </Select>
                {errors.role && (
                  <FormHelperText>{errors.role.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="contactInfo.phone"
            render={({ field }) => (
              <FormControl error={Boolean(errors.contactInfo?.phone)}>
                <InputLabel>聯絡電話</InputLabel>
                <OutlinedInput {...field} label="聯絡電話" />
                {errors.contactInfo?.phone && (
                  <FormHelperText>
                    {errors.contactInfo.phone.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
          {watch("role") === "supplier" && (
            <>
              <Controller
                control={control}
                name="supplierInfo.companyName"
                render={({ field }) => (
                  <FormControl>
                    <InputLabel>公司名稱</InputLabel>
                    <OutlinedInput {...field} label="公司名稱" />
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="supplierInfo.taxID"
                render={({ field }) => (
                  <FormControl>
                    <InputLabel>統一編號</InputLabel>
                    <OutlinedInput {...field} label="統一編號" />
                  </FormControl>
                )}
              />
            </>
          )}
          <Controller
            control={control}
            name="preferences.language"
            render={({ field }) => (
              <FormControl error={Boolean(errors.preferences?.language)}>
                <InputLabel>偏好語言</InputLabel>
                <Select {...field} label="偏好語言">
                  <MenuItem value="zh-TW">中文</MenuItem>
                  <MenuItem value="en">English</MenuItem>
                </Select>
                {errors.preferences?.language ? (
                  <FormHelperText>
                    {errors.preferences.language.message}
                  </FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="terms"
            render={({ field }) => (
              <FormControl error={Boolean(errors.terms)}>
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label={
                    <React.Fragment>
                      I have read the <Link>terms and conditions</Link>
                    </React.Fragment>
                  }
                />
                {errors.terms && (
                  <FormHelperText>{errors.terms.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
          {errors.root && <Alert color="error">{errors.root.message}</Alert>}
          <Button disabled={isPending} type="submit" variant="contained">
            註冊
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}
