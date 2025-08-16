export interface SharedEnvConfig {
  // Website Service
  VITE_WEBSITE_HOST: string;
  VITE_WEBSITE_PORT: string;
  VITE_WEBSITE_APP_URL: string;
  
  // Auth Service
  VITE_AUTH_HOST: string;
  VITE_AUTH_PORT: string;
  VITE_AUTH_API_URL: string;
  VITE_AUTH_APP_URL: string;
}

// Helper function to get environment variable with fallback
export function getEnvVar(key: keyof SharedEnvConfig, fallback?: string): string {
  // Access environment variables directly from import.meta.env
  const env = (import.meta as any).env;
  const value = env?.[key];
  
  if (value !== undefined) {
    return value;
  }
  
  if (fallback !== undefined) {
    return fallback;
  }
  
  throw new Error(`Environment variable ${key} is required but not set`);
}

// Get all environment variables
export function getEnvConfig(): SharedEnvConfig {
  return {
    VITE_WEBSITE_HOST: getEnvVar('VITE_WEBSITE_HOST'),
    VITE_WEBSITE_PORT: getEnvVar('VITE_WEBSITE_PORT'),
    VITE_WEBSITE_APP_URL: getEnvVar('VITE_WEBSITE_APP_URL'),
    
    VITE_AUTH_HOST: getEnvVar('VITE_AUTH_HOST'),
    VITE_AUTH_PORT: getEnvVar('VITE_AUTH_PORT'),
    VITE_AUTH_API_URL: getEnvVar('VITE_AUTH_API_URL'),
    VITE_AUTH_APP_URL: getEnvVar('VITE_AUTH_APP_URL'),
  };
}

// =============================================================================
// SHARED ENVIRONMENT UTILITIES
// =============================================================================

// Get specific environment variables
export const authApiUrl = getEnvVar('VITE_AUTH_API_URL');
export const authAppUrl = getEnvVar('VITE_AUTH_APP_URL');
export const websiteAppUrl = getEnvVar('VITE_WEBSITE_APP_URL');

// Get all environment variables at once
export const env = getEnvConfig();

// Service-specific utilities
export function getAuthRedirectUrl(): string {
  return `${websiteAppUrl}/auth/callback`;
}

export function getApiUrl(service: 'auth'): string {
  switch (service) {
    case 'auth':
      return authApiUrl;
    default:
      throw new Error(`Unknown service: ${service}`);
  }
}

// Debug utilities
export function logEnvInfo(): void {
  console.log('Environment Configuration:', {
    authApiUrl,
    authAppUrl,
    websiteAppUrl,
    authHost: getEnvVar('VITE_AUTH_HOST'),
    authPort: getEnvVar('VITE_AUTH_PORT'),
    websiteHost: getEnvVar('VITE_WEBSITE_HOST'),
    websitePort: getEnvVar('VITE_WEBSITE_PORT'),
  });
}
