import React, { useState } from 'react';
import AddUser from './components/AddUser';
import UpdateUser from './components/UpdateUser';
import UserList from './components/UserList';
import './styles/App.css';

const App = () => {
  const [editingUser, setEditingUser] = useState(null);

  return (
    <div>
      <h1>CRUD App with MongoDB</h1>
      {editingUser ? (
        <UpdateUser
          user={editingUser}
          onUpdateComplete={() => setEditingUser(null)}
        />
      ) : (
        <AddUser onUserAdded={() => setEditingUser(null)} />
      )}
      <UserList onEdit={(user) => setEditingUser(user)} />
    </div>
  );
};

export default App;
