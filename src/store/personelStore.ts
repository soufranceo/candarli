import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { PersonelSlice, createPersonelSlice } from './slices/personelSlice';
import { IzinSlice, createIzinSlice } from './slices/izinSlice';

export type PersonelStore = PersonelSlice & IzinSlice;

export const usePersonelStore = create<PersonelStore>()(
  persist(
    (...a) => ({
      ...createPersonelSlice(...a),
      ...createIzinSlice(...a),
    }),
    {
      name: 'personel-store',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: (state) => ({
        personeller: state.personeller,
        izinKayitlari: state.izinKayitlari
      })
    }
  )
);

// Re-export types
export * from './types';