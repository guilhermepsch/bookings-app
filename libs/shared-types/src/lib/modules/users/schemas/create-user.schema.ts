import { z } from 'zod';
import { UserRoles } from '../user-constants.dto';

export const CreateUserSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  fullName: z.string().min(1).max(255),
  phone: z
    .string()
    .min(1, { message: 'Phone is required' })
    .max(20, { message: 'Phone must be at most 20 characters' })
    .regex(/^\+?\d{1,3}?[-.\s]?(\(?\d{2,3}\)?)[-.\s]?\d{4,5}[-.\s]?\d{4}$/, {
      message: 'Invalid phone format',
    }),
  cpf: z.string()
    .min(1, { message: 'CPF is required' })
    .max(11, { message: 'CPF must be at most 11 characters' })
    .regex(/^\d+$/, { message: 'CPF must contain only digits' }),
  role: z.enum([UserRoles.USER, UserRoles.ADMIN]),
  password: z.string().min(10).max(255),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
