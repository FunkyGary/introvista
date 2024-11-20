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

export function AccountDetailsForm(): React.JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()

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
