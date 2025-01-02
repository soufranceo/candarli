import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type IzinKayit = Database['public']['Tables']['izin_kayitlari']['Row'];
type IzinKayitInsert = Database['public']['Tables']['izin_kayitlari']['Insert'];
type IzinTalep = Database['public']['Tables']['izin_talepleri']['Row'];
type IzinTalepInsert = Database['public']['Tables']['izin_talepleri']['Insert'];

export const izinService = {
  // İzin Kayıtları
  async getIzinKayitlari(personelId?: string) {
    let query = supabase.from('izin_kayitlari').select('*');
    
    if (personelId) {
      query = query.eq('personel_id', personelId);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async createIzinKayit(izin: IzinKayitInsert) {
    const { data, error } = await supabase
      .from('izin_kayitlari')
      .insert(izin)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // İzin Talepleri
  async getIzinTalepleri(personelId?: string) {
    let query = supabase.from('izin_talepleri').select('*');
    
    if (personelId) {
      query = query.eq('personel_id', personelId);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async createIzinTalep(talep: IzinTalepInsert) {
    const { data, error } = await supabase
      .from('izin_talepleri')
      .insert(talep)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateIzinTalepDurum(id: string, durum: 'onaylandi' | 'reddedildi') {
    const { data, error } = await supabase
      .from('izin_talepleri')
      .update({ durum })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};