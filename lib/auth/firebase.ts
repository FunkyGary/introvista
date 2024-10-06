import {
  type User as FirebaseUser,
  type Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  updatePassword,
  getIdTokenResult,
  onAuthStateChanged,
  signOut,
  getAuth,
} from "firebase/auth";
import firebaseApp from "../config";
import type {
  ResetPasswordParams,
  SignInWithPasswordParams,
  SignUpParams,
  UpdatePasswordParams,
} from "./client";
import type { User } from "@/types/user";
import { FirebaseError } from "firebase/app";

class FirebaseAuthProvider {
  auth: Auth;
  constructor() {
    this.auth = getAuth(firebaseApp);
  }

  async signUp({
    firstName,
    lastName,
    email,
    password,
  }: SignUpParams): Promise<{ error?: string }> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: `${firstName},${lastName}`,
      });
    } catch (error) {
      console.error(error);
      return { error: this.getErrorMessage(error) };
    }

    return {};
  }

  async signInWithPassword({
    email,
    password,
  }: SignInWithPasswordParams): Promise<{ error?: string }> {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      console.log(user);
    } catch (error) {
      console.error(error);
      return { error: this.getErrorMessage(error) };
    }

    return {};
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    try {
      const currentFirebaseUser = await new Promise<FirebaseUser | null>(
        (resolve, reject) => {
          onAuthStateChanged(this.auth, (user) => {
            return resolve(user);
          });
        }
      );
      if (!currentFirebaseUser) {
        return { data: null };
      }

      return {
        data: this.mapFirebaseUserToUser(currentFirebaseUser),
      };
    } catch (error) {
      console.error(error);
      return { error: this.getErrorMessage(error) };
    }
  }

  onUserChange(callback: (user: User | null) => void): void {
    onAuthStateChanged(this.auth, (user) => {
      if (!user) {
        callback(null);
        return;
      }

      callback(this.mapFirebaseUserToUser(user));
    });
  }

  async resetPassword({
    email,
  }: ResetPasswordParams): Promise<{ error?: string }> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      console.error(error);
      return { error: this.getErrorMessage(error) };
    }

    return {};
  }

  async updatePassword({
    oldPassword,
    newPassword,
  }: UpdatePasswordParams): Promise<{ error?: string }> {
    try {
      const user = this.auth.currentUser;
      if (!user) {
        return { error: "User not found" };
      }

      await updatePassword(user, newPassword);
    } catch (error) {
      console.error(error);
      return { error: this.getErrorMessage(error) };
    }

    return {};
  }

  async signOut(): Promise<{ error?: string }> {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error(error);
      return { error: this.getErrorMessage(error) };
    }

    return {};
  }

  private mapFirebaseUserToUser(firebaseUser: FirebaseUser): User {
    const email = firebaseUser.email ?? "";
    const displayName = firebaseUser.displayName;
    const firstName = displayName?.split(",")[0] ?? "";
    const lastName = displayName?.split(",")[1] ?? "";
    const avatar = firebaseUser.photoURL || undefined;

    return {
      id: firebaseUser.uid,
      avatar,
      firstName,
      lastName,
      email,
    };
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof FirebaseError) {
      return this.formatFirebaseErrorCode(error.code);
    }
    if (error instanceof Error) {
      return error.message;
    }

    return "Something went wrong";
  }

  private formatFirebaseErrorCode(errorCode: string): string {
    switch (errorCode) {
      case "auth/invalid-credential":
        return "Email or password is invalid";
      case "auth/email-already-in-use":
        return "Email already in use";
      case "auth/invalid-email":
        return "Invalid email";
      case "auth/operation-not-allowed":
        return "Operation not allowed";
      case "auth/weak-password":
        return "Weak password";
      case "auth/user-disabled":
        return "User disabled";
      case "auth/user-not-found":
        return "User not found";
      case "auth/wrong-password":
        return "Wrong password";
      default:
        return "Something went wrong";
    }
  }
}

export default FirebaseAuthProvider;
