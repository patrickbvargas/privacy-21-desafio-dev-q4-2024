import { cn } from '@/utils';
import { buttonVariants } from '@/components/ui/button';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';

export const LoanView = ({ id }: { id: string }) => {
  return (
    <a
      className={cn(
        buttonVariants({ variant: 'outline', size: 'icon' }),
        'flex gap-2',
      )}
      href={`/loan/view/${id}`}
      target="_blank"
    >
      <ArrowTopRightOnSquareIcon className="size-4" />
    </a>
  );
};
