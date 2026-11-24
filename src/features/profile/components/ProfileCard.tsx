import React from 'react';
import type { UserProfile } from '../../../types/profile';
import { EditPencilIcon } from '../../../components/icons';

interface ProfileCardProps {
  profile: UserProfile;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <div className="bg-[#0C2B1E] rounded-3xl p-6 sm:p-8 shadow-xl border border-[#16432F] flex flex-col items-center text-center justify-center h-full">
      {/* Avatar */}
      <div className="w-24 h-24 rounded-full bg-[#22C55E] flex items-center justify-center text-[#062015] font-extrabold text-3xl shadow-inner mb-4">
        {profile.avatarLetter}
      </div>

      {/* Name with edit icon */}
      <div className="flex items-center gap-2 mb-1">
        <h3 className="text-xl font-bold text-white tracking-tight">
          {profile.name}
        </h3>
        <button
          type="button"
          aria-label="Edit Nama"
          className="text-[#7FA392] hover:text-white transition-colors cursor-pointer"
        >
          <EditPencilIcon className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-[#8FAEA0] mb-6">
        Bergabung {profile.joinedDate}
      </p>

      {/* Tambah Foto Profil Button */}
      <button
        type="button"
        className="w-full py-2.5 px-4 rounded-full bg-[#22C55E] hover:bg-[#16A34A] text-xs font-bold text-[#062015] transition-colors cursor-pointer"
      >
        Tambah Foto Profil
      </button>
    </div>
  );
};
