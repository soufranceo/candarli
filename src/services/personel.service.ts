import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type Personel = Database['public']['Tables']['personel']['Row'];
type PersonelInsert = Database['public']['Tables']['personel']['Insert'];
type PersonelUpdate = Database['public']['Tables']['personel']['Update'];

export const personelService = {
  async getAll() {
    const { data, error } = await supabase
      .from('personel')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('personel')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async create(personel: PersonelInsert) {
    const { data, error } = await supabase
      .from('personel')
      .insert(personel)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, personel: PersonelUpdate) {
    const { data, error } = await supabase
      .from('personel')
      .update(personel)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('personel')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};