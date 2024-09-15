import { DEFAULT_INFO_ALIAS } from '@/constants/alias';

export const getDateLocaleString = (date: Date | string | null) => {
  if (!date) return DEFAULT_INFO_ALIAS;

  let referenceDate: Date;

  if (typeof date === 'string') {
    const [year, month, day] = date.split('-').map(Number);
    referenceDate = new Date(year, month - 1, day);
  } else {
    referenceDate = date instanceof Date ? date : new Date(date);
  }

  const dateLocaleString = referenceDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return dateLocaleString;
};
