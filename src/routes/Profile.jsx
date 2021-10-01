/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable object-curly-newline */
/* eslint-disable import/no-unresolved */
import { authService, dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  doc as doc_,
  where,
  collection,
  query,
  orderBy,
  getDocs,
  updateDoc,
  getFirestore,
} from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { faList, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    if (userObj.displayName !== newDisplayName) {
      const displayName = userObj.displayName || 'Please Pick your name';
      const q = query(
        collection(dbService, 'nweets'),
        where('creatorName', '==', displayName),
      );
      const querySnapshot = await getDocs(q);

      const nweetArray = querySnapshot.docs.map(async (doc) => {
        await updateDoc(doc_(getFirestore(), `nweets/${doc.id}`), {
          creatorName: newDisplayName,
        });
      });

      await Promise.all(nweetArray);

      await updateProfile(userObj, {
        displayName: newDisplayName,
      });

      refreshUser();
    }
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          key="1"
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          key="2"
          className="formBtn"
        />
      </form>

      <div className="nweetProfileConfirm">
        <div className="nweetProfilediv1">
          <span className="nweetProfilespan">
            <FontAwesomeIcon icon={faList} color="#04aaff" />
          </span>
          {`${newDisplayName || '*Please pick your name*'}의 Nweet List`}
        </div>
        <br />
        <div className="nweetProfilediv2">
          <span className="nweetProfilespan2">
            <FontAwesomeIcon icon={faExclamation} color="red" />
          </span>
          If you don&apos;t log in with Google or GitHub, your profile name may
          not be displayed properly.
        </div>
      </div>

      {ownNweets.map((nweet) => (
        <div className="profileNweet">
          <h4>{nweet.docText}</h4>
          {nweet.docPictureUrl !== '' ? (
            <img src={nweet.docPictureUrl} heigh="50px" width="50px" alt=" " />
          ) : (
            ''
          )}
        </div>
      ))}

      <div className="outer_button">
        <button
          type="button"
          className="formBtn cancelBtn optional_btn"
          onClick={onLogOutClick}
          style={{
            display: 'inline-block',
            width: '320px',
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
};
export default Profile;
