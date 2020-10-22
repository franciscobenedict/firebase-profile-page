import React, {
  useState,
  useEffect,
} from 'react';
import {
  Link,
} from 'react-router-dom';

const EmailNotVerifiedView = () => {
  const [pageTitle, setPageTitle] = useState('');
  useEffect(() => {
    setPageTitle('Please verify your email address');
  }, [pageTitle]);

  return (
    <main>
      <h1>{ pageTitle }</h1>
      <p>Your 'React Examples by Francisco Benedict' account cannot be used until your email address has been verified.</p>
      <p>Please check the inbox/spam/junk folders of the email address you provided to us, click the link within it to verify your account.</p>
      <Link to="/">Click here to return to the Landing page</Link>
    </main>
  )
}

export default EmailNotVerifiedView;
