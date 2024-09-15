import { LoanList, LoanCreate } from './components';
import { PageTitle } from '@/components/ui/page-title';

export const LoanPage = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <PageTitle title="Empréstimos" />
        <LoanCreate />
      </div>
      <LoanList />
    </div>
  );
};
