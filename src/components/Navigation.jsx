/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ userObj }) => (
  <nav>
    <ul>
      <li key="Home">
        <Link to="/">Home</Link>
      </li>
      <li key="Profile">
        <Link to="/profile">{userObj.displayName}의 Profile</Link>
      </li>
    </ul>
  </nav>
);
export default Navigation;
