import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Registration from './Registration';
import Login from './Login';

function App() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="App">
      <BrowserRouter>
        <NavLink activeClassName="active" className="links" to="/registration">
          Registration
        </NavLink>
        <NavLink activeClassName="active" className="links" to="/login">
          Login
        </NavLink>
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
