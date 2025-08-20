import { z } from 'zod';
import { UserRoles } from '../user-constants.dto';

export const ResponseUserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  role: z.enum([UserRoles.USER, UserRoles.ADMIN]),
  customerId: z.string().uuid().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ResponseUserDto = z.infer<typeof ResponseUserSchema>;
