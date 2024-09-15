import * as React from 'react';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllLoans } from '@/services/loan';
import { type LoanOutputSchemaType } from '@/schemas/loan';
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
  const [loans, setLoans] = React.useState<LoanOutputSchemaType[] | null>(null);

  React.useEffect(() => {
    getAllLoans().then(setLoans);
  }, []);

  // TODO: Implement loading/suspense
  if (!loans) return null; // TODO: replace for NoData component

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
            <TableCell>
              <div className="flex gap-1">
                <Button variant="outline" size="icon">
                  <PencilIcon className="size-4" />
                </Button>
                <Button variant="outline" size="icon">
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
