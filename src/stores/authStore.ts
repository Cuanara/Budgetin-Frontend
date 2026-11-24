import { create } from 'zustand'
import type { User } from '../types/auth'
import { clearToken, getToken, saveToken } from '../utils/tokenStorage'

interface AuthState {
  token: string | null
  user: User | null
  setSession: (token: string, user: User) => void
  setToken: (token: string) => void
  setUser: (user: User) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: getToken(),
  user: null,
  setSession: (token, user) => set({ token, user }),
  setToken: (token) => {
    saveToken(token)
    set({ token })
  },
  setUser: (user) => set({ user }),
  clearSession: () => {
    clearToken()
    set({ token: null, user: null })
  },
}))