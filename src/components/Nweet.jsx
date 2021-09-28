// eslint-disable-next-line object-curly-newline
import { deleteDoc, doc, getFirestore, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { storageService } from 'fbase';
import { ref, deleteObject } from 'firebase/storage';

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick = async () => {
    // eslint-disable-next-line no-alert
    const ok = window.confirm('삭제하시겠습니까?');
    if (ok) {
      await deleteDoc(doc(getFirestore(), `nweets/${nweetObj.id}`));
      if (nweetObj.attachmentUrl !== '') {
        await deleteObject(ref(storageService, nweetObj.attachmentUrl));
      }
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(doc(getFirestore(), `nweets/${nweetObj.id}`), {
      text: newNweet,
    });
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input onChange={onChange} value={newNweet} required />
            <input type="submit" value="Update Nweet" />
          </form>
          <button type="button" onClick={toggleEditing}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img
              src={nweetObj.attachmentUrl}
              width="50px"
              height="50px"
              alt=""
            />
          )}
          {isOwner && (
            <>
              <button type="button" onClick={onDeleteClick}>
                Delete Nweet
              </button>

              <button type="button" onClick={toggleEditing}>
                Edit Nweet
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
