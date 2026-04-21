/**
 * Provides functions to interact with the kubios API and to render the UI for kubios data.
 * @module kubios
 */
import {fetchData} from './fetch';

/**
 * Gets the list of kubios data for the logged-in user.
 * @param {string} token - The authentication token.
 * @returns {Promise<Array>} A promise resolving to the list of kubios data.
 */
const getKubiosData = async (token) => {
  const data = await fetchData('/kubios/user-data', {
    headers: {Authorization: `Bearer ${token}`},
  });
  console.log('Fetched kubios data:', data);
  return data;
};

/**
 * Renders the kubios data in the UI.
 * @param {Array} data - The list of kubios data to render.
 */
const renderKubiosData = (data) => {
  const container = document.getElementById('kubios-data');
  container.innerHTML = '<h2>Kubios Data</h2>'; // Clear existing data
  data.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.className = 'entry';
    itemElement.innerHTML = `
      <h3>${new Date(item.daily_result).toLocaleDateString('fi-FI')}</h3>
      <p>Readiness: ${item.result.readiness}</p>
      <p>Stress: ${item.result.stress_index}</p>
      <p>Comment: ${item.user_comment}</p>
      <p>Happiness: ${item.user_happiness}</p>
    `;
    container.appendChild(itemElement);
  });
};

export {getKubiosData, renderKubiosData};
