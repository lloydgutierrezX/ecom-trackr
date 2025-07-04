import { z } from 'zod';

export const clientSchema = z.object({
  name: z.string().min(3, 'Client name is required'),
  contact: z.string().optional(),
}).strict();  