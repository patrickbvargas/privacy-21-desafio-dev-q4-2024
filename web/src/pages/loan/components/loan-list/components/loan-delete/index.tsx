import * as React from 'react';
import { cn } from '@/utils';
import { toast } from 'sonner';
import { Button, buttonVariants } from '@/components/ui/button';
import { TrashIcon } from '@heroicons/react/24/solid';
import { queryClient } from '@/providers/tanstack-query';
import { deleteLoan } from '@/services/loan';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const MESSAGE = {
  CONFIRM_DELETE:
    'Você tem certeza de que deseja remover este empréstimo? Esta ação é permanente e não pode ser desfeita.',
};

interface LoanDeleteProps extends React.ComponentProps<typeof Dialog> {
  id: string;
}
export const LoanDelete = ({ id, ...props }: LoanDeleteProps) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLoanDelete = async () => {
    try {
      setIsLoading(true);
      await deleteLoan(id);
      queryClient.invalidateQueries({ queryKey: ['loans'] });
      toast.success('Empréstimo removido com sucesso!');
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao remover empréstimo');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog {...props} open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <span
          className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}
        >
          <TrashIcon className="size-4" />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remover empréstimo</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 flex flex-col">
          <p className="text-sm">{MESSAGE.CONFIRM_DELETE}</p>
          <Button
            className="place-self-end"
            disabled={isLoading}
            variant="destructive"
            onClick={handleLoanDelete}
          >
            {isLoading ? 'Removendo...' : 'Remover'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
