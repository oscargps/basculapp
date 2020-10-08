import React from 'react';
import Navbar from './components/navbar'
import Dashboard from './pages/dashboard'
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Dashboard/>
    </div>
  );
}

export default App;
