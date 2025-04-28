import { z } from 'zod'

export const zGetIdeasTrpcInput = z.object({
  cursor: z.coerce.number().optional(),
  limit: z.number().min(1).max(100),
  search: z.string().optional(),
})
