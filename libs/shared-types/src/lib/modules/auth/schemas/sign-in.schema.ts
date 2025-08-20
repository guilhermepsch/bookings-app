import { z } from 'zod';
import { JwtPayload } from './jwt-payload.schema';

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(10).max(255),
});

export type SignInDto = z.infer<typeof SignInSchema>;

export type SignInResponse = {
  token: string;
  payload: JwtPayload
};
