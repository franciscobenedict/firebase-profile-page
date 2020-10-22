import React, {
  useState,
  useEffect,
} from 'react';

const LandingView = () => {
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    setPageTitle('User profile app');
  }, [pageTitle]);

  return (
    <main>
      <h1>{pageTitle}</h1>
      <p>This app shows a user's profile allowing changes to be made to:</p>
      <ul>
        <li>Username</li>
        <li>Password</li>
        <li>Profile image</li>
      </ul>

      <p>User's will need to be logged in either with their email or their Google account to be able to see their profile and make changes.</p>
    </main>
  )
}

export default LandingView;
