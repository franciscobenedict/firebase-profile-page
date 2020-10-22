import React from 'react';
import { withRouter } from 'react-router-dom';


const ErrorView = ({history}) => {
  console.log('Error view');
  return (
    <div className="main">
      <div className="container">
        <div className="">This is page does not exist.</div>
      </div>
    </div>
  )
}

export default withRouter(ErrorView);
