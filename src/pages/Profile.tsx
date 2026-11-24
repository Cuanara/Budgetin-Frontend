import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { LogoutModal } from '../components/LogoutModal';
import { Toast } from '../components/Toast';
import { ProfileCard } from '../features/profile/components/ProfileCard';
import { ProfileForm } from '../features/profile/components/ProfileForm';
import { NotificationSettings } from '../features/profile/components/NotificationSettings';
import { useProfile } from '../hooks/useProfile';
import { useDashboard } from '../hooks/useDashboard';

const Profile: React.FC = () => {
  const {
    profile,
    notifications,
    email,
    password,
    showPassword,
    feedback,
    setEmail,
    togglePasswordVisibility,
    handleSaveProfile,
    handleToggle,
  } = useProfile();

  const {
    isLogoutModalOpen,
    toastMessage,
    openLogoutModal,
    closeLogoutModal,
    handleLogoutConfirm,
    clearToast,
  } = useDashboard();

  return (
    <div className="flex min-h-screen bg-[#071C13]">
      {/* Sidebar */}
      <Sidebar
        profile={profile}
        onOpenLogoutModal={openLogoutModal}
      />

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto">
        <Navbar
          title="Profile"
          dateText="Kamis, 12 November 2026"
          showAddButton={false}
        />

        <div className="space-y-6">
          {/* Top Row: Profile Card + Account Info Form */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <ProfileCard profile={profile} />
            </div>
            <div className="md:col-span-2">
              <ProfileForm
                email={email}
                password={password}
                showPassword={showPassword}
                feedback={feedback}
                onEmailChange={setEmail}
                onTogglePasswordVisibility={togglePasswordVisibility}
                onSubmit={handleSaveProfile}
              />
            </div>
          </div>

          {/* Bottom Row: Notification Settings */}
          <div>
            <NotificationSettings
              notifications={notifications}
              onToggle={handleToggle}
            />
          </div>
        </div>
      </main>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={closeLogoutModal}
        onConfirm={handleLogoutConfirm}
      />

      {/* Toast */}
      <Toast message={toastMessage} onClear={clearToast} />
    </div>
  );
};

export default Profile;
