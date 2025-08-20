import { z } from 'zod';
import { UserRoles } from '../../users/user-constants.dto';

export const JwtPayloadSchema = z.object({
  sub: z.string().uuid(),
  email: z.string().email(),
  role: z.enum([UserRoles.USER, UserRoles.ADMIN]),
  exp: z.number(),
  iat: z.number(),
}).strict();

export type JwtPayload = z.infer<typeof JwtPayloadSchema>;
