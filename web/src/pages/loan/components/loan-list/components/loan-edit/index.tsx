import { cn } from '@/utils';
import { PencilIcon } from '@heroicons/react/20/solid';
import { buttonVariants } from '@/components/ui/button';

export const LoanEdit = ({ id }: { id: string }) => {
  return (
    <a
      className={cn(
        buttonVariants({ variant: 'outline', size: 'icon' }),
        'flex gap-2',
      )}
      href={`/loan/edit/${id}`}
    >
      <PencilIcon className="size-4" />
    </a>
  );
};
