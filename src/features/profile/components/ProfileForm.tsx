import React from 'react';
import { EyeIcon } from '../../../components/icons';

interface ProfileFormProps {
  email: string;
  password: string;
  showPassword: boolean;
  feedback: string | null;
  onEmailChange: (val: string) => void;
  onTogglePasswordVisibility: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  email,
  password,
  showPassword,
  feedback,
  onEmailChange,
  onTogglePasswordVisibility,
  onSubmit,
}) => {
  return (
    <div className="bg-[#0C2B1E] rounded-3xl p-6 sm:p-8 shadow-xl border border-[#16432F] h-full flex flex-col justify-between">
      <div>
        <h3 className="text-sm font-bold text-white mb-4">
          Akun
        </h3>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-xs font-semibold text-[#8FAEA0] mb-1">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              className="w-full rounded-2xl border border-[#1B4E37] bg-[#103827] px-4 py-2.5 text-xs text-white focus:border-[#22C55E] outline-hidden transition-all"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-semibold text-[#8FAEA0] mb-1">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                readOnly
                className="w-full rounded-2xl border border-[#1B4E37] bg-[#103827] px-4 py-2.5 text-xs text-white focus:border-[#22C55E] outline-hidden transition-all pr-10"
              />
              <button
                type="button"
                onClick={onTogglePasswordVisibility}
                className="absolute right-3.5 text-[#8FAEA0] hover:text-white transition-colors cursor-pointer"
              >
                <EyeIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {feedback && (
            <p className="text-xs text-[#F87171] font-medium">{feedback}</p>
          )}

          {/* Ubah Password Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="py-2.5 px-6 rounded-full bg-[#4ADE80] hover:bg-[#22C55E] text-[#062015] text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              Ubah Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
