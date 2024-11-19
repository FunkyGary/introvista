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
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"

const initialValues: SignUpValues = {
  role: "supplier", // 或從 props 傳入
  email: "", // 從 props 傳入
  password: "",
  username: "",
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

export function AccountDetailsForm(): React.JSX.Element {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
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
            {values.role === "supplier" && (
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
            {values.role === "designer" && (
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
            )}
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  )
}
