import { getApiConfig } from '../config/api';

// Common API response structure
interface BaseAPIResponse {
  status: string;
  response: string;
  stdout: string;
  stderr: string;
  error_code: number;
}

// Base request interface with required fields
interface BaseAPIRequest {
  workflow_id: string;
  workflow_secret: string;
}

// Itinerary API specific types
interface ItineraryAPIRequest extends BaseAPIRequest {
  workflow_input: {
    travel_request: string;
  };
  selected_optimization_profile?: string;
  model_override?: string;
}

export interface ItineraryAPIResponse extends BaseAPIResponse {}

// Chat API specific types
interface ChatAPIRequest extends BaseAPIRequest {
  workflow_input: {
    question: string;
    itinerary_context?: string;
  };
  selected_optimization_profile?: string;
  model_override?: string;
}

export interface ChatAPIResponse extends BaseAPIResponse {}

// Helper function to check if a value is valid (not empty string or undefined)
const hasValue = (value: string | undefined): boolean => {
  return value !== undefined && value !== null && value.trim() !== '';
};

// Helper function to conditionally add fields to request object
const buildRequestData = <T extends BaseAPIRequest>(baseRequest: T, optionalFields: Record<string, string | undefined>): T => {
  const request = { ...baseRequest };
  
  // Add optional fields only if they have valid values
  Object.entries(optionalFields).forEach(([key, value]) => {
    if (hasValue(value)) {
      (request as any)[key] = value;
    }
  });
  
  return request;
};

// Generic API calling function
const callAPI = async <TRequest, TResponse extends BaseAPIResponse>(
  requestData: TRequest
): Promise<TResponse> => {
  try {
    const config = getApiConfig();
    
    const response = await fetch(`${config.HOST}/execute/serve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data: TResponse = await response.json();
    
    // Handle API response - check for errors first
    if (data.error_code !== 0) {
      throw new Error(`API Error (code ${data.error_code}): ${data.stderr || 'Unknown error'}`);
    }
    
    return data;
    
  } catch (error) {
    console.error('Error calling API:', error);
    throw new Error(`Failed to call API: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Generate itinerary using the external API
 * @param travelRequest - The processed travel request string
 * @returns Promise<string> - The generated itinerary in markdown format
 */
export const generateItineraryFromAPI = async (travelRequest: string): Promise<string> => {
  try {
    const config = getApiConfig();
    
    const baseRequest: Omit<ItineraryAPIRequest, 'selected_optimization_profile' | 'model_override'> = {
      workflow_id: config.ITINERARY.WORKFLOW_ID,
      workflow_secret: config.ITINERARY.WORKFLOW_SECRET,
      workflow_input: {
        travel_request: travelRequest,
      },
    };

    // Build request with optional fields only if they have values
    const requestData = buildRequestData(baseRequest, {
      selected_optimization_profile: config.ITINERARY.OPTIMIZATION_PROFILE,
      model_override: config.ITINERARY.MODEL_OVERRIDE,
    }) as ItineraryAPIRequest;

    const data = await callAPI<ItineraryAPIRequest, ItineraryAPIResponse>(requestData);
    
    // Return the response field which contains the itinerary
    if (data.response) {
      return data.response;
    }
    
    // Fallback if response is empty
    return `# No Itinerary Generated

The API call was successful but no itinerary was returned.

**Travel Request:** ${travelRequest}

**Status:** ${data.status}`;
    
  } catch (error) {
    console.error('Error calling itinerary API:', error);
    throw new Error(`Failed to generate itinerary via API: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Send a chat message to the API
 * @param question - The user's question/message
 * @param itineraryContext - Optional itinerary context to provide to the AI
 * @returns Promise<string> - The AI's response
 */
export const sendChatMessageToAPI = async (question: string, itineraryContext?: string): Promise<string> => {
  try {
    const config = getApiConfig();
    
    const baseRequest: Omit<ChatAPIRequest, 'selected_optimization_profile' | 'model_override'> = {
      workflow_id: config.CHAT.WORKFLOW_ID,
      workflow_secret: config.CHAT.WORKFLOW_SECRET,
      workflow_input: {
        question: question,
        itinerary_context: itineraryContext
      },
    };

    // Build request with optional fields only if they have values
    const requestData = buildRequestData(baseRequest, {
      selected_optimization_profile: config.CHAT.OPTIMIZATION_PROFILE,
      model_override: config.CHAT.MODEL_OVERRIDE,
    }) as ChatAPIRequest;

    const data = await callAPI<ChatAPIRequest, ChatAPIResponse>(requestData);
    
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
 * Test the API connection for itinerary generation
 * @returns Promise<boolean> - True if API is accessible
 */
export const testAPIConnection = async (): Promise<boolean> => {
  try {
    const testRequest = "Test connection - 2 day trip to Paris for 2 people with $1000 budget";
    await generateItineraryFromAPI(testRequest);
    return true;
  } catch (error) {
    console.error('API connection test failed:', error);
    return false;
  }
};

/**
 * Test the chat API connection
 * @returns Promise<boolean> - True if API is accessible
 */
export const testChatAPIConnection = async (): Promise<boolean> => {
  try {
    const testQuestion = "Hello, can you help me with travel planning?";
    await sendChatMessageToAPI(testQuestion);
    return true;
  } catch (error) {
    console.error('Chat API connection test failed:', error);
    return false;
  }
}; 