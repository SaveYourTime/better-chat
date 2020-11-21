import firebase from 'firebase/app';
import { useState, useEffect, useRef } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import styles from '../../styles/ChatRoom.module.css';
import Message from './Message';

const db = firebase.firestore();

export default function Messages() {
  const anchorRef = useRef();
  const messagesRef = db.collection('messages');
  const query = messagesRef.orderBy('createdAt').limitToLast(30);
  const [querySnapshot] = useCollection(query);
  const [messages, setMessages] = useState([]);

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

  return (
    <main className={`ui comments ${styles.messages}`}>
      {messages?.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <span ref={anchorRef} />
    </main>
  );
}
