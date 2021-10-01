/* eslint-disable jsx-a11y/no-autofocus */
// eslint-disable-next-line object-curly-newline
import { deleteDoc, doc, getFirestore, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { storageService } from 'fbase';
import { ref, deleteObject } from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const Nweet = ({ nweetObj, isOwner, userObj }) => {
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
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              onChange={onChange}
              value={newNweet || ''}
              required
              placeholder="Edit your nweet"
              autoFocus
              className="formInput"
            />
            <input type="submit" value="Update Nweet" className="formBtn" />
          </form>
          <button
            type="button"
            onClick={toggleEditing}
            className="formBtn cancelBtn"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <div className="nweetProfileName">{`By : ${nweetObj.creatorName}`}</div>
          <h4>{`${nweetObj.text}`}</h4>
          {nweetObj.attachmentUrl && (
            <img
              src={nweetObj.attachmentUrl}
              width="50px"
              height="50px"
              alt=""
            />
          )}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
