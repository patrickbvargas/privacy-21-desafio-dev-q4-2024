import { z } from 'zod';
import { api } from '../../lib/axios';
import { bookOutputSchema } from '../../schemas/book';

const BOOKS_ENDPOINT = '/books';

export const getAllBooks = async () => {
  try {
    const { data } = await api.get(BOOKS_ENDPOINT);
    return z.array(bookOutputSchema).parse(data);
  } catch (error) {
    console.error('Error fetching books:', error);
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
    }
    throw error;
  }
};

export const getOneBook = async (id: string) => {
  try {
    const { data } = await api.get(`${BOOKS_ENDPOINT}/${id}`);
    return bookOutputSchema.parse(data);
  } catch (error) {
    console.error('Error fetching book:', error);
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
    }
    throw error;
  }
};
