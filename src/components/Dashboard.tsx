import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Clock, UserCheck } from 'lucide-react';
import { usePersonelStore } from '../store/personelStore';
import { useIzinTalepStore } from '../store/izinTalepStore';
import { isWithinInterval, isFuture, isPast, startOfToday } from 'date-fns';

interface StatsCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  onClick: () => void;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, count, icon, onClick, color }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`${color} p-6 rounded-xl shadow-lg cursor-pointer`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-white text-sm font-medium mb-1">{title}</p>
        <h3 className="text-white text-2xl font-bold">{count}</h3>
      </div>
      <div className="text-white/80">{icon}</div>
    </div>
  </motion.div>
);

const DetailModal: React.FC<{
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { personeller, izinKayitlari } = usePersonelStore();
  const { talepler } = useIzinTalepStore();
  const [selectedView, setSelectedView] = useState<string | null>(null);

  const today = startOfToday();

  const activePersonel = personeller.filter(p => !p.isCikisTarihi || isFuture(new Date(p.isCikisTarihi)));
  
  const currentlyOnLeave = izinKayitlari.filter(izin => 
    isWithinInterval(today, {
      start: new Date(izin.baslangicTarihi),
      end: new Date(izin.bitisTarihi)
    })
  );

  const futureLeaves = izinKayitlari.filter(izin => 
    isFuture(new Date(izin.baslangicTarihi))
  );

  const pendingRequests = talepler.filter(talep => talep.durum === 'beklemede');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Aktif Personel"
          count={activePersonel.length}
          icon={<Users size={24} />}
          onClick={() => setSelectedView('active')}
          color="bg-blue-600"
        />
        <StatsCard
          title="İzindeki Personel"
          count={currentlyOnLeave.length}
          icon={<UserCheck size={24} />}
          onClick={() => setSelectedView('onLeave')}
          color="bg-green-600"
        />
        <StatsCard
          title="Gelecek İzinler"
          count={futureLeaves.length}
          icon={<Calendar size={24} />}
          onClick={() => setSelectedView('future')}
          color="bg-purple-600"
        />
        <StatsCard
          title="Bekleyen Talepler"
          count={pendingRequests.length}
          icon={<Clock size={24} />}
          onClick={() => setSelectedView('pending')}
          color="bg-orange-600"
        />
      </div>

      <DetailModal
        title={
          selectedView === 'active' ? 'Aktif Personel' :
          selectedView === 'onLeave' ? 'İzindeki Personel' :
          selectedView === 'future' ? 'Gelecek İzinler' :
          selectedView === 'pending' ? 'Bekleyen Talepler' : ''
        }
        isOpen={!!selectedView}
        onClose={() => setSelectedView(null)}
      >
        <div className="space-y-4">
          {selectedView === 'active' && (
            <div className="grid gap-4">
              {activePersonel.map(p => (
                <div key={p.id} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold">{p.ad} {p.soyad}</h3>
                  <p className="text-sm text-gray-600">Bölüm: {p.bolum}</p>
                </div>
              ))}
            </div>
          )}

          {selectedView === 'onLeave' && (
            <div className="grid gap-4">
              {currentlyOnLeave.map(izin => {
                const personel = personeller.find(p => p.id === izin.personelId);
                return (
                  <div key={izin.id} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold">{personel?.ad} {personel?.soyad}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(izin.baslangicTarihi).toLocaleDateString('tr-TR')} - 
                      {new Date(izin.bitisTarihi).toLocaleDateString('tr-TR')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {izin.izinTuru === 'yillik' ? 'Yıllık İzin' : 'Haftalık İzin'}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {selectedView === 'future' && (
            <div className="grid gap-4">
              {futureLeaves.map(izin => {
                const personel = personeller.find(p => p.id === izin.personelId);
                return (
                  <div key={izin.id} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold">{personel?.ad} {personel?.soyad}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(izin.baslangicTarihi).toLocaleDateString('tr-TR')} - 
                      {new Date(izin.bitisTarihi).toLocaleDateString('tr-TR')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {izin.izinTuru === 'yillik' ? 'Yıllık İzin' : 'Haftalık İzin'}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {selectedView === 'pending' && (
            <div className="grid gap-4">
              {pendingRequests.map(talep => {
                const personel = personeller.find(p => p.id === talep.personelId);
                return (
                  <div key={talep.id} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold">{personel?.ad} {personel?.soyad}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(talep.baslangicTarihi).toLocaleDateString('tr-TR')} - 
                      {new Date(talep.bitisTarihi).toLocaleDateString('tr-TR')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {talep.izinTuru === 'yillik' ? 'Yıllık İzin' : 'Haftalık İzin'}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">{talep.aciklama}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </DetailModal>
    </div>
  );
};

export default Dashboard;