import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be atleast 8 characters' }),
});

export type registerSchema = z.infer<typeof registerSchema>;