import { useState } from "react";

function App() {

  const [theme, setTheme] = useState("light");

  const styles = {
    backgroundColor: theme === "light" ? "#ffffff" : "#121212",
    color: theme === "light" ? "#000000" : "#ffffff",
    height: "100vh",
    width: "100vw",
    padding: "20px",
    transition: "all 0.3s ease",
  };

  const buttonStyles = {
    padding: "10px 16px",
    cursor: "pointer",
    border: "none",
    borderRadius: "6px",
    backgroundColor: theme === "light" ? "#000000" : "#ffffff",
    color: theme === "light" ? "#ffffff" : "#000000",
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div style={styles}>
      <h1>Theme Toggle SPA</h1>
      <p>Current Theme: {theme}</p>

      <button onClick={toggleTheme} style={buttonStyles}>
        Toggle Theme
      </button>
    </div>
  );
}

export default App;
