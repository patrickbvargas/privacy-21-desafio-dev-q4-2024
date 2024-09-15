import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { deleteLoan } from '@/services/loan';
import { getAllLoans } from '@/services/loan';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
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
import { useQuery } from '@tanstack/react-query';

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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Livro</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Empréstimo</TableHead>
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
              <Badge variant="outline">{getLoanStatusAlias(loan.status)}</Badge>
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
                <Button variant="outline" size="icon">
                  <PencilIcon className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => deleteLoan(loan.id)}
                >
                  <TrashIcon className="size-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
