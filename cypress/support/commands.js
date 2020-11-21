import firebase from 'firebase/app';
import 'firebase/auth';
import { attachCustomCommands } from 'cypress-firebase';
import firebaseConfig from '../../src/constants/firebase-config.json';

firebase.initializeApp(firebaseConfig);

attachCustomCommands({ Cypress, cy, firebase });
