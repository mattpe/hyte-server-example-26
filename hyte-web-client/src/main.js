import './style.css';
import {fetchData} from './fetch';
import {setLoggedOut, testToken, user} from './state';

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
