import * as React from 'react';
import { getAllLoans } from '@/services/loan';
import { type LoanOutputSchemaType } from '@/schemas/loan';
import { Badge } from '@/components/ui/badge';
import {
  getDateLocaleString,
  getLoanStatusAlias,
  getCurrencyLocaleString,
} from '@/utils';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const LoanList = () => {
  const [loans, setLoans] = React.useState<LoanOutputSchemaType[] | null>(null);

  React.useEffect(() => {
    getAllLoans().then(setLoans);
  }, []);

  if (!loans) return null; // TODO: replace for NoData component

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Livro</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Empréstimo em</TableHead>
          <TableHead>Devolver em</TableHead>
          <TableHead>Devolvido/Extraviado em</TableHead>
          <TableHead>Dias de atraso</TableHead>
          <TableHead>Multa</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loans.map((loan) => (
          <TableRow key={loan.id}>
            <TableCell>{loan.book.name}</TableCell>
            <TableCell>
              <Badge variant="secondary">
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
