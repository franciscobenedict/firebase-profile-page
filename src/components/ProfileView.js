import React, {
  useState
} from 'react';
import {
  // Link
} from 'react-router-dom';
import { useUser } from 'reactfire';
import ChangeProfileNameModal from './ChangeProfileNameModal';
import ChangePasswordModal from './ChangePasswordModal';
import ChangeImageModal from './ChangeImageModal';
import Modali, { useModali } from 'modali';
// import LoadingOverlay from './LoadingOverlay';

const ProfileView = ( { history } ) => {
  const currentUser = useUser();
  // const [processOverlay, setProcessOverlay] = useState(false);

  //USER DETAILS
  // const user = JSON.parse(window.sessionStorage.getItem(`firebase:authUser:${firebase.apiKey}:[DEFAULT]`));
  let [userImage, userName, userEmail] = '';
  // console.log('currentUser', currentUser);
  const placeHolderProfileImage = `https://ukdj.imgix.net/455a0284eb7a4194d11239e17b11ab2a_/generic-user-profile_354184.png?auto=compress%2Cformat&ixlib=php-1.2.1&s=c64c1c0b04a6a8e47171f09b66a258bf`;
  if (currentUser) {
    userImage = currentUser.photoURL ? currentUser.photoURL : placeHolderProfileImage;
    userName = currentUser.displayName ? currentUser.displayName : ``;
    userEmail = currentUser.email ? currentUser.email : ``;
  }
  // console.log('currentUser.photoURL', currentUser.photoURL);
  const [urlError, setUrlError] = useState(false);
  const onError = () => {
    setUrlError(true);
  }

  const [changePasswordModal, toggleChangePasswordModal] = useModali({
    title: 'Change password',
    animated: true
  });

  const [changeImageModal, toggleChangeImageModal] = useModali({
    title: 'Change image',
    animated: true
  });

  const [changeNameModal, toggleChangeNameModal] = useModali({
    title: 'Change profile name',
    animated: true
  });

  return (
    <>
      {/* processOverlay && <LoadingOverlay /> */}
        <main>
          <h1 className="">{userName}'s profile</h1>
          <div className="user_details">

            <div className="user_details_text">
              <p>Registered email address: {userEmail}</p>
            </div>

            <div className="user_details_image">
              { ! urlError ?
                <img
                  src={userImage}
                  width="auto"
                  height="150"
                  alt="avatar"
                  onError={onError}
                /> :
                <img
                  src={placeHolderProfileImage}
                  width="auto"
                  height="150"
                  alt="avatar"
                />
              }

              { urlError  &&
                <p>You do not currently have a profile image. <span onClick={toggleChangeImageModal}>Upload a profile image here</span></p>
              }
            </div>

            {/*
              <hr />
              <a href="https://firebase.google.com/docs/auth/web/manage-users" target="_blank" rel="noopener noreferrer">HOW TO: Update a user's profile</a>
            */}
          </div>
          <hr />

          <div className="profile_buttons_container">
            <button className="button submit_btn form_button in_page_btn" onClick={toggleChangeNameModal}>Change profile name</button>
            <Modali.Modal {...changeNameModal}>
              <ChangeProfileNameModal />
            </Modali.Modal>

            <button className="button submit_btn form_button in_page_btn" onClick={toggleChangePasswordModal}>Change password</button>
            <Modali.Modal {...changePasswordModal}>
              <ChangePasswordModal />
            </Modali.Modal>

            <button className="button submit_btn form_button in_page_btn" onClick={toggleChangeImageModal}>Change image</button>
            <Modali.Modal {...changeImageModal}>
              <ChangeImageModal />
            </Modali.Modal>
          </div>
        </main>
    </>
  )
}

export default ProfileView;
