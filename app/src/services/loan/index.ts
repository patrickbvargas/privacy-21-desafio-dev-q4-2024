import { z } from 'zod';
import { api } from '../../lib/axios';
import { loanOutputSchema } from '../../schemas/loan';

const LOANS_ENDPOINT = '/loans';

export const getAllLoans = async () => {
  try {
    const { data } = await api.get(LOANS_ENDPOINT);
    return z.array(loanOutputSchema).parse(data);
  } catch (error) {
    console.error('Error fetching loans:', error);
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
    }
    throw error;
  }
};

export const getOneLoan = async (id: string) => {
  try {
    const { data } = await api.get(`${LOANS_ENDPOINT}/${id}`);
    return loanOutputSchema.parse(data);
  } catch (error) {
    console.error('Error fetching loan:', error);
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
    }
    throw error;
  }
};
