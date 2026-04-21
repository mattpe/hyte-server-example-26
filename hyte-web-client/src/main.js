import './style.css';
import {fetchData} from './fetch';
import {setLoggedOut, testToken, user} from './state';
import {getKubiosData, renderKubiosData} from './kubios';

// Test the token on page load to set the initial state
testToken();

// Handle login form submission
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const data = await fetchData('/users/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password}),
    });
    console.log('Login response:', data);
    localStorage.setItem('token', data.token);
    await testToken();
    alert('Login successful!');
    loginForm.reset();
  } catch (error) {
    alert('Login failed!');
  }
});

// Handle logout button click
document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('token');
  setLoggedOut();
  console.log('User after logout:', user);
  alert('Logged out!');
});

// Handle fetch kubios data button click
document.getElementById('fetch-kubios-data').addEventListener('click', async () => {
  const token = localStorage.getItem('token');
  const kubiosData = await getKubiosData(token);
  console.log('Kubios data fetched on button click:', kubiosData);
  renderKubiosData(kubiosData.results);
});
