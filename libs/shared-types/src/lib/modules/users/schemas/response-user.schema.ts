import { z } from 'zod';
import { UserRoles } from '../user-constants.dto';

export const ResponseUserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  fullName: z.string().min(1).max(255),
  phone: z.string().min(1).max(20),
  cpf: z.string().min(1).max(14),
  role: z.enum([UserRoles.USER, UserRoles.ADMIN]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ResponseUserDto = z.infer<typeof ResponseUserSchema>;
