import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';

function App() {
  const [init, setInit] = useState(false);
  // firebase에서 회원가입, 로그인을 마친 후 누이터에 데이터를 보내주어야 한다.

  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({ ...user });
        setUserObj(user);
      } else {
        setUserObj(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({ ...user });
    setUserObj(user);
  };

  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        'Initializing ... '
      )}
      <footer>
        &copy;
        {new Date().getFullYear()}
        Nwitter
      </footer>
    </>
  );
}

export default App;
