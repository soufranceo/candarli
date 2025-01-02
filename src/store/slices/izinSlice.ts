import { StateCreator } from 'zustand';
import { IzinKayit, IzinTuru } from '../types';
import { PersonelSlice } from './personelSlice';

export interface IzinSlice {
  izinKayitlari: IzinKayit[];
  addIzinKayit: (izin: Omit<IzinKayit, 'id'>) => void;
  getKalanIzin: (personelId: number, izinTuru: IzinTuru) => number;
  getKullanilmisIzinler: (personelId: number, izinTuru: IzinTuru) => IzinKayit[];
}

export const createIzinSlice: StateCreator<
  IzinSlice & PersonelSlice
> = (set, get) => ({
  izinKayitlari: [],
  
  addIzinKayit: (izin) => {
    set((state) => ({
      izinKayitlari: [...state.izinKayitlari, { ...izin, id: Date.now() }],
    }));
  },

  getKalanIzin: (personelId, izinTuru) => {
    const personel = get().personeller.find(p => p.id === personelId);
    if (!personel) return 0;

    const kullanilmisIzinler = get().getKullanilmisIzinler(personelId, izinTuru);
    const toplamIzin = izinTuru === 'yillik' ? personel.yillikIzin : personel.haftalikIzin;
    const kullanilan = kullanilmisIzinler.reduce((total, izin) => total + izin.gun, 0);
    
    return Math.max(0, toplamIzin - kullanilan);
  },

  getKullanilmisIzinler: (personelId, izinTuru) => {
    return get().izinKayitlari.filter(
      izin => izin.personelId === personelId && izin.izinTuru === izinTuru
    );
  },
});