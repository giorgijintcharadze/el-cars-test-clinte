import { data } from "react-router-dom";
import z, { email } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Password must be at last 3 characters")
      .max(20, "user can not exceed 20 characters"),
    email: z.email("invalid email"),
    password: z.string().min(6, "Password must be at last 6 characters"),
    confirmpassword: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Password do not match",
    path: ["confirmpassword"],
  });

export const loginSchema = z.object({
  email: z.email("invalid email"),
  password: z.string().min(6, "Password must be at last 6 characters"),
});
