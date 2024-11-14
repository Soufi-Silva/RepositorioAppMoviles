
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig'; 

export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};
