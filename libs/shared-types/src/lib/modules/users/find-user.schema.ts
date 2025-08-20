import { z } from 'zod';

export const FindUserSchema = z.object({
  id: z.string().uuid(),
});

export type FindUserDto = z.infer<typeof FindUserSchema>;
