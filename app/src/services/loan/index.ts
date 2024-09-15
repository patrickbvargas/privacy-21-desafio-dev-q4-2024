import { z } from 'zod';
import { api } from '@/lib/axios';
import { loanOutputSchema, type LaonCreateSchemaType } from '@/schemas/loan';

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

export const createLoan = async (payload: LaonCreateSchemaType) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 5000)); // TODO: remove
    const { data } = await api.post(LOANS_ENDPOINT, payload);
    return data;
  } catch (error) {
    console.error('Error creating loan:', error);
    throw error;
  }
};

export const deleteLoan = async (id: string) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 5000)); // TODO: remove
    const { data } = await api.delete(`${LOANS_ENDPOINT}/${id}`);
    return data;
  } catch (error) {
    console.error('Error deleting loan:', error);
    throw error;
  }
};
