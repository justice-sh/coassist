import firebase from 'firebase';
import 'firebase/auth';

export const googleSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .catch((e) => console.log(e));
};

export const signOut = () => firebase.auth().signOut();
