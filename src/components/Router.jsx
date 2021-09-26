/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */

import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Navigation from 'components/Navigation';
import Profile from 'routes/Profile';

const AppRouter = ({ isLoggedIn }) => (
  <Router>
    {isLoggedIn && <Navigation />}
    <Switch>
      {isLoggedIn ? (
        <>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
        </>
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
