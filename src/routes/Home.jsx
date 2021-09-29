import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
/* eslint-disable-next-line */
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import Nweet from 'components/Nweet';

import NweetFactory from 'components/NweetFactory';

const Home = ({ userObj }) => {
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
    return () => {
      console.log('deleted Home_Component');
    };
  }, []);

  return (
    <div>
      <NweetFactory userObj={userObj} />
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
