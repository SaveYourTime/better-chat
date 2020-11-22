import firebase from 'firebase/app';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import styles from '../../styles/ChatRoom.module.css';
import Message from './Message';

const db = firebase.firestore();

export default function Messages() {
  const anchorRef = useRef();
  const cursorRef = useRef();
  const messagesRef = db.collection('messages');
  const query = messagesRef.orderBy('createdAt').limitToLast(30);
  const [querySnapshot] = useCollection(query);
  const [messages, setMessages] = useState([]);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [isLoadingPrevious, setIsLoadingPrevious] = useState(false);

  useEffect(() => {
    const data =
      querySnapshot
        ?.docChanges()
        .filter((change) => ['added', 'modified'].includes(change.type))
        .map(({ doc }) => ({ id: doc.id, ...doc.data() }))
        .filter(({ createdAt }) => createdAt) ?? [];
    setMessages((prev) => [...prev, ...data]);
  }, [querySnapshot]);

  useEffect(() => {
    anchorRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadPrevious = useCallback(
    (cursor) => messagesRef.orderBy('createdAt').endBefore(cursor[0]).limitToLast(30).get(),
    [messagesRef],
  );

  useEffect(() => {
    if (cursorRef.current === undefined && querySnapshot) {
      loadPrevious(querySnapshot.docs).then((data) => {
        if (!data.empty) {
          cursorRef.current = querySnapshot;
          setHasPrevious(true);
        } else {
          cursorRef.current = null;
        }
      });
    }
  }, [querySnapshot, loadPrevious]);

  const handleLoadPrevious = async () => {
    setIsLoadingPrevious(true);
    const data = await loadPrevious(cursorRef.current.docs);
    if (!data.empty) {
      const previousMessages = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages((prev) => [...previousMessages, ...prev]);

      const noMore = (await loadPrevious(data.docs)).empty;
      if (noMore) {
        setHasPrevious(false);
      } else {
        cursorRef.current = data;
      }
    }
    setIsLoadingPrevious(false);
  };

  return (
    <main className={`ui comments ${styles.messages}`}>
      <button
        type="button"
        className={`ui button ${styles.loadPreviousButton} ${isLoadingPrevious ? 'loading' : ''} ${
          hasPrevious ? '' : styles.hidden
        }`}
        onClick={handleLoadPrevious}
        disabled={isLoadingPrevious}
      >
        Load Previous
      </button>
      {messages?.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <span ref={anchorRef} />
    </main>
  );
}
