import React, { useState } from 'react';
import { updateUser } from '../api/api';
import '../styles/UpdateUser.css';

const UpdateUser = ({ user, onUpdateComplete }) => {
  const [form, setForm] = useState(user);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(user._id, form);
    onUpdateComplete();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update User</h2>
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
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateUser;
