"use client"

import * as React from "react"
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Divider from "@mui/material/Divider"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import OutlinedInput from "@mui/material/OutlinedInput"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import Grid from "@mui/material/Unstable_Grid2"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Avatar from "@mui/material/Avatar"
import { paths } from "@/paths"
import { ResetPasswordCard } from "./resetPasswordCard"
import { useAuthClient } from "@/hooks/use-auth-client"
import { useRouter } from "next/navigation"
import { enqueueSnackbar } from "notistack"
import { AccountValues, defaultAccountValues } from "@/lib/auth/schemas"

export default function Account(): React.JSX.Element {
  const [isPending, setIsPending] = React.useState<boolean>(false)
  const authClient = useAuthClient()
  const router = useRouter()

  const methods = useForm<AccountValues>({
    defaultValues: defaultAccountValues,
  })

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setError,
    formState: { errors },
  } = methods

  React.useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await authClient.getUserData()
        if (data?.data && data?.data?.preferences) {
          const newUserData = {
            username: data.data.username,
            contactInfo: data.data.contactInfo,
            preferences: {
              language: data.data.preferences.language,
            },
            profileImageUrl: data.data.profileImageUrl,
            role: data.data.role,
          }

          reset({
            ...defaultAccountValues,
            ...newUserData,
          })
        }
      } catch (error) {
        enqueueSnackbar("Failed to load user data", { variant: "error" })
        console.error("Error loading user data:", error)
      }
    }

    loadUserData()
  }, [authClient, reset])

  const onSubmit = async (data: AccountValues) => {
    if (isPending) return

    setIsPending(true)
    try {
      const result = await authClient.updateUserData(data)

      if (!result) {
        throw new Error("Failed to update user data")
      }

      enqueueSnackbar("更新資料成功！", { variant: "success" })
      router.push(paths.dashboard.account)
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred while updating your profile"

      setError("root", {
        type: "server",
        message: errorMessage,
      })

      enqueueSnackbar(errorMessage, { variant: "error" })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Stack spacing={3}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid lg={4} md={6} xs={12}>
              <AccountInfo />
            </Grid>
            <Grid lg={8} md={6} xs={12}>
              <AccountDetailsForm isPending={isPending} />
            </Grid>
          </Grid>
        </form>
      </FormProvider>
      <Grid container spacing={3}>
        <Grid lg={4} md={6} xs={12}></Grid>
        <Grid lg={8} md={6} xs={12}>
          <ResetPasswordCard />
        </Grid>
      </Grid>
    </Stack>
  )
}

export function AccountDetailsForm({
  isPending,
}: {
  isPending: boolean
}): React.JSX.Element {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<AccountValues>()

  return (
    <Card>
      <CardHeader title="Profile" />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          {/* 基本資訊 */}
          <Grid md={6} xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Username</InputLabel>
              <Controller
                name="username"
                control={control}
                rules={{ required: "Username is required" }}
                render={({ field }) => (
                  <OutlinedInput
                    {...field}
                    label="Username"
                    error={!!errors.username}
                  />
                )}
              />
            </FormControl>
          </Grid>

          {/* 聯絡資訊 */}
          <Grid md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel>Phone</InputLabel>
              <Controller
                name="contactInfo.phone"
                control={control}
                render={({ field }) => (
                  <OutlinedInput {...field} label="Phone" />
                )}
              />
            </FormControl>
          </Grid>
          <Grid md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel>Address</InputLabel>
              <Controller
                name="contactInfo.address"
                control={control}
                render={({ field }) => (
                  <OutlinedInput {...field} label="Address" />
                )}
              />
            </FormControl>
          </Grid>
          <Grid md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel>Website</InputLabel>
              <Controller
                name="contactInfo.website"
                control={control}
                render={({ field }) => (
                  <OutlinedInput {...field} label="Website" />
                )}
              />
            </FormControl>
          </Grid>

          {/* 偏好設定 */}
          <Grid md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel>Language</InputLabel>
              <Controller
                name="preferences.language"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Language">
                    <MenuItem value="zh-TW">繁體中文</MenuItem>
                    <MenuItem value="en">English</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>

          {/* Supplier 特定欄位 */}
          {watch("role") === "supplier" && (
            <>
              <Grid md={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Company Name</InputLabel>
                  <Controller
                    name="supplierInfo.companyName"
                    control={control}
                    render={({ field }) => (
                      <OutlinedInput {...field} label="Company Name" />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel>統一編號</InputLabel>
                  <Controller
                    name="supplierInfo.taxID"
                    control={control}
                    render={({ field }) => (
                      <OutlinedInput {...field} label="Tax ID" />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid md={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Company Description</InputLabel>
                  <Controller
                    name="supplierInfo.companyDescription"
                    control={control}
                    render={({ field }) => (
                      <OutlinedInput {...field} label="Company Description" />
                    )}
                  />
                </FormControl>
              </Grid>
            </>
          )}

          {/* Designer 特定欄位 */}
          {/* {values.role === "designer" && (
              <Grid md={6} xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Portfolio URL</InputLabel>
                  <Controller
                    name="designerInfo.portfolioUrl"
                    control={control}
                    render={({ field }) => (
                      <OutlinedInput {...field} label="Portfolio URL" />
                    )}
                  />
                </FormControl>
              </Grid>
            )} */}
        </Grid>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button type="submit" variant="contained" disabled={isPending}>
          Save details
        </Button>
      </CardActions>
    </Card>
  )
}

const user = {
  avatar: "/assets/avatar.png",
  email: "mock@gmail.com",
  role: "designer",
} as const

export function AccountInfo(): React.JSX.Element {
  const { control, setValue } = useFormContext<AccountValues>()
  const authClient = useAuthClient()

  const [userData, setUserData] = React.useState<any | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const data = await authClient.getUserData()
        setUserData(data)
      } catch (error) {
        enqueueSnackbar("Failed to load user data", { variant: "error" })
        console.error("Error fetching user data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [authClient])

  const handleFileUpload = async (file: File) => {
    try {
      setValue("profileImageUrl", file)

      const previewUrl = URL.createObjectURL(file)
      setUserData((prev: any) => ({
        ...prev,
        data: {
          ...prev.data,
          profileImageUrl: previewUrl,
        },
      }))
    } catch (error) {
      enqueueSnackbar("Failed to process image", { variant: "error" })
      console.error("Error processing file:", error)
    }
  }

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <div>
            <Controller
              name="profileImageUrl"
              control={control}
              render={({ field }) => (
                <Avatar
                  src={
                    field.value instanceof File
                      ? URL.createObjectURL(field.value)
                      : field.value || userData?.data?.profileImageUrl
                  }
                  sx={{ height: "80px", width: "80px" }}
                />
              )}
            />
          </div>
          <Stack spacing={1} sx={{ textAlign: "center" }}>
            <Typography variant="h5">{userData?.data?.email}</Typography>
            <Typography color="text.secondary" variant="body2">
              {userData?.data?.role}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Controller
          name="profileImageUrl"
          control={control}
          render={({ field }) => (
            <Button fullWidth variant="text" component="label">
              Upload picture
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    handleFileUpload(file)
                  }
                }}
              />
            </Button>
          )}
        />
      </CardActions>
    </Card>
  )
}
