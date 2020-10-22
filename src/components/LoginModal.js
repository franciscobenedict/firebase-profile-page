import React, {
  useState,
} from 'react';
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth';
import {
  withRouter,
} from 'react-router';
import { Link } from 'react-router-dom';

const LoginModal = ({ history }) => {
  // User State
  const [user, setUser] = useState({
    email: '',
    password: '',
    error: '',
  });
  const [loginModal, setLoginModal] = useState(true);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [error, setError] = useState("");

  // onChange function
  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      error: '',
    })
  };

  const [email, setEmail] = useState("");

  // Import firebase
  const firebase = useFirebaseApp();

  // Submit function (Log in user)
  const handleSubmit = e => {
    e.preventDefault();
    // Log in code here.
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      // .setPersistence(result)
      .then(result => {
        if (!result.user.emailVerified) {
          setUser({
            ...user,
            error: 'Please verify your email before you continue',
          })
          firebase.auth().signOut();
          sessionStorage.clear();
          setTimeout(() => {
            window.location.href="/emailnotverification";
          }, 0);
        }

        if (result) {
          sessionStorage.setItem('result.user', JSON.stringify(result.user));
          // history.push('/profile');
          window.location.href="/profile"
        }
      })
      .catch(error => {
        // Update the error
        setUser({
          ...user,
          error: error.message,
        })
      },[history])
  }

  // signInWithGoogle
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          // history.push('/profile');
          window.location.href="/profile";
        })
        .catch(error => {
          // Update the error
          setUser({
            ...user,
            error: error.message,
          })
        },[history])
      })
  }

  const handleForgotPasswordSubmit = e => {
    e.preventDefault();
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmail('');
      })
      .catch(error => {
        setError({ error });
      });
  }
  const switchToForgotPasswordView = () => {
    setLoginModal(false);
    setForgotPasswordModal(true);
  }
  const switchToLoginView = () => {
    setForgotPasswordModal(false);
    setLoginModal(true);
  }

  const isInvalid = email === '';

  return (
    <>
      {
        loginModal &&
        <form onSubmit={handleSubmit}>
          {/* Email login */}
          <div className="modali-subheading">Login with your email address</div>
          <input type="text" placeholder="Email" name="email" onChange={handleChange}/><br />
          <input type="password" placeholder="Password" name="password" onChange={handleChange}/><br />
          <button type="submit" onClick={handleSubmit} className="button submit_btn form_button">Log in</button>

          <hr />

          <Link to="" className="white_text" onClick={switchToForgotPasswordView}>Forgot password?</Link>

          <hr />

          {/* Google login button */}
          <div className="modali-subheading">Login with your email address</div>
          <button onClick={() => signInWithGoogle()} className="button form_button flex_align_center" type="button">
            <div className="button_text flex_align_center">
              <span className="aligned_element">Login With Google</span>
            </div>
            <span className="button_divider"></span>
            <div className="button_image flex_align_center">
              <img className="googleBtn aligned_element"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="logo"
              />
            </div>
          </button>

          {user.error && <p className="error">{user.error}</p>}
        </form>
      }
      {
        forgotPasswordModal &&
        <form onSubmit={handleForgotPasswordSubmit}>
          <div className="modali-subheading">Did you forget your password?</div>
          <input
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="text"
            placeholder="Email Address"
            autocomplete="off"
          />
          <button disabled={isInvalid} type="submit" className="button submit_btn form_button">
            Request Password change
          </button>

          <hr />

          <Link to="" className="white_text" onClick={switchToLoginView}>Return to login modal</Link>

          {error && <p className="error">{error}</p>}
        </form>
      }
      <div className="modali-footer"></div>
    </>
  )
};

export default withRouter(LoginModal);
