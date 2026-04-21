import React, { useState } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar/index';
import EditUser from './components/layout/EditUser/index';

function App() {
  const [showEditUser, setShowEditUser] = useState(true);
  
  return (
    <div className="App">
      <Navbar />
      {/* Conteudo aqui */}
      {showEditUser && (
        <EditUser onClose={() => setShowEditUser(false)} />
      )}
    </div>
  );
}

export default App;