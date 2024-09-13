import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialBooks: Prisma.BookCreateInput[] = [
  {
    name: 'Código Limpo (Clean Code)',
    author: 'Robert Cecil Martin',
    publicationYear: '2012',
  },
];

async function main() {
  console.log('Seeding books...');
  for (const book of initialBooks) {
    await prisma.book.create({ data: book });
  }
  console.log('Finished seeding books!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
