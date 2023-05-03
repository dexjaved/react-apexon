import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "apexon" && password === "apexon") {
      sessionStorage.setItem("loggedIn", "true");
      setLoggedIn(true);
    } else {
      alert("Invalid username or password");
    }
  };

  if (loggedIn) {
    return <Navigate to="/employeeList" />;
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="form">
        <div
          style={{
            alignSelf: "center",
            height: "150px",
            width: "150px",
            backgroundColor: "#77a99e",
            borderRadius: "50%",
            display: "inline-block"
          }}
        ></div>
        <h4 style={{ alignSelf: "center" }}>Sign in</h4>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Email"
          style={{ backgroundColor: "#eef3ff", border: "none", height: "20px" }}
        />

        <br />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={{ backgroundColor: "#eef3ff", border: "none", height: "20px" }}
        />

        <br />
        <button type="submit" className="login-btn">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
