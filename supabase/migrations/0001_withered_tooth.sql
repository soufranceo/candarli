/*
  # Initial Schema Setup

  1. Tables
    - personel
      - id (uuid, primary key)
      - ad (text)
      - soyad (text) 
      - tc_no (text)
      - telefon (text)
      - bolum (text)
      - is_giris_tarihi (timestamptz)
      - is_cikis_tarihi (timestamptz)
      - yillik_izin (int)
      - haftalik_izin (int)
      - created_at (timestamptz)
      - updated_at (timestamptz)

    - izin_kayitlari
      - id (uuid, primary key)
      - personel_id (uuid, foreign key)
      - baslangic_tarihi (timestamptz)
      - bitis_tarihi (timestamptz)
      - izin_turu (text)
      - gun (int)
      - created_at (timestamptz)

    - izin_talepleri
      - id (uuid, primary key)
      - personel_id (uuid, foreign key)
      - baslangic_tarihi (timestamptz)
      - bitis_tarihi (timestamptz)
      - izin_turu (text)
      - gun (int)
      - durum (text)
      - aciklama (text)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Personel table
CREATE TABLE personel (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  ad text NOT NULL,
  soyad text NOT NULL,
  tc_no text UNIQUE NOT NULL,
  telefon text NOT NULL,
  bolum text NOT NULL,
  is_giris_tarihi timestamptz NOT NULL,
  is_cikis_tarihi timestamptz,
  yillik_izin int NOT NULL DEFAULT 14,
  haftalik_izin int NOT NULL DEFAULT 2,
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

-- İzin kayıtları table
CREATE TABLE izin_kayitlari (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  personel_id uuid REFERENCES personel(id) ON DELETE CASCADE,
  baslangic_tarihi timestamptz NOT NULL,
  bitis_tarihi timestamptz NOT NULL,
  izin_turu text NOT NULL CHECK (izin_turu IN ('yillik', 'haftalik')),
  gun int NOT NULL,
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

-- İzin talepleri table
CREATE TABLE izin_talepleri (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  personel_id uuid REFERENCES personel(id) ON DELETE CASCADE,
  baslangic_tarihi timestamptz NOT NULL,
  bitis_tarihi timestamptz NOT NULL,
  izin_turu text NOT NULL CHECK (izin_turu IN ('yillik', 'haftalik')),
  gun int NOT NULL,
  durum text NOT NULL DEFAULT 'beklemede' CHECK (durum IN ('beklemede', 'onaylandi', 'reddedildi')),
  aciklama text,
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE personel ENABLE ROW LEVEL SECURITY;
ALTER TABLE izin_kayitlari ENABLE ROW LEVEL SECURITY;
ALTER TABLE izin_talepleri ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Authenticated users can read all personel"
  ON personel FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert personel"
  ON personel FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update personel"
  ON personel FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read all izin_kayitlari"
  ON izin_kayitlari FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert izin_kayitlari"
  ON izin_kayitlari FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read all izin_talepleri"
  ON izin_talepleri FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert izin_talepleri"
  ON izin_talepleri FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update izin_talepleri"
  ON izin_talepleri FOR UPDATE
  TO authenticated
  USING (true);