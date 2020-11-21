import 'firebaseui/dist/firebaseui.css';
import { useEffect } from 'react';
import firebase from 'firebase/app';
import styles from '../../styles/Auth.module.css';

const uiConfig = {
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  signInFlow: 'popup',
};

export default function Auth() {
  useEffect(() => {
    import('firebaseui').then((firebaseui) => {
      const ui =
        firebaseui.auth.AuthUI.getInstance() ?? new firebaseui.auth.AuthUI(firebase.auth());
      ui.start('#firebaseui-auth-container', uiConfig);
    });
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className="ui active tiny modal">
        <div className="header">
          Welcome to <em>BetterChat</em>
        </div>
        <div className="content">
          <div className="ui header">Nice to meet you here!</div>
          <p>
            Ready to start your journey? <b>BetterChat</b> makes it easy to talk every day and hang
            out more often.
          </p>
        </div>
        <div className={styles.actions}>
          <div id="firebaseui-auth-container" />
        </div>
      </div>
    </div>
  );
}
