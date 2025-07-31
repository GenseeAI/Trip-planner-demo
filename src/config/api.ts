// API Configuration
// Environment variables are loaded from .env file

export const API_CONFIG = {
  HOST: import.meta.env.VITE_API_HOST || 'https://platform.gensee.ai',
  // Itinerary generation configuration
  ITINERARY: {
    WORKFLOW_ID: import.meta.env.VITE_ITINERARY_WORKFLOW_ID || '',
    WORKFLOW_SECRET: import.meta.env.VITE_ITINERARY_WORKFLOW_SECRET || '',
    OPTIMIZATION_PROFILE: import.meta.env.VITE_ITINERARY_OPTIMIZATION_PROFILE || '',
    MODEL_OVERRIDE: import.meta.env.VITE_CHAT_MODEL_OVERRIDE || ''
  },
  // Chat configuration
  CHAT: {
    WORKFLOW_ID: import.meta.env.VITE_CHAT_WORKFLOW_ID || '',
    WORKFLOW_SECRET: import.meta.env.VITE_CHAT_WORKFLOW_SECRET || '',
    OPTIMIZATION_PROFILE: import.meta.env.VITE_ITINERARY_OPTIMIZATION_PROFILE || '',
    MODEL_OVERRIDE: import.meta.env.VITE_CHAT_MODEL_OVERRIDE || ''
  }
};

// Environment-specific configuration getter
export const getApiConfig = () => {
  return API_CONFIG;
}; 