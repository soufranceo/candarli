import { differenceInCalendarDays, isSameDay } from 'date-fns';

export const calculateLeaveDays = (startDate: Date, endDate: Date): number => {
  if (isSameDay(startDate, endDate)) {
    return 1;
  }
  return differenceInCalendarDays(endDate, startDate);
};