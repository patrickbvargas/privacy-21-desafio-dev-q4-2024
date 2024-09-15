import { z } from 'zod';
import { api } from '@/lib/axios';
import {
  loanOutputSchema,
  type LoanOutputSchemaType,
  type LoanCreateSchemaType,
} from '@/schemas/loan';

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

export const updateLoan = async (payload: LoanOutputSchemaType) => {
  try {
    const { data } = await api.put(`${LOANS_ENDPOINT}/${payload.id}`, payload);
    return data;
  } catch (error) {
    console.error('Error updating loan:', error);
    throw error;
  }
};

export const createLoan = async (payload: LoanCreateSchemaType) => {
  try {
    const { data } = await api.post(LOANS_ENDPOINT, payload);
    return data;
  } catch (error) {
    console.error('Error creating loan:', error);
    throw error;
  }
};

export const deleteLoan = async (id: string) => {
  try {
    const { data } = await api.delete(`${LOANS_ENDPOINT}/${id}`);
    return data;
  } catch (error) {
    console.error('Error deleting loan:', error);
    throw error;
  }
};
