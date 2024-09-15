import { Badge } from '@/components/ui/badge';
import { getAllLoans } from '@/services/loan';
import { useQuery } from '@tanstack/react-query';
import { LoanEdit, LoanDelete } from './components';
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

export const LoanList = () => {
  const {
    data: loans,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['loans'],
    queryFn: getAllLoans,
  });

  if (isLoading) return <p>Carregando...</p>; // TODO: replace for Loading component
  if (isError) return <p>Um erro ocorreu, tente novamente.</p>; // TODO: replace for Error component
  if (!loans || loans.length === 0) return <p>Nenhum empréstimo encontrado.</p>; // TODO: replace for Empty component

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Livro</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Retirada</TableHead>
            <TableHead>Devolver</TableHead>
            <TableHead>Devolvido/Extraviado</TableHead>
            <TableHead>Dias de atraso</TableHead>
            <TableHead>Multa</TableHead>
            <TableHead>Ações</TableHead>
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
