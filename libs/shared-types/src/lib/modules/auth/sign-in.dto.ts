import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(10).max(255),
});

export type SignInDto = z.infer<typeof SignInSchema>;
