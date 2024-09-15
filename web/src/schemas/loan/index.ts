import { z } from 'zod';
import { bookSchema } from '../book';
import { LoanStatus } from '../../constants/enum';

const getDateFromISOString = (date: Date | null) => {
  if (!date) return null;
  return new Date(date).toISOString().slice(0, 10);
};

export const loanSchema = z.object({
  id: z.string(),
  bookId: z.string(),
  status: z.nativeEnum(LoanStatus),
  startDate: z.coerce.date().transform((val) => getDateFromISOString(val)),
  deadline: z.coerce.date().transform((val) => getDateFromISOString(val)),
  returnDate: z.coerce
    .date()
    .nullable()
    .transform((val) => getDateFromISOString(val)),
  lostDate: z.coerce
    .date()
    .nullable()
    .transform((val) => getDateFromISOString(val)),
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
  bookId: z.string().min(1, 'Selecione um livro'),
  startDate: z
    .string()
    .min(1, 'Informe a data de retirada')
    .transform((val) => new Date(val).toISOString()),
});
export type LoanCreateSchemaType = z.infer<typeof loanCreateSchema>;

export const loanUpdateSchema = loanSchema.omit({
  delayDaysCount: true,
  delayFeeAmount: true,
});
export type LoanUpdateSchemaType = z.infer<typeof loanUpdateSchema>;
