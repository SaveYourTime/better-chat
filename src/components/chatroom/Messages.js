import styles from '../../styles/ChatRoom.module.css';
import Message from './Message';

export default function Messages() {
  const message = { text: 'Hi there!', username: 'Aaron Lu', createdAt: new Date() };
  return (
    <main className={`ui comments ${styles.messages}`}>
      <Message message={message} />
    </main>
  );
}
