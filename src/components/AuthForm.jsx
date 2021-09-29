import React, { useState } from 'react';
import { authService, createUser, SigninUser } from 'fbase';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await createUser(authService, email, password);
      } else {
        /* eslint-disable-next-line */
        data = await SigninUser(authService, email, password); // login auto
      }
    } catch (error_) {
      setError(error_.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email || ''}
          key="1"
        />
        <input
          onChange={onChange}
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password || ''}
          key="2"
        />
        <input
          type="submit"
          value={newAccount ? 'Create Account' : 'Log In'}
          key="3"
        />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? 'Sign In' : 'Create Account'}
      </span>
    </>
  );
};

export default AuthForm;
