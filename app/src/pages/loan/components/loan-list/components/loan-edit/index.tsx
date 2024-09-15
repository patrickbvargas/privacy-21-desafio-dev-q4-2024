import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PencilIcon } from '@heroicons/react/20/solid';

export const LoanEdit = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="outline"
      size="icon"
      className="flex gap-2"
      onClick={() => navigate(`/loan/edit/${id}`)}
    >
      <PencilIcon className="size-4" />
    </Button>
  );

  //   <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
  //     <DialogTrigger>
  //       <span
  //         className={cn(buttonVariants({ variant: 'outline' }), 'flex gap-2')}
  //       >
  //         <PencilIcon className="size-4" />
  //       </span>
  //     </DialogTrigger>
  //     <DialogContent>
  //       {isLoanLoading ? (
  //         <p>Carregando dados do empréstimo...</p>
  //       ) : (
  //         <>
  //           <DialogHeader className="space-y-4">
  //             <DialogTitle>Editar empréstimo</DialogTitle>
  //             <DialogDescription>Livro: {loan?.book.name}</DialogDescription>
  //           </DialogHeader>
  //           <Form {...form}>
  //             <form
  //               className="space-y-4"
  //               onSubmit={form.handleSubmit(handleFormSubmit)}
  //             >
  //               <div className="grid  grid-cols-2 gap-4 w-full">
  //                 <FormField
  //                   control={form.control}
  //                   name="status"
  //                   render={({ field }) => (
  //                     <FormItem>
  //                       <FormLabel>Status</FormLabel>
  //                       <FormControl>
  //                         <Select
  //                           onValueChange={(value) => {
  //                             field.onChange(value);
  //                             if (value === LoanStatus.LOANED) {
  //                               form.setValue('returnDate', null);
  //                               form.setValue('lostDate', null);
  //                             }
  //                             if (value === LoanStatus.RETURNED) {
  //                               form.setValue('lostDate', null);
  //                             }
  //                             if (value === LoanStatus.LOST) {
  //                               form.setValue('returnDate', null);
  //                             }
  //                           }}
  //                           {...field}
  //                         >
  //                           <SelectTrigger>
  //                             <SelectValue placeholder="Selecionar um livro" />
  //                           </SelectTrigger>
  //                           <SelectContent>
  //                             <SelectItem value={LoanStatus.LOANED}>
  //                               Emprestado
  //                             </SelectItem>
  //                             <SelectItem value={LoanStatus.RETURNED}>
  //                               Devolvido
  //                             </SelectItem>
  //                             <SelectItem value={LoanStatus.LOST}>
  //                               Extraviado
  //                             </SelectItem>
  //                           </SelectContent>
  //                         </Select>
  //                       </FormControl>
  //                       <FormMessage />
  //                     </FormItem>
  //                   )}
  //                 />
  //                 {formStatusValue === LoanStatus.LOANED && (
  //                   <FormField
  //                     control={form.control}
  //                     name="startDate"
  //                     render={({ field }) => (
  //                       <FormItem>
  //                         <FormLabel>Data de retirada</FormLabel>
  //                         <FormControl>
  //                           <Input
  //                             type="date"
  //                             value={field.value || ''}
  //                             onChange={field.onChange}
  //                           />
  //                         </FormControl>
  //                         <FormMessage />
  //                       </FormItem>
  //                     )}
  //                   />
  //                 )}
  //                 {formStatusValue === LoanStatus.RETURNED && (
  //                   <FormField
  //                     control={form.control}
  //                     name="returnDate"
  //                     render={({ field }) => (
  //                       <FormItem>
  //                         <FormLabel>Data de devolução</FormLabel>
  //                         <FormControl>
  //                           <Input
  //                             type="date"
  //                             min={formStartDateValue || ''}
  //                             value={field.value || ''}
  //                             onChange={field.onChange}
  //                           />
  //                         </FormControl>
  //                         <FormMessage />
  //                       </FormItem>
  //                     )}
  //                   />
  //                 )}
  //                 {formStatusValue === LoanStatus.LOST && (
  //                   <FormField
  //                     control={form.control}
  //                     name="lostDate"
  //                     render={({ field }) => (
  //                       <FormItem>
  //                         <FormLabel>Data de extravio</FormLabel>
  //                         <FormControl>
  //                           <Input
  //                             type="date"
  //                             min={formStartDateValue || ''}
  //                             value={field.value || ''}
  //                             onChange={field.onChange}
  //                           />
  //                         </FormControl>
  //                         <FormMessage />
  //                       </FormItem>
  //                     )}
  //                   />
  //                 )}
  //               </div>
  //               <Button type="submit">
  //                 {isLoading ? 'Atualizando...' : 'Atualizar'}
  //               </Button>
  //             </form>
  //           </Form>
  //           <pre className="w-full overflow-auto">
  //             {JSON.stringify(form.getValues(), null, 2)}
  //           </pre>
  //         </>
  //       )}
  //     </DialogContent>
  //   </Dialog>
  // );
};
