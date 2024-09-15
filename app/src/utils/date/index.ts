import { DEFAULT_INFO_ALIAS } from '@/constants/alias';

export const getDateLocaleString = (date: Date | null) => {
  if (!date) return DEFAULT_INFO_ALIAS;
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
