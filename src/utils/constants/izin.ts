export const IZIN_TURU = {
  YILLIK: 'yillik',
  HAFTALIK: 'haftalik'
} as const;

export const IZIN_TURU_LABEL = {
  [IZIN_TURU.YILLIK]: 'Yıllık İzin',
  [IZIN_TURU.HAFTALIK]: 'Haftalık İzin'
} as const;

export const DEFAULT_IZIN = {
  YILLIK: 14,
  HAFTALIK: 2
} as const;