import { Button, TextField, Card, CardContent } from '@mui/material'
import React from 'react'
import './App.css'

function App() {
  return (
    <div className="app-root">
      <div className="app-card">
        <h1 className="app-title">Material UI Component</h1>

        <TextField
          className="app-input"
          fullWidth
          label="Enter Text"
        />
        <Button className="app-button" fullWidth variant="contained">SUBMIT</Button>
      </div>
    </div>
  );
}

export default App;
