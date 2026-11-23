import { useState, useCallback } from 'react';
import { useBudgetStore } from '../stores/useBudgetStore';
import type { NotificationSettingsState } from '../types/profile';

export const useProfile = () => {
  const profile = useBudgetStore((s) => s.profile);
  const notifications = useBudgetStore((s) => s.notifications);
  const updateProfile = useBudgetStore((s) => s.updateProfile);
  const toggleNotification = useBudgetStore((s) => s.toggleNotification);
  const toastMessage = useBudgetStore((s) => s.toastMessage);
  const clearToast = useBudgetStore((s) => s.clearToast);

  const [name, setName] = useState<string>(profile.name);
  const [email, setEmail] = useState<string>(profile.email);
  const [password, setPassword] = useState<string>('•••••••••');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleSaveProfile = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const validName = name.trim();
      const validEmail = email.trim();

      if (!validName) {
        setFeedback('Nama tidak boleh kosong');
        return;
      }

      if (!validEmail) {
        setFeedback('Email tidak boleh kosong');
        return;
      }

      setFeedback(null);
      updateProfile({
        name: validName,
        email: validEmail,
        avatarLetter: validName.charAt(0).toUpperCase(),
      });
    },
    [name, email, updateProfile]
  );

  const handleToggle = useCallback(
    (key: keyof NotificationSettingsState) => {
      toggleNotification(key);
    },
    [toggleNotification]
  );

  return {
    profile,
    notifications,
    name,
    email,
    password,
    showPassword,
    feedback,
    toastMessage,
    setName,
    setEmail,
    setPassword,
    togglePasswordVisibility,
    handleSaveProfile,
    handleToggle,
    clearToast,
  };
};
