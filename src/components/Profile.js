import React from "react";
import AuthService from "../services/auth.service";
const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">
        <h1>
        Profile: <strong>{currentUser.username}</strong> 
        </h1>
      </header>
      <p className="profile_p">
        <strong className='param'>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p className="profile_p">
        <strong className='param'>Id:</strong> {currentUser.id}
      </p>
      <p className="profile_p">
        <strong className='param'>Email:</strong> {currentUser.email}
      </p>
      <strong className='param'>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
};

export default Profile;
