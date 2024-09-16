import * as React from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { LoanStatus } from '@/constants/enum';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { PageTitle } from '@/components/ui/page-title';
import { Info } from '@/components/ui/info';
import { queryClient } from '@/providers/tanstack-query';
import { getOneLoan, updateLoan } from '@/services/loan';
import { loanOutputSchema, type LoanOutputSchemaType } from '@/schemas/loan';
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
import { getCurrencyLocaleString } from '@/utils';

const MESSAGE = {
  LOADING:
    'Estamos carregando os dados do empréstimo. Por favor, aguarde um momento...',
};

const isLoanValid = (loan: LoanOutputSchemaType) => {
  if (loan.status === LoanStatus.LOANED && !loan.startDate) {
    toast.warning(
      'Livro com status "Emprestado", informe a "Data de retirada"!',
    );
    return false;
  }
  if (loan.status === LoanStatus.RETURNED && !loan.returnDate) {
    toast.warning(
      'Livro com status "Devolvido", adicione a "Data de devolução"!',
    );
    return false;
  }
  if (loan.status === LoanStatus.LOST && !loan.lostDate) {
    toast.warning(
      'Livro com status "Extraviado", adicione a "Data de extravio"!',
    );
    return false;
  }

  return true;
};

export const LoanEditPage = () => {
  // TODO: implement tanstack Mutations
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm<LoanOutputSchemaType>({
    resolver: zodResolver(loanOutputSchema),
    defaultValues: async () => {
      return await getOneLoan(id || '');
    },
  });
  const formStatusValue = form.watch('status');
  const formStartDateValue = form.watch('startDate');

  const handleFormSubmit = async (payload: LoanOutputSchemaType) => {
    try {
      if (!isLoanValid(payload)) return;
      setIsLoading(true);
      await updateLoan(payload);
      queryClient.invalidateQueries({ queryKey: ['loans'] });
      navigate('/loans');
      toast.success('Empréstimo atualizado com sucesso!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erro ao atualizar empréstimo');
    } finally {
      setIsLoading(false);
    }
  };

  if (loanOutputSchema.safeParse(form.getValues()).success === false)
    return <p>{MESSAGE.LOADING}</p>; // TODO: replace for Loading component

  return (
    <>
      <PageTitle className="mb-6" title="Editar empréstimo" />
      <Info label="Título do Livro" value={form.getValues('book.name')} />
      <div className="flex gap-10">
        <Info label="Dias de atraso" value={form.getValues('delayDaysCount')} />
        <Info
          label="Valor da multa"
          value={getCurrencyLocaleString(form.getValues('delayFeeAmount'))}
        />
      </div>
      <Form {...form}>
        <form
          className="space-y-4 max-w-lg"
          onSubmit={form.handleSubmit(handleFormSubmit)}
        >
          <div className="grid  grid-cols-2 gap-4 w-full">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isLoading}
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (value === LoanStatus.LOANED) {
                          form.setValue('returnDate', null);
                          form.setValue('lostDate', null);
                        }
                        if (value === LoanStatus.RETURNED) {
                          form.setValue('lostDate', null);
                        }
                        if (value === LoanStatus.LOST) {
                          form.setValue('returnDate', null);
                        }
                      }}
                      {...field}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar um livro" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={LoanStatus.LOANED}>
                          Emprestado
                        </SelectItem>
                        <SelectItem value={LoanStatus.RETURNED}>
                          Devolvido
                        </SelectItem>
                        <SelectItem value={LoanStatus.LOST}>
                          Extraviado
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {formStatusValue === LoanStatus.LOANED && (
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de retirada</FormLabel>
                    <FormControl>
                      <Input
                        className="w-fit"
                        type="date"
                        disabled={isLoading}
                        value={field.value || ''}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {formStatusValue === LoanStatus.RETURNED && (
              <FormField
                control={form.control}
                name="returnDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de devolução</FormLabel>
                    <FormControl>
                      <Input
                        className="w-fit"
                        type="date"
                        disabled={isLoading}
                        min={formStartDateValue || ''}
                        value={field.value || ''}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {formStatusValue === LoanStatus.LOST && (
              <FormField
                control={form.control}
                name="lostDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de extravio</FormLabel>
                    <FormControl>
                      <Input
                        className="w-fit"
                        type="date"
                        disabled={isLoading}
                        min={formStartDateValue || ''}
                        value={field.value || ''}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <div>
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prazo de devolução</FormLabel>
                  <FormControl>
                    <Input
                      className="w-fit"
                      type="date"
                      min={formStartDateValue || ''}
                      disabled={isLoading}
                      value={field.value || ''}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2">
            <Button disabled={isLoading} type="submit">
              {isLoading ? 'Atualizando...' : 'Atualizar'}
            </Button>
            <Button
              variant="outline"
              disabled={isLoading}
              onClick={() => navigate('/loans')}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
