import { useState } from 'react';
import firebase from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function MessageInput() {
  const [text, setText] = useState('');
  const [user] = useAuthState(firebase.auth());

  const sendMessage = (e) => {
    e.preventDefault();
    if (!text) return;
    firebase.firestore().collection('messages').add({
      text,
      uid: user.uid,
      username: user.displayName,
      photoURL: user.photoURL,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setText('');
  };

  const handleMessageChange = (e) => setText(e.target.value);

  return (
    <footer className="ui fluid vertical menu">
      <form className="item" onSubmit={sendMessage}>
        <div className="ui action input">
          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={handleMessageChange}
            data-testid="message-input"
          />
          <button type="submit" className="ui icon secondary button" disabled={!text}>
            <i className="paper plane icon" />
          </button>
        </div>
      </form>
    </footer>
  );
}
