"use client"

import * as React from "react"
import { useForm, Controller } from "react-hook-form"
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
import { SignUpValues } from "@/lib/auth/schemas"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Avatar from "@mui/material/Avatar"
import { ResetPasswordCard } from "./resetPasswordCard"

const initialValues: SignUpValues = {
  role: "supplier", // 或從 props 傳入
  email: "", // 從 props 傳入
  password: "",
  username: "",
  profileImageUrl: "",
  contactInfo: {
    phone: "",
    address: "",
    website: "",
  },
  preferences: {
    language: "zh-TW",
  },
  terms: false,
  supplierInfo: {
    taxID: "",
    companyDescription: "",
    companyName: "",
  },
  designerInfo: {
    portfolioUrl: "",
  },
}

export default function Account(): React.JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({
    defaultValues: initialValues,
  })
  const onSubmit = (data: SignUpValues) => {
    console.log(data)
    // 處理表單提交
  }

  return (
    <Stack spacing={3}>
      {/* <div>
        <Typography variant="h4">Account</Typography>
      </div> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid lg={4} md={6} xs={12}>
            <AccountInfo />
          </Grid>
          <Grid lg={8} md={6} xs={12}>
            <AccountDetailsForm />
          </Grid>
        </Grid>
      </form>
      <ResetPasswordCard />
    </Stack>
  )
}

export function AccountDetailsForm(): React.JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({
    defaultValues: initialValues,
  })

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
          {/* {values.role === "supplier" && (
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
            )} */}

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
        <Button type="submit" variant="contained">
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
  const { control } = useForm<SignUpValues>({
    defaultValues: initialValues,
  })

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <div>
            <Controller
              name="profileImageUrl"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Avatar
                  src={value || user.avatar}
                  sx={{ height: "80px", width: "80px" }}
                />
              )}
            />
          </div>
          <Stack spacing={1} sx={{ textAlign: "center" }}>
            <Typography variant="h5">{user.email}</Typography>
            <Typography color="text.secondary" variant="body2">
              {user.role}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Controller
          name="profileImageUrl"
          control={control}
          render={({ field: { onChange } }) => (
            <Button fullWidth variant="text" component="label">
              Upload picture
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    // Create a URL for preview
                    const imageUrl = URL.createObjectURL(file)
                    onChange(imageUrl)
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
