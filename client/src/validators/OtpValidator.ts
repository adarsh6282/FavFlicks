import {z} from "zod"

export const otpSchema = z.object({
  otp: z
    .string()
    .nonempty("OTP is required")
    .regex(/^[0-9]+$/, "OTP must contain only numbers")
    .length(6, "OTP must be 6 digits"),
});