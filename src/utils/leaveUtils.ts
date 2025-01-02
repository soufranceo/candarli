import { differenceInYears, addWeeks, isWithinInterval } from 'date-fns';
import { calculateLeaveDays } from './leaveCalculator';
import { validateLeaveBalance } from './leaveValidator';

export { calculateLeaveDays, validateLeaveBalance };

export const calculateAvailableLeave = (
  isGirisTarihi: Date,
  izinTuru: 'yillik' | 'haftalik',
  kullanilmisIzinler: { baslangicTarihi: Date; bitisTarihi: Date; gun: number }[]
): number => {
  const today = new Date();
  
  if (izinTuru === 'haftalik') {
    const totalWeeks = Math.floor(differenceInYears(today, new Date(isGirisTarihi)) * 52);
    const totalWeeklyLeaves = totalWeeks * 2; // 2 days per week
    
    const usedWeeklyLeaves = kullanilmisIzinler.reduce((total, izin) => total + izin.gun, 0);
    
    return Math.max(0, totalWeeklyLeaves - usedWeeklyLeaves);
  } else {
    const yearsWorked = differenceInYears(today, new Date(isGirisTarihi));
    const baseYearlyLeave = 14;
    const totalYearlyLeaves = baseYearlyLeave * (yearsWorked + 1);
    const usedYearlyLeaves = kullanilmisIzinler.reduce((total, izin) => total + izin.gun, 0);
    
    return Math.max(0, totalYearlyLeaves - usedYearlyLeaves);
  }
};