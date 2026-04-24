import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import './App.css';

function Profile()
{
  return(
    <div className="container">
      <marquee loop="5"><h1></h1>Welcome to my profile</marquee>
      <h1>VANSH SOIN</h1>
      <h2>Full Stack Developer</h2>
      <p>Passionate about building web applications and creating amazing user experiences</p>
    </div>
  );
}

function Dashboard(){
  return (
    <div className="container">
      <h1>Skills</h1>
      <h2>HTML</h2>
      <h3>CSS</h3>
      <h3>JavaScript</h3>
      <h3>React</h3>
    </div>
  );
}

function App(){
  return (
    <BrowserRouter>
      <div className="nav-bar">
        <Link to="/profile">Profile</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
      <Routes>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;