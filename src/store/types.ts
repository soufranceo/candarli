// Common types used across stores
export interface Personel {
  id: number;
  ad: string;
  soyad: string;
  tcNo: string;
  telefon: string;
  bolum: string;
  isGirisTarihi: Date;
  isCikisTarihi: Date | null;
  yillikIzin: number;
  haftalikIzin: number;
}

export interface IzinKayit {
  id: number;
  personelId: number;
  baslangicTarihi: Date;
  bitisTarihi: Date;
  izinTuru: 'yillik' | 'haftalik';
  gun: number;
}

export type IzinTuru = 'yillik' | 'haftalik';