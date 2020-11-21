import firebase from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import Auth from '../components/auth/Auth';
import Loading from '../components/shared/Loading';
import ChatRoom from '../components/chatroom/ChatRoom';

const auth = firebase.auth();

export default function Home() {
  const [user, loading] = useAuthState(auth);
  if (loading) return <Loading />;
  return user ? <ChatRoom /> : <Auth />;
}
