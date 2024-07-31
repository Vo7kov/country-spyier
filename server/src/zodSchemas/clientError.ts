import { z } from 'zod';

export const clientError = z.string().trim().min(1, {
  message: 'Во время выполнения данных произошла ошибка. Попробуйте снова',
});
