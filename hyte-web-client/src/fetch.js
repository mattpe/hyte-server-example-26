const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Generic function to fetch data from the API with error handling.
 * @param {string} url - The endpoint URL (relative to the API base URL from env file).
 * @param {object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise<object>} The response data as a JSON object.
 * @throws Will throw an error if the fetch fails or if the response is not ok.
 */
const fetchData = async (url, options) => {
  try {
    const response = await fetch(`${apiUrl}${url}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export {fetchData};
