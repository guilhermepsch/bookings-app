import { z } from 'zod';
import { JwtPayloadSchema } from './jwt-payload.schema';

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(10).max(255),
});

export type SignInDto = z.infer<typeof SignInSchema>;

export const SignInResponseSchema = z.object({
  token: z.string(),
  payload: JwtPayloadSchema
});

export type SignInResponse = z.infer<typeof SignInResponseSchema>;
