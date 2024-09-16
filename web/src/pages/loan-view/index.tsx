import { Info } from '@/components/ui/info';
import { getOneLoan } from '@/services/loan';
import { useQuery } from '@tanstack/react-query';
import { PageTitle } from '@/components/ui/page-title';
import { useParams } from 'react-router-dom';
import {
  getCurrencyLocaleString,
  getDateLocaleString,
  getLoanStatusAlias,
} from '@/utils';

const MESSAGE = {
  LOADING:
    'Estamos carregando os dados do empréstimo. Por favor, aguarde um momento...',
  ERROR:
    'Ocorreu um erro ao carregar o empréstimo. Por favor, tente novamente.',
};

export const LoanViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: loan,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['loan', id],
    queryFn: () => getOneLoan(id || ''),
  });

  if (isLoading) return <p>{MESSAGE.LOADING}</p>; // TODO: replace for Loading component
  if (isError || !loan) return <p>{MESSAGE.ERROR}</p>; // TODO: replace for Error component

  return (
    <>
      <PageTitle className="mb-6" title="Visualizar empréstimo" />
      <div>
        <Info label="Título do Livro" value={loan.book.name} />
        <Info label="Status" value={getLoanStatusAlias(loan.status)} />
        <Info
          label="Data de Retirada"
          value={getDateLocaleString(loan.startDate)}
        />
        <Info
          label="Prazo de Devolução"
          value={getDateLocaleString(loan.deadline)}
        />
        <Info
          label="Devolvido em"
          value={getDateLocaleString(loan.returnDate)}
        />
        <Info
          label="Extraviado em"
          value={getDateLocaleString(loan.lostDate)}
        />
        <Info label="Dias de atraso" value={loan.delayDaysCount} />
        <Info
          label="Valor da multa"
          value={getCurrencyLocaleString(loan.delayFeeAmount)}
        />
      </div>
    </>
  );
};
