/* eslint-disable object-curly-newline */
/* eslint-disable import/no-unresolved */
import { authService, dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { where, collection, query, orderBy, getDocs } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

const Profile = ({ refreshUser, userObj }) => {
  const [ownNweets, setOwnNweets] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push('/');
  };

  const getMyNweets = async () => {
    const q = query(
      collection(dbService, 'nweets'),
      where('creatorId', '==', userObj.uid),
      orderBy('createdAt', 'asc'),
    );
    const querySnapshot = await getDocs(q);
    let newArr = [];
    querySnapshot.forEach((doc) => {
      const newObj = [
        {
          docPictureUrl: doc.data().attachmentUrl,
          docText: doc.data().text,
        },
      ];
      newArr = [...newArr, ...newObj];
    });
    setOwnNweets(newArr);
  };
  // after the profile component rendering ( componentDidMount )
  useEffect(() => {
    getMyNweets();
    return () => {
      console.log('컴포넌트에서 사라짐');
    };
  }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayname !== newDisplayName) {
      await updateProfile(userObj, {
        displayName: newDisplayName, // have to rerendering Navigation Component
      });
      refreshUser();
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          key="1"
        />
        <input type="submit" value="Update Profile" key="2" />
      </form>
      {ownNweets.map((nweet) => (
        <>
          <h4>{nweet.docText}</h4>
          {nweet.docPictureUrl !== '' ? (
            <img src={nweet.docPictureUrl} heigh="50px" width="50px" alt=" " />
          ) : (
            <h1>Has No Picture</h1>
          )}
        </>
      ))}
      <button type="button" onClick={onLogOutClick}>
        Log Out
      </button>
    </>
  );
};
export default Profile;
