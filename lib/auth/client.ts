"use client"

import type { UserRole, User, UserData } from "@/types/user"
import { inject, injectable } from "inversify"
import AuthApi from "./auth-api"

function generateToken(): string {
  const arr = new Uint8Array(12)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, (v) => v.toString(16).padStart(2, "0")).join("")
}

const user = {
  id: "USR-000",
  avatar: "/assets/avatar.png",
  firstName: "Sofia",
  lastName: "Rivers",
  email: "sofia@devias.io",
} satisfies User

export interface SignUpParams {
  username: string
  email: string
  password: string
  role: UserRole
  contactInfo: {
    phone: string
    address?: string
    website?: string
  }
  supplierInfo?: {
    companyName: string
    taxID: string
    companyDescription?: string
  }
  designerInfo?: {
    portfolioUrl?: string
  }
  preferences: {
    language: string
    currency: string
  }
}

export interface SignInWithOAuthParams {
  provider: "google" | "discord"
}

export interface SignInWithPasswordParams {
  email: string
  password: string
}

export interface ResetPasswordParams {
  email: string
}

export interface UpdatePasswordParams {
  oldPassword: string
  newPassword: string
}

export interface UpdateEmailParams {
  newEmail: string
}

export interface ResetPasswordConfirmParams {
  code: string
  newPassword: string
}

@injectable()
class AuthClient {
  constructor(@inject(AuthApi) private authApi: AuthApi) {}

  async signUp(params: SignUpParams): Promise<{ error?: string }> {
    try {
      // Make API request
      const result = await this.authApi.signUp(params)

      return {
        error: result.error,
      }
    } catch (error) {
      console.error("SignUp error:", error)
      return {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      }
    }
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: "Social authentication not implemented" }
  }

  async signInWithPassword(
    params: SignInWithPasswordParams
  ): Promise<{ error?: string }> {
    const { email, password } = params

    // Make API request
    const result = await this.authApi.signInWithPassword({
      email,
      password,
    })

    return {
      error: result.error,
    }
  }

  async sendPasswordResetEmail({
    email,
  }: ResetPasswordParams): Promise<{ error?: string }> {
    try {
      const result = await this.authApi.sendPasswordResetEmail({ email })
      return {
        error: result.error,
      }
    } catch (error) {
      console.error("SendPasswordResetEmail error:", error)
      return {
        error:
          error instanceof Error
            ? error.message
            : "An error occurred while sending the password reset email",
      }
    }
  }

  async confirmPasswordReset({
    code,
    newPassword,
  }: ResetPasswordConfirmParams): Promise<{ error?: string }> {
    try {
      const result = await this.authApi.confirmPasswordReset({
        code,
        newPassword,
      })
      return {
        error: result.error,
      }
    } catch (error) {
      console.error("ConfirmPasswordReset error:", error)
      return {
        error:
          error instanceof Error
            ? error.message
            : "An error occurred while confirming the password reset",
      }
    }
  }

  async updatePassword({
    oldPassword,
    newPassword,
  }: UpdatePasswordParams): Promise<{ error?: string }> {
    const result = await this.authApi.updatePassword({
      oldPassword,
      newPassword,
    })

    return {
      error: result.error,
    }
  }

  async updateEmail({
    newEmail,
  }: UpdateEmailParams): Promise<{ error?: string }> {
    const result = await this.authApi.updateEmail({ newEmail })

    return {
      error: result.error,
    }
  }

  async updateProfile(data: Partial<User>): Promise<{ error?: string }> {
    const result = await this.authApi.updateProfile(data)

    return {
      error: result.error,
    }
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    // Make API request
    const result = await this.authApi.getUser()
    return {
      data: result.data,
      error: result.error,
    }
  }

  async getUserRole(): Promise<{ data?: string | null; error?: string }> {
    const result = await this.authApi.getUserRole()
    return {
      data: result.data,
      error: result.error,
    }
  }

  onUserChange(callback: (user: User | null) => void): void {
    this.authApi.onUserChange(callback)
  }

  async signOut(): Promise<{ error?: string }> {
    const result = await this.authApi.signOut()
    return {
      error: result.error,
    }
  }

  async updateUserData(
    userData: Partial<UserData>
  ): Promise<{ error?: string }> {
    try {
      const result = await this.authApi.updateUser(userData)
      return {
        error: result.error,
      }
    } catch (error) {
      console.error("UpdateUserData error:", error)
      return {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      }
    }
  }

  async getUserData(): Promise<{ data?: UserData | null; error?: string }> {
    try {
      const result = await this.authApi.getUserData()

      if (result.error) {
        console.warn(`Error fetching: ${result.error}`)
        return { error: result.error }
      }

      return {
        data: result.data,
      }
    } catch (error) {
      console.error(`Failed to get user data:`, error)
      return {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      }
    }
  }
}

export default AuthClient
