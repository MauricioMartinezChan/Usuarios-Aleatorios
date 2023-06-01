import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api/?results=6');
      setUsers(response.data.results.map((user) => ({ ...user, id: user.login.uuid })));
    } catch (error) {
      console.error(error);
    }
  };

  const addUser = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api/');
      const newUser = {
        id: response.data.results[0].login.uuid,
        name: response.data.results[0].name,
        email: response.data.results[0].email,
        picture: response.data.results[0].picture,
      };
      setUsers([...users, newUser]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const readUser = (userId) => {
    const user = users.find(user => user.id === userId);
    setSelectedUser(user);
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  };

  return (
    <div className="container">
      <h1>Usuarios Aleatorios</h1>
      {isVisible && selectedUser && (
        <div className="selected-user">
          <h2>Usuario Seleccionado</h2>
          <img src={selectedUser.picture.large} alt={selectedUser.name.first} className="user-image" />
          <div className="user-details">
            <h3>{`${selectedUser.name.first} ${selectedUser.name.last}`}</h3>
            <p>{selectedUser.email}</p>
          </div>
        </div>
      )}
      <button onClick={addUser} className="add-button">Añadir Usuario</button>
      <div className="card-container">
        {users.map((user) => (
          <div className="card" key={user.id}>
            <img src={user.picture.large} alt={user.name.first} className="user-image" />
            <div className="user-details">
              <h3>{`${user.name.first} ${user.name.last}`}</h3>
              <p>{user.email}</p>
            </div>
            <div className="button-container">
              <button onClick={() => deleteUser(user.id)} className="delete-button">Eliminar</button>
              <button onClick={() => readUser(user.id)} className="read-button">Ver Usuario</button>
            </div>
          </div>
        ))}
      </div>
      <div className="author">Martinez Chan Mauricio</div>
    </div>
  );
}

export default App;
