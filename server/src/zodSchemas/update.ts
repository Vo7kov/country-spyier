import { z } from 'zod';

export const updateSchema = z.object({
  countryCode: z.string().trim().min(1, {
    message: 'Введите код страны',
  }),
});