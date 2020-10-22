import React, {
  useState,
} from 'react';
import { useUser } from 'reactfire';
import {
  useFirebaseApp,
} from 'reactfire';
// import { storage } from "../store/base";
import 'firebase/auth';
import { withRouter } from 'react-router-dom';
// import UsersDB from './Users/exportUsersDB';

const ChangeProfileNameModal = ({history}) => {
  // const usersList = UsersDB(); console.log('usersList', usersList);
  const currentUser = useUser();
  //USER DETAILS
  let [
    userName,
    // userEmail
  ] = '';
  if (currentUser) {
    userName = currentUser.displayName ? currentUser.displayName : ``;
    // userEmail = currentUser.email ? currentUser.email : ``;
  }

  // Import firebase
  const firebase = useFirebaseApp();
  const [name, setName] = useState('');
  // const [disableNameSubmit, setDisableNameSubmit] = useState(true);
  const [error, setError] = useState('');
  const isInvalid = name === '';

  const handleUsernameChange = e => {
    e.preventDefault();



    const user = firebase.auth().currentUser;
    user.updateProfile({ displayName: name })
    .then(function() {
      // Update successful.
      window.location.href="/profile";
    }).catch(function(error) {
      // An error happened.
      setError(error.message);
    });

  }

  return (
    <>
      <div className="main">
        <div className="container">
          <div className="modali-subheading">You can change your profile name here.</div>
          <div className="user_details">
            <p>Current username: {userName}</p>
          </div>

          <form onSubmit={handleUsernameChange}>

            <input
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
              type="text"
              placeholder="New name"
              autoComplete="off"
            />

            <button disabled={isInvalid} className={`button submit_btn form_button ${isInvalid ? 'disabled' : ''}`}>Submit name</button>
          </form>

          {error && <p>{ error }</p>}
        </div>
      </div>
      <div className="modali-footer"></div>
    </>
  )
}

export default withRouter(ChangeProfileNameModal);
