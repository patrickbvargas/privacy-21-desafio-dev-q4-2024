import { z } from 'zod';
import { bookSchema } from '../book';
import { LoanStatus } from '../../constants/enum';

export const loanSchema = z.object({
  id: z.string(),
  bookId: z.string(),
  status: z.nativeEnum(LoanStatus),
  startDate: z.coerce.date(),
  deadline: z.coerce.date(),
  returnDate: z.coerce.date().nullable(),
  lostDate: z.coerce.date().nullable(),
  delayFeePerDay: z.number(),
  delayDaysCount: z.number(),
  delayFeeAmount: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type LoanSchemaType = z.infer<typeof loanSchema>;

export const loanOutputSchema = loanSchema.omit({ bookId: true }).extend({
  book: bookSchema.pick({
    id: true,
    name: true,
    author: true,
    publicationYear: true,
  }),
});
export type LoanOutputSchemaType = z.infer<typeof loanOutputSchema>;

export const loanCreateSchema = z.object({
  bookId: z.string().min(1, 'Livro obrigatório'),
  startDate: z
    .string()
    .min(1, 'Data de retirada obrigatória')
    .transform((val) => new Date(val).toISOString()),
});
export type LaonCreateSchemaType = z.infer<typeof loanCreateSchema>;

export const loanUpdateSchema = loanSchema.omit({
  id: true,
  bookId: true,
  createdAt: true,
  updatedAt: true,
});
export type LoanUpdateSchemaType = z.infer<typeof loanUpdateSchema>;
