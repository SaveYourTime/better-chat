import styles from '../../styles/ChatRoom.module.css';
import Header from '../shared/Header';
import Messages from './Messages';
import MessageInput from './MessageInput';

export default function ChatRoom() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Messages />
      <MessageInput />
    </div>
  );
}
