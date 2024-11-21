"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { ResetPasswordForm } from "@/components/auth/resetPasswordForm"
import { Alert, Stack, Typography } from "@mui/material"
import { getAuth, verifyPasswordResetCode } from "firebase/auth"

export function ResetPasswordView() {
  const [isValidCode, setIsValidCode] = useState<boolean | null>(null)
  const [email, setEmail] = useState<string>("")
  const searchParams = useSearchParams()

  useEffect(() => {
    const verifyCode = async () => {
      const oobCode = searchParams.get("oobCode")

      if (!oobCode) {
        setIsValidCode(false)
        return
      }

      try {
        const auth = getAuth()
        const emailFromCode = await verifyPasswordResetCode(auth, oobCode)
        setEmail(emailFromCode)
        setIsValidCode(true)
      } catch (error) {
        console.error("Invalid reset code:", error)
        setIsValidCode(false)
      }
    }

    verifyCode()
  }, [searchParams])

  if (isValidCode === null) {
    return <Typography>驗證中...</Typography>
  }

  if (isValidCode === false) {
    return (
      <Stack spacing={2}>
        <Alert severity="error">
          無效的重設密碼連結或連結已過期。請重新申請密碼重設。
        </Alert>
      </Stack>
    )
  }

  return (
    <Stack spacing={2}>
      <Typography color="text.secondary">重設 {email} 的密碼</Typography>
      <ResetPasswordForm />
    </Stack>
  )
}
