import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const [searchText, setSearchText] = useState("");
  const [displayText, setDisplayText] = useState("Hello World");

  const handleSearch = (e) => {
    e.preventDefault();
    setDisplayText(searchText);
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          background-color: #f8f9fa;
        }

        .navbar {
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        .main-content {
          padding-top: 70px;
        }
      `}</style>

      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>

          <div className="collapse navbar-collapse show">
            <form className="d-flex ms-auto" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div className="main-content">
        <div className="container text-center">
          <h1>{displayText || "Hello World"}</h1>
        </div>
      </div>
    </>
  );
}

export default App;
