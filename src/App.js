import React, { useState } from 'react';
import './App.css';
<<<<<<< HEAD
import HomePage from './pages/home/index';

=======
import Navbar from './components/layout/Navbar/index';
import EditUser from './components/layout/ModalEditUser/index';
>>>>>>> editUser

function App() {
  const [showEditUser, setShowEditUser] = useState(true);
  
  return (
    <div className="App">
<<<<<<< HEAD
      <HomePage/>
=======
      <Navbar />
      {/* Conteudo aqui */}
      {showEditUser && (
        <EditUser onClose={() => setShowEditUser(false)} />
      )}
>>>>>>> editUser
    </div>
  );
}

export default App;