/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */

import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Navigation from 'components/Navigation';
import Profile from 'routes/Profile';

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => (
  <Router>
    {isLoggedIn && <Navigation userObj={userObj} />}
    <Switch>
      {isLoggedIn ? (
        <div
          style={{
            width: '100%',
            maxWidth: 890,
            display: 'flex',
            margin: '0 auto',
            marginTop: '80px',
            justifyContent: 'center',
          }}
        >
          <Route exact path="/">
            <Home userObj={userObj} />
          </Route>
          <Route exact path="/profile">
            <Profile userObj={userObj} refreshUser={refreshUser} />
          </Route>
        </div>
      ) : (
        <>
          <Route exact path="/">
            <Auth />
          </Route>
          {/* <Redirect from="*" to="/" /> */}
        </>
      )}
    </Switch>
  </Router>
);

export default AppRouter;
