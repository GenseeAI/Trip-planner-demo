import { getApiConfig } from '../config/api';

// API configuration and types
interface ItineraryAPIRequest {
  workflow_id: string;
  workflow_secret: string;
  workflow_input: {
    travel_request: string;
  };
  selected_optimization_profile: string;
}

interface ItineraryAPIResponse {
  status: string;
  response: string;
  stdout: string;
  stderr: string;
  error_code: number;
}

/**
 * Generate itinerary using the external API
 * @param travelRequest - The processed travel request string
 * @returns Promise<string> - The generated itinerary in markdown format
 */
export const generateItineraryFromAPI = async (travelRequest: string): Promise<string> => {
  try {
    const config = getApiConfig();
    const requestData: ItineraryAPIRequest = {
      workflow_id: config.ITINERARY.WORKFLOW_ID,
      workflow_secret: config.ITINERARY.WORKFLOW_SECRET,
      workflow_input: {
        travel_request: travelRequest,
      },
      selected_optimization_profile: config.ITINERARY.OPTIMIZATION_PROFILE,
    };

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

    const data: ItineraryAPIResponse = await response.json();
    
    // Handle API response - check for errors first
    if (data.error_code !== 0) {
      throw new Error(`API Error (code ${data.error_code}): ${data.stderr || 'Unknown error'}`);
    }
    
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
 * Test the API connection
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