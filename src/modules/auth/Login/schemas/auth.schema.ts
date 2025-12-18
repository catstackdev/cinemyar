import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email required")
    .email("Invalid email format")
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password too long"),
});

// export const registerSchema = loginSchema
//   .extend({
//     confirmPassword: z.string(),
//     username: z
//       .string()
//       .min(3, "Min 3 characters")
//       .max(20, "Max 20 characters")
//       .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores")
//       .toLowerCase()
//       .trim(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ["confirmPassword"],
//   });

export type LoginFormData = z.infer<typeof loginSchema>;
// export type RegisterFormData = z.infer<typeof registerSchema>;
