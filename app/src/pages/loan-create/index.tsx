import * as React from 'react';
import { createLoan } from '@/services/loan';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LaonCreateSchemaType, loanCreateSchema } from '@/schemas/loan';
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

const books = [
  {
    id: 'cm11lf99y000008mk49rh0k4i',
    name: 'Código Limpo (Clean Code)',
  },
  {
    id: 'cm11lfeuj000108mk0gmoenvi',
    name: 'Design Patterns: Elements of Reusable Object-Oriented Software',
  },
  {
    id: 'cm11lfjav000208mkhzesghcw',
    name: 'The Pragmatic Programmer: Your Journey to Mastery',
  },
  {
    id: 'cm11lfok4000308mkbovpf4f9',
    name: 'Refactoring: Improving the Design of Existing Code',
  },
  {
    id: 'cm11lfshp000408mkfar15xjq',
    name: 'Introduction to the Theory of Computation',
  },
];

export const LoanCreate = () => {
  // TODO: implement tanstack Mutations
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm<LaonCreateSchemaType>({
    resolver: zodResolver(loanCreateSchema),
    defaultValues: {
      bookId: '',
      startDate: '',
    },
  });

  const handleFormSubmit = async (payload: LaonCreateSchemaType) => {
    try {
      setIsLoading(true);
      await createLoan(payload);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
                  <Select onValueChange={field.onChange} {...field}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar um livro" />
                    </SelectTrigger>
                    <SelectContent>
                      {books.map(({ id, name }) => (
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
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} type="submit">
            {isLoading ? 'Criando...' : 'Criar'}
          </Button>
        </form>
      </Form>
    </>
  );
};
