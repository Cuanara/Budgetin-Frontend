export const API_PATHS = {
  login: '/login',
  loginGoogle: '/login-google',
  register: '/register',
  verifyOtp: '/verify-otp',
  resendOtp: '/resend-otp',
  refresh: '/refresh',
  logout: '/logout',
  me: '/me',
  budgets: '/budgets',
  budgetAllocations: '/budgets/allocations',
  budgetRollover: '/budgets/rollover',
} as const

// endpoint yang tidak boleh memicu auto-refresh saat 401
export const NO_REFRESH_PATHS: string[] = [
  API_PATHS.login,
  API_PATHS.loginGoogle,
  API_PATHS.register,
  API_PATHS.verifyOtp,
  API_PATHS.resendOtp,
  API_PATHS.refresh,
  API_PATHS.logout,
]