import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [date , setDate] = useState();
  const getYear = () => setDate(new Date().getFullYear());

  useEffect(() => {
    getYear();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <footer className='footer'>
      &copy; {date} Francisco Benedict: React Firebase Developer
      <br />
      Image credit: Photo by icon0 from freeimages.com
    </footer>
   );
}

export default Footer;
