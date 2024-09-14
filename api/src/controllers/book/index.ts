import { z } from 'zod';
import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import { bookOutputSchema } from '../../schemas/book';

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany();
    if (!books) {
      return res.json(books);
    }
    const data = z.array(bookOutputSchema).parse(books);
    res.json(data);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getOneBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await prisma.book.findFirst({ where: { id } });
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    const data = bookOutputSchema.parse(book);
    res.json(data);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
