"use client"

import * as React from "react"
import RouterLink from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import Alert from "@mui/material/Alert"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormHelperText from "@mui/material/FormHelperText"
import InputLabel from "@mui/material/InputLabel"
import Link from "@mui/material/Link"
import OutlinedInput from "@mui/material/OutlinedInput"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { z as zod } from "zod"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"

import { paths } from "@/paths"
import { useAuthClient } from "@/hooks/use-auth-client"

const schema = zod.object({
  username: zod.string().min(1, { message: "Username is required" }),
  email: zod.string().min(1, { message: "Email is required" }).email(),
  password: zod
    .string()
    .min(6, { message: "Password should be at least 6 characters" }),
  role: zod.enum(["supplier", "designer"], {
    required_error: "Please select a role",
  }),
  contactInfo: zod.object({
    phone: zod.string().min(1, { message: "Phone number is required" }),
    address: zod.string().optional(),
    website: zod.string().optional(),
  }),
  supplierInfo: zod
    .object({
      companyName: zod.string().optional(),
      taxID: zod.string().optional(),
      companyDescription: zod.string().optional(),
    })
    .optional(),
  designerInfo: zod
    .object({
      portfolioUrl: zod.string().optional(),
    })
    .optional(),
  preferences: zod.object({
    language: zod.string().default("zh-TW"),
    currency: zod.string().default("TWD"),
  }),
  terms: zod
    .boolean()
    .refine((value) => value, "You must accept the terms and conditions"),
})

type Values = zod.infer<typeof schema>

const defaultValues = {
  username: "",
  email: "",
  password: "",
  role: "designer" as const,
  contactInfo: {
    phone: "",
    address: "",
    website: "",
  },
  supplierInfo: {
    companyName: "",
    taxID: "",
    companyDescription: "",
  },
  designerInfo: {
    portfolioUrl: "",
  },
  preferences: {
    language: "zh-TW",
    currency: "TWD",
  },
  terms: false,
} satisfies Values

export function SignUpForm(): React.JSX.Element {
  const router = useRouter()

  const [isPending, setIsPending] = React.useState<boolean>(false)

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
    getValues,
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) })

  const authClient = useAuthClient()
  const onSubmit = React.useCallback(
    async (data: Values) => {
      setIsPending(true)

      const { error } = await authClient.signUp(data)

      if (error) {
        setError("root", { type: "server", message: error })
        setIsPending(false)
        console.log(error)

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
          {/* <Controller
            control={control}
            name="preferences.currency"
            render={({ field }) => (
              <FormControl error={Boolean(errors.preferences?.currency)}>
                <InputLabel>Currency</InputLabel>
                <OutlinedInput {...field} label="Currency" />
                {errors.preferences?.currency ? (
                  <FormHelperText>
                    {errors.preferences.currency.message}
                  </FormHelperText>
                ) : null}
              </FormControl>
            )}
          /> */}
          {/* <Controller
            control={control}
            name="terms"
            render={({ field }) => (
              <div>
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label={
                    <React.Fragment>
                      I have read the <Link>terms and conditions</Link>
                    </React.Fragment>
                  }
                />
                {errors.terms ? (
                  <FormHelperText error>{errors.terms.message}</FormHelperText>
                ) : null}
              </div>
            )}
          /> */}
          {errors.root ? (
            <Alert color="error">{errors.root.message}</Alert>
          ) : null}
          <Button disabled={isPending} type="submit" variant="contained">
            註冊
          </Button>
        </Stack>
      </form>
      {/* <Alert color="warning">Created users are not persisted</Alert> */}
    </Stack>
  )
}
