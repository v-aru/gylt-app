import React, { useState } from "react";
import styled from "styled-components";
import { useSession, signIn, signOut } from "next-auth/react";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);

  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [city, setCity] = useState('');

  const handleSave = () => {
    setIsEditing(false);
  };


  return (
    <ProfileContainer>
      <ProfileCard>
      {session ? (
          <>
            <ProfileImage src={session.user.image} alt="Profile Picture" />
            <ProfileDetails>
              <ProfileName>{session.user.name}</ProfileName>
              <ProfileEmail>{session.user.email}</ProfileEmail>

              {!isEditing ? (
                <>
                  <UserInfo>
                    <p><strong>Age:</strong> {age || "Not set"}</p>
                    <p><strong>Gender:</strong> {gender || "Not set"}</p>
                    <p><strong>Date of Birth:</strong> {dob || "Not set"}</p>
                    <p><strong>City:</strong> {city || "Not set"}</p>
                  </UserInfo>
                  <EditButton onClick={() => setIsEditing(true)}>Edit Profile</EditButton>
                </>
              ) : (
                <>
                  <InputField type="number" placeholder="Enter your age" value={age} onChange={(e) => setAge(e.target.value)} />
                  <InputField type="text" placeholder="Enter your gender" value={gender} onChange={(e) => setGender(e.target.value)} />
                  <InputField type="date" placeholder="Enter your date of birth" value={dob} onChange={(e) => setDob(e.target.value)} />
                  <InputField type="text" placeholder="Enter your city" value={city} onChange={(e) => setCity(e.target.value)} />
                  <SaveButton onClick={handleSave}>Save</SaveButton>
                </>
              )}

              <SignOutButton onClick={() => signOut()}>Sign Out</SignOutButton>
            </ProfileDetails>
          </>
        ) : ( 
          <>
            <ProfileDetails>
              <ProfileName>Welcome!</ProfileName>
              <SignInOptions>
                <SignInButton onClick={() => signIn("google")}>
                  <Icon src="/images/googleIcon.png" alt="Google icon" />
                  Sign in with Google
                </SignInButton>
                <SignInButton onClick={() => signIn("github")}>
                  <Icon src="/images/githubIcon.png" alt="GitHub icon" />
                  Sign in with GitHub
                </SignInButton>
                <SignInButton onClick={() => signIn("facebook")}>
                  <Icon src="/images/facebookIcon.png" alt="Facebook icon" />
                  Sign in with Facebook
                </SignInButton>
              </SignInOptions>
            </ProfileDetails>
          </>
        )}
      </ProfileCard>
    </ProfileContainer>
  );
};

export default ProfilePage;

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
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 350px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
  border: 2px solid #e0e0e0;
`;

const ProfileDetails = styled.div`
  text-align: center;
  margin-top: 10px;
`;

const ProfileName = styled.h2`
  margin: 10px 0;
  font-size: 24px;
  color: #333;
`;

const ProfileEmail = styled.p`
  font-size: 16px;
  color: gray;
`;

const SignInOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const SignInButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px;
  background-color: #F5F5F7;
  color: black;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #BED7DC;
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

const SignOutButton = styled.button`
  padding: 12px;
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    background-color: #cc0000;
  }
`;

const UserInfo = styled.div`
  text-align: center;
  margin-top: 10px;

  p {
    margin: 5px 0;
    color: #666;
  }

  strong {
    color: #333;
  }
`;

const EditButton = styled.button`
  background-color: #1d267d;
  color: white;
  border: none;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  margin-right: 5px;
`;

const SaveButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: border 0.3s;

  &:focus {
    border: 1px solid #1d267d;
  }
`;