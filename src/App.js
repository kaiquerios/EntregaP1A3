import React, { useState } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar/index';
import ModalEditUser from './components/layout/ModalEditUser/index';

function App() {

  const [showEditUser, setShowEditUser] = useState(false);

  return (
    <div className="App">
      <Navbar onEditUser={() => setShowEditUser(true)} />

      {showEditUser && (
        <ModalEditUser onClose={() => setShowEditUser(false)} />
      )}

    </div>
  );
}

export default App;