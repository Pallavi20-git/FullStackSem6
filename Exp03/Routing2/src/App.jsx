import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';

function Profile()
{
  return(
    <div className="container">
      <h1>VANSH SOIN</h1>
      <h2>Full Stack Developer</h2>
    </div>
  );
}

function Dashboard(){
  return (
    <div className="container">
      <h1>Skills</h1>
      <h2>HTML</h2>
      <h3>CSS</h3>
    </div>
  );
}

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;