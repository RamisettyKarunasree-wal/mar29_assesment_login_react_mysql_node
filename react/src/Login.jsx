import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [login, setLogin] = useState(false);
  const [error, setError] = useState('');
  const [loggedUser, setLoggedUser] = useState({});
  const [show, setShow] = useState(false);
  const getDetails = () => {
    setShow(true);
    axios
      .get('/users/loggedUser')
      .then((res) => {
        console.log(res.data);
        setLoggedUser(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const checkLogin = (event) => {
    event.preventDefault();
    setShow(false);
    axios
      .get(
        `/users/${event.target.username.value}/${event.target.password.value}`
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 1) {
          setLogin(true);
          setError('');
        } else {
          setLogin(false);
          setError(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container">
      <div className="form">
        <h1>Login Form</h1>
        <p className="error">{error}</p>
        <form onSubmit={checkLogin}>
          <div>
            <b>Enter Username:</b>
          </div>
          <input
            type="text"
            placeholder="enter username"
            name="username"
            required
          />
          <br />
          <div>
            <b>Enter Password:</b>
          </div>
          <input
            type="password"
            placeholder="enter Password"
            name="password"
            required
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
      {login ? (
        <div className="details">
          <button type="button" onClick={getDetails}>
            view User Details
          </button>
          {show ? (
            <div className="user">
              <p><b>User Name:</b> {loggedUser.username}</p>
              <p><b>Password:</b> {loggedUser.password}</p>
              <p><b>Date Of Creation:</b> {loggedUser.date_of_creation}</p>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
