import { z } from 'zod';
import { UserRoles } from '../user-constants.dto';

export const CreateUserSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  role: z.enum([UserRoles.USER, UserRoles.ADMIN]),
  password: z.string().min(10).max(255),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
