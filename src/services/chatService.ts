import { getApiConfig } from '../config/api';
import { SavedItinerary } from './itineraryService';

// API configuration and types
interface ChatAPIRequest {
  workflow_id: string;
  workflow_secret: string;
  workflow_input: {
    question: string;
    itinerary_context?: string;
  };
  model_override: string;
}

interface ChatAPIResponse {
  status: string;
  response: string;
  stdout: string;
  stderr: string;
  error_code: number;
}

/**
 * Send a message to the chat API with optional itinerary context
 * @param question - The user's question/message
 * @param itinerary - Optional itinerary context to provide to the AI
 * @returns Promise<string> - The AI's response
 */
export const sendChatMessage = async (question: string, itinerary?: SavedItinerary): Promise<string> => {
  try {
    const config = getApiConfig();
    
    // Prepare itinerary context if available
    let itineraryContext = '';
    if (itinerary) {
      itineraryContext = `
Itinerary Context:
Title: ${itinerary.title}
Input Method: ${itinerary.input.method}
Created: ${itinerary.createdAt.toLocaleDateString()}

Itinerary Details:
${itinerary.markdown}

Please use this itinerary information to provide relevant and specific answers to the user's questions.
`;
    }

    const requestData: ChatAPIRequest = {
      workflow_id: config.CHAT.WORKFLOW_ID,
      workflow_secret: config.CHAT.WORKFLOW_SECRET,
      workflow_input: {
        question: question,
        itinerary_context: itineraryContext
      },
      model_override: config.CHAT.MODEL_OVERRIDE,
    };

    const response = await fetch(`${config.HOST}/execute/serve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      throw new Error(`Chat API request failed with status: ${response.status}`);
    }

    const data: ChatAPIResponse = await response.json();
    
    // Handle API response - check for errors first
    if (data.error_code !== 0) {
      throw new Error(`Chat API Error (code ${data.error_code}): ${data.stderr || 'Unknown error'}`);
    }
    
    // Return the response field which contains the AI's reply
    if (data.response) {
      return data.response;
    }
    
    // Fallback if response is empty
    return "I'm sorry, I couldn't generate a response at the moment. Please try again.";
    
  } catch (error) {
    console.error('Error calling chat API:', error);
    throw new Error(`Failed to send chat message: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Test the chat API connection
 * @returns Promise<boolean> - True if API is accessible
 */
export const testChatAPIConnection = async (): Promise<boolean> => {
  try {
    const testQuestion = "Hello, can you help me with travel planning?";
    await sendChatMessage(testQuestion);
    return true;
  } catch (error) {
    console.error('Chat API connection test failed:', error);
    return false;
  }
}; 