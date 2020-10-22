import React from 'react';
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth';
// import history from '../store/history';

const Logout = ({history}) => {
  // Import firebase
  const firebase = useFirebaseApp();

  // Log out function
  const handleClick = () => {
    firebase.auth().signOut();
    sessionStorage.clear();
    // app.auth().signOut()
    // history.push('/');
    window.location.href="/";
  }

  return (
    <>
      <button type="button" onClick={handleClick}>Log Out</button>
    </>
  )
};

export default Logout;
