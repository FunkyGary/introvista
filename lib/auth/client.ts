"use client";

import type { User } from "@/types/user";
import FirebaseAuthProvider from "./firebase";

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

class AuthClient {
  async signUp({
    firstName,
    lastName,
    email,
    password,
  }: SignUpParams): Promise<{ error?: string }> {
    // Make API request
    const firebaseAuth = new FirebaseAuthProvider();
    const result = await firebaseAuth.signUp({
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
    const firebaseAuth = new FirebaseAuthProvider();
    const result = await firebaseAuth.signInWithPassword({
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
    const firebaseAuth = new FirebaseAuthProvider();
    const result = await firebaseAuth.resetPassword({ email });

    return {
      error: result.error,
    };
  }

  async updatePassword({
    oldPassword,
    newPassword,
  }: UpdatePasswordParams): Promise<{ error?: string }> {
    const firebaseAuth = new FirebaseAuthProvider();
    const result = await firebaseAuth.updatePassword({
      oldPassword,
      newPassword,
    });

    return {
      error: result.error,
    };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    // Make API request
    const firebaseAuth = new FirebaseAuthProvider();
    const result = await firebaseAuth.getUser();
    return {
      data: result.data,
      error: result.error,
    };
  }

  async signOut(): Promise<{ error?: string }> {
    const firebaseAuth = new FirebaseAuthProvider();
    const result = await firebaseAuth.signOut();
    return {
      error: result.error,
    };
  }
}

export const authClient = new AuthClient();
