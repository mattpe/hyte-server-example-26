/**
 * This module provides functions to interact with the diary entries API of the Hyte server.
 *
 */
import {fetchData} from './fetch';

/**
 * Gets the list of entries for the logged-in user.
 * @param {string} token - The authentication token.
 * @returns {Promise<Array>} A promise resolving to the list of entries.
 */
const getEntries = async (token) => {
  const entries = await fetchData('/entries', {
    headers: {Authorization: `Bearer ${token}`},
  });
  console.log('Fetched entries:', entries);
  return entries;
};

/**
 * Posts a new entry for the logged-in user.
 * @param {string} token - The authentication token.
 * @param {object} entryData - The data for the new entry.
 * @returns {Promise<object>} A promise resolving to the created entry.
 */
const postEntry = async (token, entryData) => {
  const response = await fetchData('/entries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(entryData),
  });
  console.log('Created entry:', response);
  return response;
};

/**
 * Renders the list of entries in the UI.
 * @param {Array} entries - The list of entries to render.
 */
const renderEntries = (entries) => {
  const entriesContainer = document.getElementById('entries');
  entriesContainer.innerHTML = ''; // Clear existing entries
  entries.forEach(entry => {
    const entryElement = document.createElement('div');
    entryElement.className = 'entry';
    entryElement.innerHTML = `
      <h3>${new Date(entry.entry_date).toLocaleDateString('fi-FI')}</h3>
      <p>Mood: ${entry.mood}</p>
      <p>Notes: ${entry.notes}</p>
      <p>Sleeping hours: ${entry.sleep_hours}</p>
      <p>Weight: ${entry.weight}</p>
    `;
    entriesContainer.appendChild(entryElement);
  });
};

export {getEntries, postEntry, renderEntries};
