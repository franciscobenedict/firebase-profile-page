import React, {
} from 'react';
import { Link } from "react-router-dom";
import { useUser } from 'reactfire';
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';
import Logout from './Logout';
import Modali, { useModali } from 'modali';
import fbLogo from '../assets/fb-logo-white-header.svg';

const Navigation = () => {
  const currentUser = useUser();
  const [loginModal, toggleLoginModal] = useModali({
    title: 'Login',
    animated: true
  });
  const [signupModal, toggleSignupModal] = useModali({
    title: 'Sign up',
    animated: true
  });

  return (
    <header className="header">
      <a className="fbLogo" href="http://www.franciscobenedict.com" rel="noopener noreferrer" target="_blank"><img src={fbLogo} alt="" /></a>
      <a className="" href="http://www.react.franciscobenedict.com/" rel="noopener noreferrer">Home</a>
      <a className="" href="https://github.com/franciscobenedict/firebase-profile-page" rel="noopener noreferrer" target="_blank">Github</a>
      {
        currentUser &&
        <>
          <Link to="/">Landing</Link>
          <Link to="/profile">Profile</Link>
          <Logout />
        </>
      }

      {
        !currentUser &&
        <>
          <Link to="" onClick={toggleLoginModal}>Login</Link>
          <Link to="" onClick={toggleSignupModal}>Sign up</Link>

          <Modali.Modal {...loginModal}>
            <LoginModal />
          </Modali.Modal>

          <Modali.Modal {...signupModal}>
            <SignupModal />
          </Modali.Modal>
        </>
      }
    </header>
  );
}

export default Navigation;
