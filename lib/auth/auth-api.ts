import "reflect-metadata"
import bcrypt from "bcryptjs"
import {
  type User as FirebaseUser,
  type Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  updatePassword,
  updateEmail,
  onAuthStateChanged,
  signOut,
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
  confirmPasswordReset as firebaseConfirmPasswordReset,
} from "firebase/auth"
import firebaseApp from "../firebase/firebase-config"
import {
  type Firestore,
  getFirestore,
  collection,
  doc,
  updateDoc,
  addDoc,
  serverTimestamp,
  getDocs,
  deleteDoc,
  Timestamp,
  query,
  where,
  setDoc,
  getDoc,
} from "firebase/firestore"
import {
  FirebaseStorage,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage"

import type {
  ResetPasswordConfirmParams,
  ResetPasswordParams,
  SignInWithPasswordParams,
  SignUpParams,
  UpdatePasswordParams,
  UpdateEmailParams,
} from "./client"
import type { User, UserData } from "@/types/user"
import { FirebaseError } from "firebase/app"
import { injectable } from "inversify"

@injectable()
class AuthApi {
  userCollectionName = "users"
  auth: Auth
  user: User | null
  db: Firestore
  storage: FirebaseStorage

  constructor() {
    this.auth = getAuth(firebaseApp)
    this.user = null
    this.onUserChange((user) => {
      this.user = user
    })

    this.db = getFirestore(firebaseApp)
    this.storage = getStorage(firebaseApp)
  }

  async signUp(params: SignUpParams): Promise<{ error?: string }> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        params.email,
        params.password
      )
      await updateProfile(userCredential.user, {
        displayName: params.username,
      })

      const roleSpecificInfo = (() => {
        switch (params.role) {
          case "supplier":
            return { supplierInfo: params.supplierInfo }
          case "designer":
            return { designerInfo: params.designerInfo }
          case "superAdmin":
            return {
              supplierInfo: params.supplierInfo,
              designerInfo: params.designerInfo,
            }
          default:
            throw new Error("Invalid role specified")
        }
      })()

      const userData = {
        userID: userCredential.user.uid,
        email: params.email,
        username: params.username,
        passwordHash: await bcrypt.hash(params.password, 10),
        role: params.role,
        contactInfo: params.contactInfo,
        preferences: {
          notificationSettings: {
            emailNotifications: false,
            smsNotifications: false,
          },
          ...params.preferences,
        },
        tags: [],
        profileImageUrl: "",
        createdDate: serverTimestamp(),
        lastUpdated: serverTimestamp(),
        lastLoginDate: serverTimestamp(),
        ...roleSpecificInfo,
      }

      await setDoc(
        doc(this.db, this.userCollectionName, userCredential.user.uid),
        userData
      )

      this.auth.languageCode = userData.preferences?.language || "zh-TW"

      sendEmailVerification(userCredential.user)
    } catch (error) {
      console.error(error)
      return { error: this.getErrorMessage(error) }
    }

    return {}
  }

  async signInWithPassword({
    email,
    password,
  }: SignInWithPasswordParams): Promise<{ error?: string }> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password)

      const userQuery = query(
        collection(this.db, this.userCollectionName),
        where("email", "==", email)
      )
      const userQuerySnapshot = await getDocs(userQuery)

      userQuerySnapshot.docs.forEach(async (doc) => {
        await updateDoc(doc.ref, {
          lastLoginDate: serverTimestamp(),
          lastUpdated: serverTimestamp(),
        })
      })
    } catch (error) {
      console.error(error)
      return { error: this.getErrorMessage(error) }
    }

    return {}
  }

  async updateProfile(data: Partial<User>): Promise<{ error?: string }> {
    if (!this.auth.currentUser) {
      return { error: "Not logged in" }
    }

    try {
      await updateProfile(this.auth.currentUser, {
        displayName: data.name,
        photoURL: data.avatar,
      })
      return {}
    } catch (error) {
      console.error(error)
      return { error: this.getErrorMessage(error) }
    }
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    try {
      const currentFirebaseUser = await new Promise<FirebaseUser | null>(
        (resolve, reject) => {
          onAuthStateChanged(this.auth, (user) => {
            return resolve(user)
          })
        }
      )
      if (!currentFirebaseUser) {
        return { data: null }
      }

      return {
        data: this.mapFirebaseUserToUser(currentFirebaseUser),
      }
    } catch (error) {
      console.error(error)
      return { error: this.getErrorMessage(error) }
    }
  }

  async getUserRole(): Promise<{ data?: string | null; error?: string }> {
    try {
      const currentFirebaseUser = await new Promise<FirebaseUser | null>(
        (resolve) => onAuthStateChanged(this.auth, resolve)
      )

      if (!currentFirebaseUser) {
        return { data: null }
      }

      const userDoc = await getDoc(
        doc(this.db, this.userCollectionName, currentFirebaseUser.uid)
      )

      if (!userDoc.exists()) {
        return { error: "User not found" }
      }

      const userRole = userDoc.data()?.role
      return { data: userRole }
    } catch (error) {
      console.error(error)
      return { error: this.getErrorMessage(error) }
    }
  }

  onUserChange(callback: (user: User | null) => void): void {
    onAuthStateChanged(this.auth, (user) => {
      if (!user) {
        callback(null)
        return
      }

      callback(this.mapFirebaseUserToUser(user))
    })
  }

  async sendPasswordResetEmail({
    email,
  }: ResetPasswordParams): Promise<{ error?: string }> {
    try {
      this.auth.languageCode = "zh-TW"

      try {
        const userQuery = query(
          collection(this.db, this.userCollectionName),
          where("email", "==", email)
        )
        const querySnapshot = await getDocs(userQuery)

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data()
          this.auth.languageCode = userData.preferences?.language || "zh-TW"
        }
      } catch (dbError) {
        console.warn("Could not fetch user language preference:", dbError)
      }

      await firebaseSendPasswordResetEmail(this.auth, email)
      return {}
    } catch (error) {
      console.error("ResetPassword error:", error)
      return { error: this.getErrorMessage(error) }
    }
  }

  async updatePassword({
    oldPassword,
    newPassword,
  }: UpdatePasswordParams): Promise<{ error?: string }> {
    try {
      if (!oldPassword || !newPassword) {
        return { error: "Both old and new passwords are required" }
      }

      const user = this.auth.currentUser
      if (!user || !user.email) {
        return { error: "User not found" }
      }

      try {
        const credential = EmailAuthProvider.credential(user.email, oldPassword)
        await reauthenticateWithCredential(user, credential)
      } catch (reAuthError) {
        console.error("Reauthentication failed:", reAuthError)
        if (reAuthError instanceof FirebaseError) {
          switch (reAuthError.code) {
            case "auth/wrong-password":
              return { error: "Current password is incorrect" }
            case "auth/missing-password":
              return { error: "Please enter your current password" }
            case "auth/too-many-requests":
              return { error: "Too many attempts. Please try again later" }
            default:
              return { error: "Authentication failed. Please try again" }
          }
        }
        return { error: "Authentication failed. Please try again" }
      }

      await updatePassword(user, newPassword)

      await updateDoc(doc(this.db, this.userCollectionName, user.uid), {
        passwordHash: await bcrypt.hash(newPassword, 10),
        lastUpdated: serverTimestamp(),
      })

      return {}
    } catch (error) {
      console.error(error)
      return { error: this.getErrorMessage(error) }
    }
  }

  async updateEmail({
    newEmail,
  }: UpdateEmailParams): Promise<{ error?: string }> {
    try {
      const user = this.auth.currentUser
      if (!user) {
        return { error: "User not found" }
      }

      const userDoc = await getDoc(
        doc(this.db, this.userCollectionName, user.uid)
      )

      if (userDoc.exists()) {
        const userData = userDoc.data()
        this.auth.languageCode = userData.preferences?.language || "zh-TW"
      }

      await updateEmail(user, newEmail)
      await sendEmailVerification(user)

      await updateDoc(doc(this.db, this.userCollectionName, user.uid), {
        email: newEmail,
        lastUpdated: serverTimestamp(),
      })

      return {}
    } catch (error) {
      console.error("UpdateEmail error:", error)
      return { error: this.getErrorMessage(error) }
    }
  }

  async signOut(): Promise<{ error?: string }> {
    try {
      await signOut(this.auth)
    } catch (error) {
      console.error(error)
      return { error: this.getErrorMessage(error) }
    }

    return {}
  }

  private mapFirebaseUserToUser(firebaseUser: FirebaseUser): User {
    const email = firebaseUser.email ?? ""
    const name = firebaseUser.displayName ?? ""
    const avatar = firebaseUser.photoURL || undefined

    return {
      id: firebaseUser.uid,
      name,
      avatar,
      email,
    }
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof FirebaseError) {
      return this.formatFirebaseErrorCode(error.code)
    }
    if (error instanceof Error) {
      return error.message
    }

    return "Something went wrong"
  }

  private formatFirebaseErrorCode(errorCode: string): string {
    switch (errorCode) {
      case "auth/invalid-credential":
        return "Email or password is invalid"
      case "auth/email-already-in-use":
        return "Email already in use"
      case "auth/invalid-email":
        return "Invalid email"
      case "auth/operation-not-allowed":
        return "Operation not allowed"
      case "auth/weak-password":
        return "Weak password"
      case "auth/user-disabled":
        return "User disabled"
      case "auth/user-not-found":
        return "User not found"
      case "auth/wrong-password":
        return "Wrong password"
      case "auth/invalid-action-code":
        return "Password reset link has expired or been used"
      case "auth/expired-action-code":
        return "Password reset link has expired"
      case "auth/user-disabled":
        return "This account has been disabled"
      case "auth/user-not-found":
        return "No account found for this email"
      case "auth/weak-password":
        return "Password strength is insufficient"
      default:
        return "An error occurred, please try again later"
    }
  }

  async createUser(
    userData: UserData
  ): Promise<{ error?: string; id?: string }> {
    try {
      const docRef = await addDoc(
        collection(this.db, this.userCollectionName),
        {
          ...userData,
          createdDate: serverTimestamp(),
          updatedDate: serverTimestamp(),
        }
      )
      return { id: docRef.id }
    } catch (error) {
      console.error(error)
      return { error: this.getErrorMessage(error) }
    }
  }

  async getUserData(): Promise<{ data?: UserData; error?: string }> {
    try {
      const user = this.auth.currentUser
      if (!user) {
        return { error: "User not found" }
      }

      const queryUserRef = query(
        collection(this.db, this.userCollectionName),
        where("userID", "==", user.uid)
      )
      const querySnapshot = await getDocs(queryUserRef)

      if (querySnapshot.empty) {
        return { error: "User not found" }
      }

      const userData = querySnapshot.docs[0].data() as UserData
      return { data: userData }
    } catch (error) {
      console.error(error)
      return { error: this.getErrorMessage(error) }
    }
  }

  async getAllUsers(): Promise<{ data?: UserData[]; error?: string }> {
    try {
      const querySnapshot = await getDocs(
        collection(this.db, this.userCollectionName)
      )
      const users = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      })) as UserData[]

      return { data: users }
    } catch (error) {
      console.error(error)
      return { error: this.getErrorMessage(error) }
    }
  }

  async updateUser(userData: Partial<UserData>): Promise<{ error?: string }> {
    const user = this.auth.currentUser

    if (!user) {
      return { error: "User not found" }
    }

    try {
      const queryUserRef = query(
        collection(this.db, this.userCollectionName),
        where("userID", "==", user.uid)
      )
      const querySnapshot = await getDocs(queryUserRef)

      if (querySnapshot.empty) {
        return { error: "User not found" }
      }

      const currentUserData = querySnapshot.docs[0].data()
      let avatarUrl = ""

      // Handle profile image upload if it's a File
      if (userData.profileImageUrl instanceof File) {
        const storageRef = ref(this.storage, `profile-images/${user.uid}`)
        await uploadBytes(storageRef, userData.profileImageUrl)
        avatarUrl = await getDownloadURL(storageRef)
      }

      // Prepare the update object with type safety
      const updateData: Partial<UserData> = {
        ...userData,
        profileImageUrl: avatarUrl || currentUserData.profileImageUrl,
        lastUpdated: serverTimestamp(),
      }

      // Update nested objects correctly
      if (userData.preferences) {
        updateData.preferences = {
          ...currentUserData.preferences,
          ...userData.preferences,
          notificationSettings: {
            ...currentUserData.preferences?.notificationSettings,
            ...userData.preferences?.notificationSettings,
          },
        }
      }

      // Handle role-specific updates
      if (userData.role) {
        switch (userData.role) {
          case "supplier":
            if (userData.supplierInfo) {
              updateData.supplierInfo = {
                ...currentUserData.supplierInfo,
                ...userData.supplierInfo,
              }
            }
            break
          case "designer":
            if (userData.designerInfo) {
              updateData.designerInfo = {
                ...currentUserData.designerInfo,
                ...userData.designerInfo,
              }
            }
            break
          case "superAdmin":
            if (userData.supplierInfo) {
              updateData.supplierInfo = {
                ...currentUserData.supplierInfo,
                ...userData.supplierInfo,
              }
            }
            if (userData.designerInfo) {
              updateData.designerInfo = {
                ...currentUserData.designerInfo,
                ...userData.designerInfo,
              }
            }
            break
          default:
            throw new Error("Invalid role specified")
        }
      }

      // Handle contact info updates
      if (userData.contactInfo) {
        updateData.contactInfo = {
          ...currentUserData.contactInfo,
          ...userData.contactInfo,
        }
      }

      // Handle tags updates (if provided)
      if (userData.tags) {
        updateData.tags = Array.from(
          new Set([...currentUserData.tags, ...userData.tags])
        )
      }

      // Update Firestore
      await updateDoc(querySnapshot.docs[0].ref, updateData)

      // Update Firebase Auth profile if necessary
      if (userData.username || avatarUrl) {
        await updateProfile(user, {
          displayName: userData.username || user.displayName,
          photoURL: typeof avatarUrl === "string" ? avatarUrl : user.photoURL,
        })
      }

      return {}
    } catch (error) {
      console.error("UpdateUser error:", error)
      return { error: this.getErrorMessage(error) }
    }
  }

  async deleteUser(userId: string): Promise<{ error?: string }> {
    try {
      const queryUserRef = query(
        collection(this.db, this.userCollectionName),
        where("userID", "==", userId)
      )
      const querySnapshot = await getDocs(queryUserRef)

      if (querySnapshot.empty) {
        return { error: "User not found" }
      }

      await deleteDoc(querySnapshot.docs[0].ref)
      return {}
    } catch (error) {
      console.error(error)
      return { error: this.getErrorMessage(error) }
    }
  }

  async confirmPasswordReset({
    code,
    newPassword,
  }: ResetPasswordConfirmParams): Promise<{ error?: string }> {
    try {
      await firebaseConfirmPasswordReset(this.auth, code, newPassword)

      const user = this.auth.currentUser
      if (user) {
        await updateDoc(doc(this.db, this.userCollectionName, user.uid), {
          passwordHash: await bcrypt.hash(newPassword, 10),
          lastUpdated: serverTimestamp(),
        })
      }

      return {}
    } catch (error) {
      console.error("ConfirmPasswordReset error:", error)
      return { error: this.getErrorMessage(error) }
    }
  }
}

export default AuthApi
