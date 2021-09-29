import React, { useState } from 'react';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { storageService, dbService } from 'fbase';
import { v4 as uuidv4 } from 'uuid';
import { addDoc, collection } from 'firebase/firestore';

const NweetFactory = ({ userObj }) => {
  const [attachment, setAttachment] = useState('');
  const [nweet, setNweet] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let attachmentUrl = '';
      if (attachment !== '') {
        const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        const uploadFile = await uploadString(fileRef, attachment, 'data_url');
        attachmentUrl = await getDownloadURL(uploadFile.ref);
      }

      await addDoc(collection(dbService, 'nweets'), {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentUrl,
      });
      setNweet('');
      setAttachment('');
    } catch (error) {
      console.log(error.message);
    }
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment('');

  return (
    <form onSubmit={onSubmit}>
      <input
        value={nweet}
        onChange={onChange}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Nweet" />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" alt="" />
          <button type="button" onClick={onClearAttachment}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default NweetFactory;
