"use client";

import type { User } from "@/types/user";
import { UserRole } from "@/types/user-role";
import { inject, injectable } from "inversify";
import AuthApi from "./auth-api";

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, "0")).join("");
}

const user = {
  id: "USR-000",
  avatar: "/assets/avatar.png",
  firstName: "Sofia",
  lastName: "Rivers",
  email: "sofia@devias.io",
} satisfies User;

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: "google" | "discord";
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

export interface UpdatePasswordParams {
  oldPassword: string;
  newPassword: string;
}

@injectable()
class AuthClient {
  constructor(@inject(AuthApi) private authApi: AuthApi) {}

  async signUp({
    firstName,
    lastName,
    email,
    password,
  }: SignUpParams): Promise<{ error?: string }> {
    // Make API request
    const result = await this.authApi.signUp({
      firstName,
      lastName,
      email,
      password,
    });

    return {
      error: result.error,
    };
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: "Social authentication not implemented" };
  }

  async signInWithPassword(
    params: SignInWithPasswordParams
  ): Promise<{ error?: string }> {
    const { email, password } = params;

    // Make API request
    const result = await this.authApi.signInWithPassword({
      email,
      password,
    });

    return {
      error: result.error,
    };
  }

  async resetPassword({
    email,
  }: ResetPasswordParams): Promise<{ error?: string }> {
    const result = await this.authApi.resetPassword({ email });

    return {
      error: result.error,
    };
  }

  async updatePassword({
    oldPassword,
    newPassword,
  }: UpdatePasswordParams): Promise<{ error?: string }> {
    const result = await this.authApi.updatePassword({
      oldPassword,
      newPassword,
    });

    return {
      error: result.error,
    };
  }

  async updateProfile(data: Partial<User>): Promise<{ error?: string }> {
    const result = await this.authApi.updateProfile(data);

    return {
      error: result.error,
    };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    // Make API request
    const result = await this.authApi.getUser();
    return {
      data: result.data,
      error: result.error,
    };
  }

  async getUserRole(): Promise<{ data?: UserRole | null; error?: string }> {
    const result = await this.authApi.getUserRole();
    return {
      data: result.data,
      error: result.error,
    };
  }

  onUserChange(callback: (user: User | null) => void): void {
    this.authApi.onUserChange(callback);
  }

  async signOut(): Promise<{ error?: string }> {
    const result = await this.authApi.signOut();
    return {
      error: result.error,
    };
  }
}

export default AuthClient;
