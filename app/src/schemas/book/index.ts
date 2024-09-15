import { z } from 'zod';

export const bookSchema = z.object({
  id: z.string(),
  name: z.string(),
  author: z.string(),
  publicationYear: z.coerce.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type BookSchemaType = z.infer<typeof bookSchema>;

export const bookOutputSchema = bookSchema;
export type BookOutputSchemaType = z.infer<typeof bookOutputSchema>;
