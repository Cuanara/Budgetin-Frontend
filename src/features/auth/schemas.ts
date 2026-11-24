import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
  password: z.string().min(1, 'Password wajib diisi'),
  remember: z.boolean(),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi').min(2, 'Minimal 2 karakter'),
  email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
  password: z
    .string()
    .min(1, 'Password wajib diisi')
    .min(8, 'Minimal 8 karakter')
    .regex(/[A-Za-z]/, 'Password harus mengandung huruf'),
  agree: z.boolean().refine((v) => v, 'Kamu harus menyetujui syarat dan ketentuan'),
})

export type RegisterFormValues = z.infer<typeof registerSchema>

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
})

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, 'Password wajib diisi')
      .min(8, 'Minimal 8 karakter')
      .regex(/[A-Za-z]/, 'Password harus mengandung huruf')
      .regex(/\d/, 'Password harus mengandung angka'),
    confirmPassword: z.string().min(1, 'Ulangi password wajib diisi'),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password tidak sama',
  })

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>