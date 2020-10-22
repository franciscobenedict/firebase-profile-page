import React, {
  useState,
} from 'react';
import { useUser } from 'reactfire';
import {
  useFirebaseApp,
} from 'reactfire';
import { storage } from "../store/base";
import 'firebase/auth';
import { withRouter } from 'react-router-dom';

const ChangeImageModal = ({history}) => {
  const currentUser = useUser();
  //USER DETAILS
  let [
    userImage,
    // userName,
    // userEmail
  ] = '';
  const placeHolderProfileImage = `https://ukdj.imgix.net/455a0284eb7a4194d11239e17b11ab2a_/generic-user-profile_354184.png?auto=compress%2Cformat&ixlib=php-1.2.1&s=c64c1c0b04a6a8e47171f09b66a258bf`;
  if (currentUser) {
    userImage = currentUser.photoURL ? currentUser.photoURL : placeHolderProfileImage;
    // userName = currentUser.displayName ? currentUser.displayName : ``;
    // userEmail = currentUser.email ? currentUser.email : ``;
  }
  const [urlError, setUrlError] = useState(false);
  const onError = () => {
    setUrlError(true);
  }

  // Import firebase
  const firebase = useFirebaseApp();
  const [image, setImage] = useState(null);
  // const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [disableItemUpload, setDisableItemUpload] = useState(true);
  const [error, setError] = useState("");

  const handleImageSelection = e => {
    const file = e.target.files[0];

    if (file) {
      const fileType = file["type"];
      const validImageTypes = ["image/gif", "image/png", "image/jpeg"];
      if (validImageTypes.includes(fileType)) {
        setDisableItemUpload(false);
        setError("");
        setImage(file);
      } else {
        setError("Please upload a valid image type (.gif, .png, .jpg)");
      }
    }
  }

  const handleImageChange = e => {
    e.preventDefault();

    if(image) {
      const uploadTask = storage.ref(`images/users/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransfered / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        error => {
          setError(error)
        },
        () => {
          storage.ref("images/users/").child(image.name).getDownloadURL().then(url => {
            console.log('url', url);
            // setUrl(url);
            // console.log('===> url', url);
            const user = firebase.auth().currentUser;
            user.updateProfile({photoURL: url})
              .then(() => {
                window.location.href="/profile";
              })
              .catch(error => {
                setError(error.message);
              });
          })
        }
      )
    } else {
      setError("Error! Please choose an image to upload");
    }
  }

  return (
    <>
      <div className="main">
        <div className="container">
          <div className="modali-subheading">You can change your profile image here.</div>
          <div className="user_details">
            <div className="user_details_image">
              <p>Current image</p>

              { ! urlError ?
                <img
                  src={userImage}
                  width="150"
                  height="150"
                  alt="avatar"
                  onError={onError}
                /> :
                <img
                  src={placeHolderProfileImage}
                  width="150"
                  height="150"
                  alt="avatar"
                />
              }

            </div>
          </div>

          <form onSubmit={handleImageChange}>
            <input
              onChange={handleImageSelection}
              type="file"
            />

            <div style={{height: "30px"}}>
              { progress > 0 ? <progress value={progress} max="100" /> : ''}

              {error && <p className="error">{error}</p>}
            </div>

            <button disabled={disableItemUpload} className="button submit_btn form_button">Upload image</button>
          </form>

          {error && <p className="error">{error}</p>}
        </div>
      </div>
      <div className="modali-footer"></div>
    </>
  )
}

export default withRouter(ChangeImageModal);
