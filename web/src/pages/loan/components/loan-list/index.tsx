import { Badge } from '@/components/ui/badge';
import { getAllLoans } from '@/services/loan';
import { useQuery } from '@tanstack/react-query';
import { LoanEdit, LoanDelete, LoanView } from './components';
import {
  getDateLocaleString,
  getLoanStatusAlias,
  getCurrencyLocaleString,
} from '@/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const HEADING = {
  BOOK_TITLE: 'Título do Livro',
  STATUS: 'Estado',
  CHECKOUT_DATE: 'Data de Retirada',
  RETURN_DATE: 'Data de Devolução',
  RETURNED_OR_LOST: 'Devolvido ou Extraviado',
  DELAY_DAYS: 'Dias de Atraso',
  FINE_AMOUNT: 'Valor da Multa',
  ACTIONS: 'Ações',
};

const MESSAGE = {
  LOADING:
    'Estamos carregando os empréstimos. Por favor, aguarde um momento...',
  ERROR:
    'Ocorreu um erro ao carregar os empréstimos. Por favor, tente novamente.',
  EMPTY: 'Não há empréstimos disponíveis no momento.',
};

export const LoanList = () => {
  const {
    data: loans,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['loans'],
    queryFn: getAllLoans,
  });

  if (isLoading) return <p>{MESSAGE.LOADING}</p>; // TODO: replace for Loading component
  if (isError) return <p>{MESSAGE.ERROR}</p>; // TODO: replace for Error component
  if (!loans || loans.length === 0) return <p>{MESSAGE.EMPTY}</p>; // TODO: replace for Empty component

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{HEADING.BOOK_TITLE}</TableHead>
            <TableHead>{HEADING.STATUS}</TableHead>
            <TableHead>{HEADING.CHECKOUT_DATE}</TableHead>
            <TableHead>{HEADING.RETURN_DATE}</TableHead>
            <TableHead>{HEADING.RETURNED_OR_LOST}</TableHead>
            <TableHead>{HEADING.DELAY_DAYS}</TableHead>
            <TableHead>{HEADING.FINE_AMOUNT}</TableHead>
            <TableHead>{HEADING.ACTIONS}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loans.map((loan) => (
            <TableRow key={loan.id}>
              <TableCell>{loan.book.name}</TableCell>
              <TableCell>
                <Badge variant="outline">
                  {getLoanStatusAlias(loan.status)}
                </Badge>
              </TableCell>
              <TableCell>{getDateLocaleString(loan.startDate)}</TableCell>
              <TableCell>{getDateLocaleString(loan.deadline)}</TableCell>
              <TableCell>
                {getDateLocaleString(loan.returnDate || loan.lostDate)}
              </TableCell>
              <TableCell>{loan.delayDaysCount}</TableCell>
              <TableCell>
                {getCurrencyLocaleString(loan.delayFeeAmount)}
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <LoanView id={loan.id} />
                  <LoanEdit id={loan.id} />
                  <LoanDelete id={loan.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
