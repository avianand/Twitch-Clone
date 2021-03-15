import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

const GoogleAuth = (props) => {
  const auth = useRef();
  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "398671583439-chdv5bu5cish5kdrbfjfdmil9vfsgsnb.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          auth.current = window.gapi.auth2.getAuthInstance();
          onAuthChange(auth.current.isSignedIn.get());
          auth.current.isSignedIn.listen(onAuthChange);
        });
    });
  }, []);

  const onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      props.signIn(auth.current.currentUser.get().getId());
    } else {
      props.signOut();
    }
  };

  const onSignInClick = () => {
    auth.current.signIn();
  };

  const onSignOutClick = () => {
    auth.current.signOut();
  };

  const renderAuthButton = () => {
    if (props.isSignedIn === null) {
      return (
        <div>
          <button onClick={onSignInClick} className="ui red google button">
            <i className="google icon" />
            Sign in with google
          </button>
        </div>
      );
    } else if (props.isSignedIn) {
      return (
        <div>
          <button onClick={onSignOutClick} className="ui red google button">
            <i className="google icon" />
            Sign Out
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={onSignInClick} className="ui red google button">
            <i className="google icon" />
            Sign in with google
          </button>
        </div>
      );
    }
  };

  return <div>{renderAuthButton()}</div>;
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
