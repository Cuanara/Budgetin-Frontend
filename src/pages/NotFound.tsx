import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon } from '../components/icons';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#071C13] p-6 text-center text-white">
      <div className="w-20 h-20 rounded-full bg-[#0C2B1E] border border-[#16432F] flex items-center justify-center text-[#22C55E] mb-4 shadow-xl">
        <HomeIcon className="w-10 h-10" />
      </div>
      <h1 className="text-3xl font-extrabold text-white mb-2">404</h1>
      <p className="text-sm text-[#8FAEA0] max-w-sm mb-6">
        Halaman yang Anda cari tidak ditemukan atau telah dipindahkan.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#22C55E] text-[#062015] text-xs font-bold shadow-md hover:bg-[#16A34A] transition-colors"
      >
        <span>Kembali ke Dashboard</span>
      </Link>
    </div>
  );
};

export default NotFound;
