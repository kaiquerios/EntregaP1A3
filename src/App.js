import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar/index';
import EditUser from './pages/editUser/index';

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* Conteudo aqui */}
      <EditUser />
    </div>
  );
}

export default App;