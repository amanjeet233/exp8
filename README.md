# exp8
# Full Project: JWT Protected Routes + React Login Form

This project contains two parts:
1. **Backend:** Node.js + Express.js JWT Protected Routes
2. **Frontend:** React Login Form with State Management

---

## Part 1: Backend - JWT Protected Routes

### Overview
This backend project secures certain routes using JWT tokens.

### Features
- Hardcoded demo user: `admin / password123`
- POST `/login` → issues JWT token on valid credentials
- `verifyToken` middleware → protects routes
- GET `/protected` and `/profile` → only accessible with valid token

### Setup & Run
1. Initialize sandbox and install dependencies:
```bash
npm init -y
npm install express jsonwebtoken body-parser
```
2. Copy `index.js` code into project folder.
3. Start server:
```bash
node index.js
```
- Output: `Server running on port 3000`

### Test using curl
- **Login to get token:**
```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}'
```
- **Access protected route:**
```bash
curl http://localhost:3000/protected \
  -H "Authorization: Bearer <JWT_TOKEN_HERE>"
```
- **Expected Responses:**
  - With valid token → `Welcome, admin! You have access.`
  - Without token → `Token required`
  - With invalid token → `Invalid or expired token`

### Notes
- Use `process.env.PORT || 4000` to avoid port conflicts.
- Keep secret keys secure in production.

---

## Part 2: Frontend - React Login Form with State Management

### Overview
This React component demonstrates a login form with basic state management using `useState`.

### Features
- Fields: `username` and `password`
- State updates in real-time as the user types
- Submit button logs username and password to console
- Validation: alerts if either field is empty

### React Component Example
```jsx
import React, { useState } from 'react';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Both fields are required');
      return;
    }
    setError('');
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
```

### Test Steps
1. Run React app (`npm start` or `yarn start`).
2. Type values in username and password fields. Observe console logs on submit.
3. Leave a field empty and submit → validation message appears.
4. Change values and submit again → state updates reflected in console.

### Notes
- `useState` manages input values locally in the component.
- Real-time updates happen via `onChange` handlers.
- Basic validation ensures no empty submissions.

---

## Combined Expected Outcome
1. Backend issues JWT token on login and protects routes.
2. React frontend login form captures user input, validates it, and logs data.
3. Together, you can integrate frontend form with backend JWT login for a full authentication flow.

---

### Quick Summary
| Part | Technology | Key Feature |
|------|-----------|------------|
| Backend | Node.js + Express + JWT | Secure protected routes, token verification |
| Frontend | React + useState | Login form, state management, validation, console logging |

This README provides a **complete guide** to setup, test, and understand both backend JWT routes and frontend React login form.
