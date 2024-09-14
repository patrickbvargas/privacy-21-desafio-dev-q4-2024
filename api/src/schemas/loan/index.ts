import { z } from 'zod';
import { $Enums as ENUM } from '@prisma/client';
import { bookSchema } from '../book';
import { getLoanDelayDaysCount, getLoanDelayFeeAmount } from '../../utils/loan';

export const loanSchema = z.object({
  id: z.string(),
  bookId: z.string(),
  status: z.nativeEnum(ENUM.LoanStatus),
  startDate: z.coerce.date(),
  deadline: z.coerce.date(),
  returnDate: z.coerce.date().nullable(),
  lostDate: z.coerce.date().nullable(),
  delayFeePerDay: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type LoanSchemaType = z.infer<typeof loanSchema>;

export const loanOutputSchema = loanSchema
  .omit({ bookId: true })
  .extend({
    book: bookSchema.pick({
      id: true,
      name: true,
      author: true,
      publicationYear: true,
    }),
  })
  .transform((loan) => {
    const delayDaysCount = getLoanDelayDaysCount(
      loan.deadline,
      loan.returnDate || loan.lostDate,
    );
    const delayFeeAmount = getLoanDelayFeeAmount(
      delayDaysCount,
      loan.delayFeePerDay,
    );

    return {
      ...loan,
      delayDaysCount,
      delayFeeAmount,
    };
  });
export type LoanOutputSchemaType = z.infer<typeof loanOutputSchema>;

export const loanCreateSchema = z.object({
  bookId: z.string(),
  startDate: z.string(),
});
export type LaonCreateSchemaType = z.infer<typeof loanCreateSchema>;

export const loanUpdateSchema = loanSchema.omit({
  id: true,
  bookId: true,
  createdAt: true,
  updatedAt: true,
});
export type LoanUpdateSchemaType = z.infer<typeof loanUpdateSchema>;
