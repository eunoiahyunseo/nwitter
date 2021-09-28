import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
/* eslint-disable-next-line */
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';
import Nweet from 'components/Nweet';

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    const q = query(
      collection(dbService, 'nweets'),
      orderBy('createdAt', 'desc'),
    );
    onSnapshot(q, (snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(dbService, 'nweets'), {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
      setNweet('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((eachNweet) => (
          <Nweet
            key={eachNweet.id}
            nweetObj={eachNweet}
            isOwner={eachNweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
