// pages/profile.js

import React from "react";
import styled from "styled-components";

const ProfilePage = () => {
  const user = {
    // Placeholder for now, later we'll replace this with actual data from Google OAuth
    name: "John Doe",
    email: "johndoe@example.com",
    picture: "https://via.placeholder.com/150"
  };

  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfileImage src={user.picture} alt="Profile Picture" />
        <ProfileDetails>
          <ProfileName>{user.name}</ProfileName>
          <ProfileEmail>{user.email}</ProfileEmail>
        </ProfileDetails>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default ProfilePage;

// Styled components for styling the profile page
const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const ProfileDetails = styled.div`
  text-align: center;
`;

const ProfileName = styled.h2`
  margin: 10px 0;
  font-size: 24px;
`;

const ProfileEmail = styled.p`
  font-size: 16px;
  color: gray;
`;

