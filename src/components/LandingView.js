import React, {
  useState,
  useEffect,
} from 'react';
import Layout from './partials/Layout';

const LandingView = () => {
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    setPageTitle('User profile app');
  }, [pageTitle]);

  const [toggleTechUsed, setToggleTechUsed] = useState(false);

  return (
    <Layout title={pageTitle} description="This is the Firebase authentication Login app">
      <div className="opaque_bg">
        <h1>{pageTitle}</h1>
        <p>This app shows a user's profile allowing changes to be made to:</p>
        <ul>
          <li>Username</li>
          <li>Password</li>
          <li>Profile image</li>
        </ul>

        <p>User's will need to be logged in either with their email or their Google account to be able to see their profile and make changes.</p>

        <div className="profile_buttons_container">
          <button className="button submit_btn form_button" onClick={() => setToggleTechUsed(!toggleTechUsed)}>Technology used</button>
        </div>

        {
          toggleTechUsed &&
          <ul>
            <li>react</li>
            <li>javascript</li>
            <li>firebase</li>
            <li>firebase-authentication</li>
            <li>firebase-storage </li>
            <li>firebase-realtime-database</li>
            <li>scss</li>
            <li>css3</li>
          </ul>
        }
      </div>
  </Layout>
  )
}

export default LandingView;
