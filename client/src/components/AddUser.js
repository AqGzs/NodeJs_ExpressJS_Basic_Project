import React, { useState } from 'react';
import { createUser } from '../api/api';
import '../styles/AddUser.css';

const AddUser = ({ onUserAdded }) => {
  const [form, setForm] = useState({ name: '', email: '', age: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(form);
    onUserAdded();
    setForm({ name: '', email: '', age: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add User</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddUser;
