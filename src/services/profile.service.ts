import type { UserProfile, NotificationSettingsState } from '../types/profile';

export const ProfileService = {
  getDefaultProfile(): UserProfile {
    return {
      name: 'Nadia',
      email: 'nadia@email.com',
      joinedDate: '12 Nov 2026',
      avatarLetter: 'N',
    };
  },

  getDefaultNotifications(): NotificationSettingsState {
    return {
      delayEnded: true,
      dayBeforeReminder: true,
      balanceSufficient: true,
      transactionSuccess: false,
    };
  },
};
