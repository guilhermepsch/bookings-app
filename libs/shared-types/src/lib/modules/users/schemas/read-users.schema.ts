import { z } from 'zod';
import { PaginationQuerySchema } from '../../../common/schemas/pagination.schema';
import { UserRoles } from '../user-constants.dto';

export const ReadUsersSchema = PaginationQuerySchema.extend({
  fullName: z.string().min(1).max(255).optional(),
  phone: z.string().min(1).max(20).optional(),
  cpf: z.string().min(1).max(14).optional(),
  email: z.string().email().optional(),
  role: z.enum([UserRoles.USER, UserRoles.ADMIN]).optional(),
});

export type ReadUsersDto = z.infer<typeof ReadUsersSchema>;
