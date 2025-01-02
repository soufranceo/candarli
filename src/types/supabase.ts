export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      personel: {
        Row: {
          id: string
          ad: string
          soyad: string
          tc_no: string
          telefon: string
          bolum: string
          is_giris_tarihi: string
          is_cikis_tarihi: string | null
          yillik_izin: number
          haftalik_izin: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          ad: string
          soyad: string
          tc_no: string
          telefon: string
          bolum: string
          is_giris_tarihi: string
          is_cikis_tarihi?: string | null
          yillik_izin?: number
          haftalik_izin?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          ad?: string
          soyad?: string
          tc_no?: string
          telefon?: string
          bolum?: string
          is_giris_tarihi?: string
          is_cikis_tarihi?: string | null
          yillik_izin?: number
          haftalik_izin?: number
          created_at?: string
          updated_at?: string
        }
      }
      izin_kayitlari: {
        Row: {
          id: string
          personel_id: string
          baslangic_tarihi: string
          bitis_tarihi: string
          izin_turu: string
          gun: number
          created_at: string
        }
        Insert: {
          id?: string
          personel_id: string
          baslangic_tarihi: string
          bitis_tarihi: string
          izin_turu: string
          gun: number
          created_at?: string
        }
        Update: {
          id?: string
          personel_id?: string
          baslangic_tarihi?: string
          bitis_tarihi?: string
          izin_turu?: string
          gun?: number
          created_at?: string
        }
      }
      izin_talepleri: {
        Row: {
          id: string
          personel_id: string
          baslangic_tarihi: string
          bitis_tarihi: string
          izin_turu: string
          gun: number
          durum: string
          aciklama: string | null
          created_at: string
        }
        Insert: {
          id?: string
          personel_id: string
          baslangic_tarihi: string
          bitis_tarihi: string
          izin_turu: string
          gun: number
          durum?: string
          aciklama?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          personel_id?: string
          baslangic_tarihi?: string
          bitis_tarihi?: string
          izin_turu?: string
          gun?: number
          durum?: string
          aciklama?: string | null
          created_at?: string
        }
      }
    }
  }
}