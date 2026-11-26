import { z } from 'zod'

export const addTargetSchema = z.object({
  name: z.string().trim().min(1, 'Nama target wajib diisi').max(50, 'Maksimal 50 karakter'),
  target: z.number().int().nonnegative().max(1_000_000_000_000, 'Nominal terlalu besar'),
})