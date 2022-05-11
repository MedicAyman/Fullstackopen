import React from "react";
export function LoginForm({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          name="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        password
        <input
          type="text"
          name="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">submit</button>
    </form>
  );
}
