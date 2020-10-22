import React, {
  useState,
  // useEffect
} from 'react';
import {
  useFirebaseApp,
  // useUser
} from 'reactfire';
import 'firebase/auth';
import { withRouter } from 'react-router-dom';
// import Layout from './Layout';
// import LoadingOverlay from './LoadingOverlay';

const ChangePasswordModal = ({history}) => {
  // Import firebase
  const firebase = useFirebaseApp();
  // const currentUser = useUser();
  // console.log('currentUser', currentUser);
  const [ passwordOne, setPasswordOne ] = useState('');
  const [ passwordTwo, setPasswordTwo ] = useState('');
  const [ errors, setErrors ] = useState('');
  const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

  const handlePasswordChange = e => {
    e.preventDefault();
    const user = firebase.auth().currentUser;
    user.updatePassword(passwordOne)
      .then(() => {
        setPasswordOne('');
        setPasswordTwo('');
        window.location.href="/profile";
      })
      .catch(error => {
        setErrors(error.message);
      });
  }

  return (
    <>
      <div className="main">
        <div className="container">
          <div className="modali-subheading">You can change your password here.</div>

          <form onSubmit={handlePasswordChange}>
            <input
              name="passwordOne"
              value={passwordOne}
              onChange={e => setPasswordOne(e.target.value)}
              type="password"
              placeholder="New Password"
              autoComplete="off"
            />
            <input
              name="passwordTwo"
              value={passwordTwo}
              onChange={e => setPasswordTwo(e.target.value)}
              type="password"
              placeholder="Confirm New Password"
              autoComplete="off"
            />
            <button disabled={isInvalid} type="submit" className={`button submit_btn form_button ${isInvalid ? 'disabled' : ''}`}>
              Reset My Password
            </button>
          </form>

          {errors && <p>{errors}</p>}
        </div>
      </div>
      <div className="modali-footer"></div>
    </>
  )
}

export default withRouter(ChangePasswordModal);
