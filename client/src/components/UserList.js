import React, { useEffect, useState } from 'react';
import { deleteUser, getUsers } from '../api/api';
import '../styles/UserList.css';

const UserList = ({ onEdit }) => {
  const [users, setUsers] = useState([]); 
  

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data); 
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  
  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email} - {user.age}{' '}
            <button onClick={() => onEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
