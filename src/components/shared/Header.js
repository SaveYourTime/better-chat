import firebase from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from '../../styles/Header.module.css';

export default function Header() {
  const [user] = useAuthState(firebase.auth());
  const { displayName, email, photoURL } = user ?? {};
  return (
    <header className="ui borderless menu">
      <div className="item">
        <h2 className="ui header">
          <i className="comments outline icon" />
          <div className={`content ${styles.brand}`}>BetterChat</div>
        </h2>
      </div>
      <div className="right menu">
        <div className="ui simple dropdown item">
          <img
            className="ui mini circular image"
            src={photoURL || 'https://semantic-ui.com/images/avatar/small/christian.jpg'}
            alt="user avatar"
          />
          <div className={`content ${styles.username}`}>
            <div className="ui sub header">{displayName}</div>
            <div data-testid="email">{email}</div>
          </div>
          <div className="menu">
            <div className="item" onClick={() => firebase.auth().signOut()} data-testid="logout">
              <i className="logout icon" />
              Logout
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
