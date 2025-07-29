// API Configuration
// In a production environment, these should be loaded from environment variables

export const API_CONFIG = {
  HOST: 'https://platform.gensee.ai', // Replace with your actual host
  // Itinerary generation configuration
  ITINERARY: {
    WORKFLOW_ID: '',
    WORKFLOW_SECRET: '',
    OPTIMIZATION_PROFILE: ''
  },
  // Chat configuration
  CHAT: {
    WORKFLOW_ID: '',
    WORKFLOW_SECRET: '',
    MODEL_OVERRIDE: ''
  }
};

// Environment-specific configuration
export const getApiConfig = () => {
  // In production, you would load these from environment variables
  // return {
  //   HOST: process.env.REACT_APP_API_HOST || API_CONFIG.HOST,
  //   ITINERARY: {
  //     WORKFLOW_ID: process.env.REACT_APP_ITINERARY_WORKFLOW_ID || API_CONFIG.ITINERARY.WORKFLOW_ID,
  //     WORKFLOW_SECRET: process.env.REACT_APP_ITINERARY_WORKFLOW_SECRET || API_CONFIG.ITINERARY.WORKFLOW_SECRET,
  //     OPTIMIZATION_PROFILE: process.env.REACT_APP_OPTIMIZATION_PROFILE || API_CONFIG.ITINERARY.OPTIMIZATION_PROFILE,
  //   },
  //   CHAT: {
  //     WORKFLOW_ID: process.env.REACT_APP_CHAT_WORKFLOW_ID || API_CONFIG.CHAT.WORKFLOW_ID,
  //     WORKFLOW_SECRET: process.env.REACT_APP_CHAT_WORKFLOW_SECRET || API_CONFIG.CHAT.WORKFLOW_SECRET,
  //     MODEL_OVERRIDE: process.env.REACT_APP_CHAT_MODEL_OVERRIDE || API_CONFIG.CHAT.MODEL_OVERRIDE,
  //   }
  // };
  
  return API_CONFIG;
}; 