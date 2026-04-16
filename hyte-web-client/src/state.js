/**
 * State management for the web client. This is a simple implementation using a plain JavaScript object.
 */
import {getEntries, renderEntries} from './entries';
import {fetchData} from './fetch';

const user = {
  username: 'Guest',
  token: localStorage.getItem('token') || null,
};

const entries = [];

/**
 * Sets the user as logged in and updates the UI accordingly.
 * @param {*} name
 * @param {*} token
 */
const setLoggedIn = (user, token) => {
  user = {...user, token};
  document.getElementById('welcome-message').style.display = 'block';
  document.getElementById('entries').style.display = 'block';
  document.getElementById('user-name').textContent = user.username;
  document.getElementById('login-section').style.display = 'none';
};

/**
 * Sets the user as logged out and updates the UI accordingly.
 */
const setLoggedOut = () => {
  user.username = 'Guest';
  user.token = null;
  entries.length = 0; // Clear entries on logout
  document.getElementById('welcome-message').style.display = 'none';
  document.getElementById('entries').style.display = 'none';
  document.getElementById('login-section').style.display = 'block';
};

/**
 * Tests the stored token by making a request to the server. If the token is valid, it sets
 * the user as logged in and fetches the entries. If not, it sets the user as logged out.
 */
const testToken = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const response = await fetchData('/users/me', {
        headers: {Authorization: `Bearer ${token}`},
      });
      if (response.user) {
        setLoggedIn(response.user, token);
        entries.push(...await getEntries(token));
        renderEntries(entries);
      } else {
        setLoggedOut();
      }
    } catch (error) {
      setLoggedOut();
    }
  } else {
    setLoggedOut();
  }
};

export {user, setLoggedIn, setLoggedOut, testToken};
