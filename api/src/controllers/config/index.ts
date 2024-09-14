import { Request, Response } from 'express';
import {
  LOAN_DAYS_ALLOWED_WITHOUT_FEE,
  LOAN_DELAY_FEE_AMOUNT_PER_DAY,
  LOAN_DELAY_DAYS_ALLOWED,
} from '../../constants';

export const getConfig = (req: Request, res: Response) => {
  try {
    res.json({
      LOAN_DAYS_ALLOWED_WITHOUT_FEE,
      LOAN_DELAY_FEE_AMOUNT_PER_DAY,
      LOAN_DELAY_DAYS_ALLOWED,
    });
  } catch (error) {
    console.error('Error fetching config :', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
