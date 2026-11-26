import { z } from 'zod'

export const filterSchema = z
  .object({ from: z.string(), to: z.string(), category: z.string() })
  .refine((v) => !v.from || !v.to || v.from <= v.to, {
    message: 'Tanggal awal tidak boleh melewati tanggal akhir',
  })

export type TransactionFilter = z.infer<typeof filterSchema>