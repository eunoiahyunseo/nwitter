/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Navigation = ({ userObj }) => (
  <nav>
    <ul
      style={{
        display: 'flex',
        justifyContent: 'Center',
        marginTop: 50,
      }}
    >
      <li key="Home">
        <Link to="/" style={{ marginRight: 10 }}>
          <FontAwesomeIcon icon={faTwitter} color="#04AAFF" size="2x" />
        </Link>
      </li>
      <li key="Profile">
        <Link
          to="/profile"
          style={{
            marginLeft: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: 12,
          }}
        >
          <FontAwesomeIcon icon={faUser} color="#04AAFF" size="2x" />
          <span>
            {userObj.displayName
              ? `${userObj.displayName}의 Profile`
              : 'Profile'}
          </span>
        </Link>
      </li>
    </ul>
  </nav>
);
export default Navigation;
