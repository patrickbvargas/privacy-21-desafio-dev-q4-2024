import { z } from 'zod';
import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import { getLoanDeadline } from '../../utils/loan';
import { LOAN_DELAY_FEE_AMOUNT_PER_DAY } from '../../constants';
import {
  loanOutputSchema,
  loanCreateSchema,
  loanUpdateSchema,
} from '../../schemas/loan';

export const getAllLoans = async (req: Request, res: Response) => {
  try {
    const loans = await prisma.loan.findMany({
      include: {
        book: true,
      },
    });
    if (!loans) {
      return res.json(loans);
    }
    const data = z.array(loanOutputSchema).parse(loans);
    res.json(data);
  } catch (error) {
    console.error('Error fetching loans:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getOneLoan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const loan = await prisma.loan.findFirst({
      where: { id },
      include: {
        book: true,
      },
    });
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }
    const data = loanOutputSchema.parse(loan);
    res.json(data);
  } catch (error) {
    console.error('Error fetching loan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createLoan = async (req: Request, res: Response) => {
  try {
    const payload = loanCreateSchema.safeParse(req.body);
    console.error(payload.data);
    if (!payload.success) {
      return res
        .status(400)
        .json({ error: 'bookId and startDate are required' });
    }
    const loan = await prisma.loan.create({
      data: {
        startDate: payload.data.startDate,
        deadline: getLoanDeadline(payload.data.startDate),
        delayFeePerDay: LOAN_DELAY_FEE_AMOUNT_PER_DAY,
        book: {
          connect: {
            id: payload.data.bookId,
          },
        },
      },
    });
    res.json(loan);
  } catch (error) {
    console.error('Error creating loan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateLoan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = loanUpdateSchema.safeParse(req.body);
    if (!payload.success) {
      return res
        .status(400)
        .json({ error: 'Invalid payload', issues: payload.error });
    }
    const loan = await prisma.loan.update({
      where: { id },
      data: payload.data,
    });
    res.json(loan);
  } catch (error) {
    console.error('Error updating loan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteLoan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const loan = await prisma.loan.delete({ where: { id } });
    res.json(loan);
  } catch (error) {
    console.error('Error deleting loan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
