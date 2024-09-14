import {
  LOAN_DAYS_ALLOWED_WITHOUT_FEE,
  LOAN_DELAY_DAYS_ALLOWED,
} from '../../constants';

const MILLISECONDS_IN_DAYS = 1000 * 60 * 60 * 24;

export const getLoanDeadline = (startDateISO: string) => {
  try {
    const loanDeadline = new Date(startDateISO);
    loanDeadline.setDate(
      loanDeadline.getDate() + LOAN_DAYS_ALLOWED_WITHOUT_FEE,
    );
    const weekDay = loanDeadline.getDay();

    if (weekDay === 6) {
      loanDeadline.setDate(loanDeadline.getDate() + 2);
    }

    if (weekDay === 0) {
      loanDeadline.setDate(loanDeadline.getDate() + 1);
    }

    return loanDeadline;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to calculate loan deadline');
  }
};

export const getLoanDelayDaysCount = (
  deadlineDate: Date,
  returnOrLostDate: Date | null | undefined,
) => {
  try {
    const referenceDate = returnOrLostDate || new Date();
    const delayInMillis = referenceDate.getTime() - deadlineDate.getTime();

    const delayDaysCount = Math.floor(delayInMillis / MILLISECONDS_IN_DAYS);
    return delayDaysCount > 0 ? delayDaysCount : 0;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to calculate loan delay days count');
  }
};

export const getLoanDelayFeeAmount = (
  delayDaysCount: number,
  delayFeeAmountPerDay: number,
) => {
  try {
    return delayDaysCount <= LOAN_DELAY_DAYS_ALLOWED
      ? 0
      : delayDaysCount * delayFeeAmountPerDay;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to calculate loan delay fee amount');
  }
};
