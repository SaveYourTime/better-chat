import styles from '../../styles/ChatRoom.module.css';

export default function Message({ message }) {
  const { text, username, photoURL, createdAt } = message;
  return (
    <div className="comment" data-testid="message">
      <div className="avatar">
        <img
          src={photoURL || 'https://semantic-ui.com/images/avatar/small/christian.jpg'}
          alt="user avatar"
        />
      </div>
      <div className="content">
        <div>
          <span className="author">{username}</span>
          <div className="metadata">
            <div className="date">{createdAt?.toDate().toLocaleString('zh-TW')}</div>
          </div>
        </div>
        <div className={`text ${styles.message}`}>{text}</div>
      </div>
    </div>
  );
}
