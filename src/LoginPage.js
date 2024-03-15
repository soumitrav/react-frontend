import React, { useState } from 'react';
import {Route, useNavigate} from 'react-router-dom';


function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic input validation
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    const response = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({ username: username, password:password }),
      });

      response.json().then((data) => {
				// Setting a data from api
				if(data.loggedIn === 'true') { // Redirect to home page or handle authentication token etc.
          setError('');
          console.log('Login successful!');
          navigate('/home?username='+username);
        } else {
          navigate('/');
        }
			})
    
  };

  return (
    <form onSubmit={handleSubmit} align="center">
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;