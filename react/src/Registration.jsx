import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const checkLogin = (event) => {
    event.preventDefault();
    const user = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    axios
      .post('/users', user)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 0) {
          setMsg('');
          setError(res.data.debug_data);
        } else {
          setError('');
          setMsg(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="form">
      <h1>Registration Form</h1>
      <form onSubmit={checkLogin}>
        <p className="error">{error}</p>
        <div>
          <b>Enter Username:</b>
        </div>
        <input type="text" placeholder="enter username" name="username" />
        <br />
        <div>
          <b>Enter Password:</b>
        </div>
        <input type="password" placeholder="enter Password" name="password" />
        <br />
        <button type="submit">Submit</button>
      </form>
      <p className="msg">{msg}</p>
    </div>
  );
}
