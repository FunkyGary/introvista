import { z as zod } from "zod"

export const signUpSchema = zod.object({
  username: zod.string().min(1, { message: "Username is required" }),
  email: zod.string().min(1, { message: "Email is required" }).email(),
  password: zod
    .string()
    .min(6, { message: "Password should be at least 6 characters" }),
  role: zod.enum(["supplier", "designer"], {
    required_error: "Please select a role",
  }),
  profileImageUrl: zod.string().optional(),
  contactInfo: zod.object({
    phone: zod.string().min(1, { message: "Phone number is required" }),
    address: zod.string().optional(),
    website: zod.string().optional(),
  }),
  supplierInfo: zod
    .object({
      companyName: zod.string().optional(),
      taxID: zod.string().optional(),
      companyDescription: zod.string().optional(),
    })
    .optional(),
  designerInfo: zod
    .object({
      portfolioUrl: zod.string().optional(),
    })
    .optional(),
  preferences: zod.object({
    language: zod.string().default("zh-TW"),
    currency: zod.string().default("TWD").optional(),
  }),
  terms: zod
    .boolean()
    .refine((value) => value, "You must accept the terms and conditions"),
})

export type SignUpValues = zod.infer<typeof signUpSchema>

export const defaultSignUpValues: SignUpValues = {
  username: "",
  email: "",
  password: "",
  role: "designer",
  profileImageUrl: "",
  contactInfo: {
    phone: "",
    address: "",
    website: "",
  },
  supplierInfo: {
    companyName: "",
    taxID: "",
    companyDescription: "",
  },
  designerInfo: {
    portfolioUrl: "",
  },
  preferences: {
    language: "zh-TW",
    currency: "TWD",
  },
  terms: false,
}