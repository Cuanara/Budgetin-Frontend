export interface GoogleCredentialResponse {
  credential: string
}

export interface GoogleIdConfig {
  client_id: string
  callback: (response: GoogleCredentialResponse) => void
}

export interface GoogleButtonOptions {
  type?: 'standard' | 'icon'
  theme?: 'outline' | 'filled_blue' | 'filled_black'
  size?: 'large' | 'medium' | 'small'
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin'
  shape?: 'rectangular' | 'pill'
  width?: number
  locale?: string
}

export interface GoogleIdentity {
  accounts: {
    id: {
      initialize: (config: GoogleIdConfig) => void
      renderButton: (parent: HTMLElement, options: GoogleButtonOptions) => void
    }
  }
}