import React from 'react';

const Register = () => (
  <div>
    <div>Register</div>
    <input placeholder="email address"/>
    <input placeholder="password"/>
    <input placeholder="island name"/>
    <input placeholder="villager name"/>
    <a href="/" onClick={() => { window.localStorage.setItem('logged-in', 'true'); }}>Create</a>
  </div>
);

export default Register;
