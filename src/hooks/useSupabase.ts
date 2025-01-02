import { useState, useCallback } from 'react';
import { personelService } from '../services/personel.service';
import { izinService } from '../services/izin.service';
import type { Database } from '../types/supabase';

type Personel = Database['public']['Tables']['personel']['Row'];
type IzinKayit = Database['public']['Tables']['izin_kayitlari']['Row'];
type IzinTalep = Database['public']['Tables']['izin_talepleri']['Row'];

export function useSupabase() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleError = (err: any) => {
    setError(err instanceof Error ? err : new Error(err.message));
    setLoading(false);
  };

  // Personel İşlemleri
  const getPersoneller = useCallback(async () => {
    try {
      setLoading(true);
      const data = await personelService.getAll();
      return data;
    } catch (err) {
      handleError(err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // İzin İşlemleri
  const getIzinKayitlari = useCallback(async (personelId?: string) => {
    try {
      setLoading(true);
      const data = await izinService.getIzinKayitlari(personelId);
      return data;
    } catch (err) {
      handleError(err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getIzinTalepleri = useCallback(async (personelId?: string) => {
    try {
      setLoading(true);
      const data = await izinService.getIzinTalepleri(personelId);
      return data;
    } catch (err) {
      handleError(err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    personelService,
    izinService,
    getPersoneller,
    getIzinKayitlari,
    getIzinTalepleri
  };
}