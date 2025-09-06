import { z } from 'zod';

const createToDoSchema = z
  .object({
    title: z.string().min(1, { message: 'Title is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    dueDate: z.string().optional(),
    priority: z.enum(['low', 'medium', 'high']).optional()
  })
  .strict();

export { createToDoSchema };
