import { StateCreator } from 'zustand';
import { Personel } from '../types';

export interface PersonelSlice {
  personeller: Personel[];
  addPersonel: (personel: Omit<Personel, 'id'>) => number;
  updatePersonel: (id: number, personel: Omit<Personel, 'id'>) => void;
  deletePersonel: (id: number) => void;
  getPersonelByAdSoyad: (adSoyad: string) => Personel | undefined;
}

export const createPersonelSlice: StateCreator<PersonelSlice> = (set, get) => ({
  personeller: [],
  
  addPersonel: (personel) => {
    const id = Date.now();
    set((state) => ({
      personeller: [...state.personeller, { ...personel, id }],
    }));
    return id;
  },

  updatePersonel: (id, personel) => {
    set((state) => ({
      personeller: state.personeller.map((p) => 
        p.id === id ? { ...personel, id } : p
      ),
    }));
  },

  deletePersonel: (id) => {
    set((state) => ({
      personeller: state.personeller.filter((p) => p.id !== id),
    }));
  },

  getPersonelByAdSoyad: (adSoyad) => {
    const [ad, soyad] = adSoyad.split(' ');
    return get().personeller.find(
      (p) => p.ad.toLowerCase() === ad?.toLowerCase() && 
            p.soyad.toLowerCase() === soyad?.toLowerCase()
    );
  },
});