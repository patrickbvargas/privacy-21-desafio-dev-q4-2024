import { LoanStatus } from '@/constants/enum';

const loanStatusAlias = {
  [LoanStatus.LOANED]: 'Emprestado',
  [LoanStatus.RETURNED]: 'Devolvido',
  [LoanStatus.LOST]: 'Extraviado',
};

export const getLoanStatusAlias = (status: LoanStatus) => {
  return loanStatusAlias[status];
};
