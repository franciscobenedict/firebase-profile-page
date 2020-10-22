import React, {
  useState
} from 'react';
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth';
// import history from '../store/history';

const SignupModal = ({history}) => {
  // User State
  const [user, setUser] = useState({
    nickname: '',
    email: '',
    password: '',
    error: '',
  });

  const [ nickname, setNickname ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const isInvalid = email === '' || password === '';

  // onChange function
  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      error: '',
    })
  };

  // Import firebase
  const firebase = useFirebaseApp();

  // Submit function (Create account)
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Sign up code here.
    await firebase.auth()
      .createUserWithEmailAndPassword(
        // user.nickname,
        user.email,
        user.password
      )
      .then(result => {
        // Update the nickname
        result.user.updateProfile({
          displayName: user.nickname,
        });

        // URL of my website.
        const myURL = { url: 'http://www.profilepage.franciscobenedict.com/' }

        // Send Email Verification and redirect to my website.
        result.user.sendEmailVerification(myURL)
          .then(() => {
            setUser({
              ...user,
              verifyEmail: `Welcome ${user.nickname}. To continue please verify your email.`,
            })

            if (result.user) {
              console.log('result.user, new user added');
              if (result.user.emailVerified === false) {
                console.log('result.user', result.user);
                // history.push('/emailverification');

                // Sign Out the user.
                firebase.auth().signOut();
                window.location.href="/emailverification";
              }
            }
          })
      }).catch(error => {
        // Update the error
        console.log(error);
        setUser({
          ...user,
          error: error.message,
        })
      });
  }

  // signInWithGoogle
  const handleGoogleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        // console.log(result);
        // history.push('/profile');
        window.location.href="/profile";
        // Auth.setLoggedIn(true);
      })
      .catch(error => {
        // Update the error
        console.log(error);
        setUser({
          ...user,
          error: error.message,
        })
      });
    })
  };

  /*
  const checkPassword = (event) => {
    console.log('const checkPassword');
    // Password must be at least 8 chars
    password.length >= 8 ? charNumberValid = true :  charNumberValid = false;

    // Password must contain at least 1 special char
    const patternConfirmPassword = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g;
    patternConfirmPassword.test(password) ? specialCharValid = true : specialCharValid = false;

    // Password must contain at least a capital letter
    const patternUppercaseValid = /[A-Z]/;
    patternUppercaseValid.test(password) ? uppercaseValid = true : uppercaseValid = false;

    // Password must contain at least a lowercase letter
    const patternLowercaseValid = /[a-z]/;
    patternLowercaseValid.test(password) ? lowercaseValid = true : lowercaseValid = false;

    // Password must contain at least a number
    const patternNumberValid = /[0-9]/;
    patternNumberValid.test(password) ? numberValid = true : numberValid = false;
    checkFormValidity();
  }
  const comparePasswordFunc = (event) => {
    password === confirmPassword && password !== '' && confirmPassword !== '' ? passwordMatch = true : passwordMatch = false;
    checkFormValidity();
  };
  const checkFormValidity = () => {
    charNumberValid &&
    specialCharValid &&
    passwordMatch &&
    numberValid &&
    uppercaseValid &&
    lowercaseValid
    ? checkValid = true : checkValid = false;
  }
  */

  return (
    <>
      <form onSubmit={handleSubmit}>{/* Email login */}
        <div className="modali-subheading">Sign up with your email address</div>
        <input
          type="text"
          placeholder="Nickname"
          name="nickname"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          onBlur={handleChange}
        /> <br />
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={handleChange}
        /> <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onBlur={handleChange}
        /> <br />
        {/*<input type="password" placeholder="Password" name="password" onChange={handleChange} onBlur={checkPassword()}/><br />
        <input type="password" placeholder="Confimrm assword" name="confirmpassword" onBlur={comparePasswordFunc()}/><br />*/}
        <button disabled={isInvalid} type="submit" className="button submit_btn form_button">Sign up</button>

        {user.error && <p className="error">{user.error}</p>}

        {/* Password validation */}
        {/*<div className="form_password_validation">
          <div className="password_validation_title">
            <span>Password validation</span>
          </div>
          <div className="validation">
            <div className="validator flex_align_center">
              <span className="validation-item aligned_element">Must be at least 8 characters: {charNumberValid ? 'YES' : 'NO'}</span>
            </div>
            <div className="validator flex_align_center">
              <span className="validation-item aligned_element">Passwords must match: {passwordMatch ? 'YES' : 'NO'}</span>
            </div>
            <div className="validator flex_align_center">
              <span className="validation-item aligned_element">At least 1 special character from @#$%&: {specialCharValid ? 'YES' : 'NO'}</span>
            </div>
            <div className="validator flex_align_center">
              <span className="validation-item aligned_element">At least 1 number: {numberValid ? 'YES' : 'NO'}</span>
            </div>
            <div className="validator flex_align_center">
              <span className="validation-item aligned_element">At least 1 uppercase: {uppercaseValid ? 'YES' : 'NO'}</span>
            </div>
            <div className="validator flex_align_center">
              <span className="validation-item aligned_element">At least 1 lowercase: {lowercaseValid ? 'YES' : 'NO'}</span>
            </div>
          </div>
        </div>
        */}

        <hr />

        {/* Google register button */}
        <div className="modali-subheading">Sign up with your Google account</div>
        <button onClick={() => handleGoogleLogin()} className="button form_button flex_align_center" type="button">
          <div className="button_text flex_align_center">
            <span className="aligned_element">Register With Google</span>
          </div>
          <span className="button_divider"></span>
          <div className="button_image flex_align_center">
            <img className="googleBtn aligned_element"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="logo"
            />
          </div>
        </button>
      </form>
      <div className="modali-footer"></div>
    </>
  )
};

export default SignupModal;
