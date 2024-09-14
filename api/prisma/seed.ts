import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialBooks: Prisma.BookCreateInput[] = [
  {
    id: 'cm11lf99y000008mk49rh0k4i',
    name: 'Código Limpo (Clean Code)',
    author: 'Robert Cecil Martin',
    publicationYear: '2012',
  },
  {
    id: 'cm11lfeuj000108mk0gmoenvi',
    name: 'Design Patterns: Elements of Reusable Object-Oriented Software',
    author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
    publicationYear: '1994',
  },
  {
    id: 'cm11lfjav000208mkhzesghcw',
    name: 'The Pragmatic Programmer: Your Journey to Mastery',
    author: 'Andrew Hunt, David Thomas',
    publicationYear: '1999',
  },
  {
    id: 'cm11lfok4000308mkbovpf4f9',
    name: 'Refactoring: Improving the Design of Existing Code',
    author: 'Martin Fowler',
    publicationYear: '1999',
  },
  {
    id: 'cm11lfshp000408mkfar15xjq',
    name: 'Introduction to the Theory of Computation',
    author: 'Michael Sipser',
    publicationYear: '1996',
  },
];

const initialLoans: Prisma.LoanCreateInput[] = [
  {
    status: 'LOANED',
    startDate: new Date('2024-09-10'),
    deadline: new Date('2024-09-20'),
    delayFeePerDay: 0.5,
    book: {
      connect: {
        id: initialBooks[0].id,
      },
    },
  },
  {
    status: 'RETURNED',
    startDate: new Date('2024-09-10'),
    deadline: new Date('2024-09-20'),
    returnDate: new Date('2024-09-15'),
    delayFeePerDay: 0.5,
    book: {
      connect: {
        id: initialBooks[1].id,
      },
    },
  },
  {
    status: 'RETURNED',
    startDate: new Date('2024-09-10'),
    deadline: new Date('2024-09-20'),
    returnDate: new Date('2024-09-22'),
    delayFeePerDay: 0.5,
    book: {
      connect: {
        id: initialBooks[3].id,
      },
    },
  },
  {
    status: 'LOST',
    startDate: new Date('2024-09-10'),
    deadline: new Date('2024-09-20'),
    lostDate: new Date('2024-09-20'),
    delayFeePerDay: 0.5,
    book: {
      connect: {
        id: initialBooks[4].id,
      },
    },
  },
];

async function main() {
  console.log('Seeding data...');
  for (const book of initialBooks) {
    await prisma.book.create({ data: book });
  }
  for (const loan of initialLoans) {
    await prisma.loan.create({ data: loan });
  }
  console.log('Finished seeding data!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
