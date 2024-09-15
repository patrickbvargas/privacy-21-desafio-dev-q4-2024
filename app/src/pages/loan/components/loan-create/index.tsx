import * as React from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button, buttonVariants } from '@/components/ui/button';
import { createLoan } from '@/services/loan';
import { PlusIcon } from '@heroicons/react/20/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import { queryClient } from '@/providers/tanstack-query';
import { loanCreateSchema, type LoanCreateSchemaType } from '@/schemas/loan';
import { getAllBooks } from '@/services/book';
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export const LoanCreate = () => {
  // TODO: implement tanstack Mutations
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { data: books, isLoading: isBooksLoading } = useQuery({
    queryKey: ['books'],
    queryFn: getAllBooks,
  });
  const form = useForm<LoanCreateSchemaType>({
    resolver: zodResolver(loanCreateSchema),
    defaultValues: {
      bookId: '',
      startDate: '',
    },
  });

  const handleFormSubmit = async (payload: LoanCreateSchemaType) => {
    try {
      setIsLoading(true);
      await createLoan(payload);
      queryClient.invalidateQueries({ queryKey: ['loans'] });
      toast.success('Empréstimo criado com sucesso!');
      form.reset();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao criar empréstimo');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <span
          className={cn(buttonVariants({ variant: 'outline' }), 'flex gap-2')}
        >
          <PlusIcon className="size-4" />
          Criar
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar empréstimo</DialogTitle>
        </DialogHeader>
        {isBooksLoading && <p>Buscando os melhores livros...</p>}
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleFormSubmit)}
          >
            <FormField
              control={form.control}
              name="bookId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Livro</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isLoading || isBooksLoading}
                      onValueChange={field.onChange}
                      {...field}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar um livro" />
                      </SelectTrigger>
                      <SelectContent>
                        {books?.map(({ id, name }) => (
                          <SelectItem key={id} value={id}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de retirada</FormLabel>
                  <FormControl>
                    <Input
                      className="w-fit"
                      disabled={isLoading || isBooksLoading}
                      type="date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading || isBooksLoading} type="submit">
              {isLoading ? 'Criando...' : 'Criar'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
