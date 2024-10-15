import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ProfileContainer, ProfileCard, ProfileImageWrapper, ProfileImage, ProfileDetails, ProfileName, ProfileEmail, SignInOptions, SignInButton, SignOutButton, Icon, UserInfo, EditButton, SaveButton, InputField, NewAccount} from '../styles/ProfileStyles';
import { signIn, signOut } from "next-auth/react";
import SignUpForm from "@/components/Profile/SignUp/SignUpForm";
import Layout from "@/components/Layout/Layout";
import { useRouter } from 'next/router'; 
import SignInForm from "@/components/Profile/SignIn/SignInForm";
import useLocalStorageState from 'use-local-storage-state';

const ProfilePage = ( ) => {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const router = useRouter(); 

  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [city, setCity] = useState('');
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useLocalStorageState("profileImage", {
    defaultValue: "/images/ProfileImg.svg", 
  });

  const handleSave = async () => {
    const userProfileData = { username, age, gender, dob, city };
  
    try {
      const response = await fetch('/api/updateProfile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userProfileData),
      });
  
      if (response.ok) {
        setIsEditing(false);
      } else {
        console.error('Error updating profile');
      }
    } catch (error) {
      console.error('Error saving user info:', error);
    }
  };

  useEffect(() => {
    if (session?.user?.image) {
      setProfileImage(session.user.image); 
    }

    if (!session) return;

    const fetchUserProfile = async () => {
      try {
        const response = await fetch('/api/getProfile');
        const data = await response.json();
  
        if (response.ok) {
          setUsername(data.username);
          setAge(data.age);
          setGender(data.gender);
          setDob(data.dob);
          setCity(data.city);
        } else {
          console.error('Error fetching user profile');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
  
    fetchUserProfile();
  }, [session, setProfileImage]);

  return (
    <Layout>
    <ProfileContainer>
      <ProfileCard>
        <ProfileDetails>
        {session ? ( //User is signed in
            <>
            <ProfileImageWrapper>
              <ProfileImage 
                src={profileImage} 
                alt="Profile Picture" 
                width="100%"
                height="100%"
              />
              </ProfileImageWrapper>
              <ProfileName>Welcome, {session.user.name}!</ProfileName>
              <ProfileEmail>{session.user.email}</ProfileEmail>

              {!isEditing ? (
                <>
                  <UserInfo>
                    <p><strong>Username:</strong> {username || "Not set"}</p>
                    <p><strong>Age:</strong> {age || "Not set"}</p>
                    <p><strong>Gender:</strong> {gender || "Not set"}</p>
                    <p><strong>Date of Birth:</strong> {dob || "Not set"}</p>
                    <p><strong>City:</strong> {city || "Not set"}</p>
                  </UserInfo>

                  <EditButton onClick={() => setIsEditing(true)}>Edit Profile</EditButton>
                </>
              ) : (
                <>
                  <InputField type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                  <InputField type="number" placeholder="Enter your age" value={age} onChange={(e) => setAge(e.target.value)} />
                  <InputField type="text" placeholder="Enter your gender" value={gender} onChange={(e) => setGender(e.target.value)} />
                  <InputField type="date" placeholder="Enter your date of birth" value={dob} onChange={(e) => setDob(e.target.value)} />
                  <InputField type="text" placeholder="Enter your city" value={city} onChange={(e) => setCity(e.target.value)} />
                  <SaveButton onClick={handleSave}>Save</SaveButton>
                </>
              )}

              <SignOutButton onClick={() => signOut()}>Sign Out</SignOutButton>
            </>
          ) : ( //User is not signed up/signed in
            <>
              <ProfileName>Welcome!</ProfileName>
              {isSigningUp ? (
                <SignUpForm />
              ) : isSigningIn ? ( //User is not signed in
                <SignInForm />
              ) : ( //User is signing in using an alternate method
                <>
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
            </>
          )}
          <SignInOptions>
            <SignInButton onClick={() => setIsSigningIn(!isSigningIn)}>
              {isSigningIn ? "Use Alternate Sign In" : "Back to Email Sign In"}
            </SignInButton>
          </SignInOptions>
          </>
          )}
        </ProfileDetails> 
      </ProfileCard>
      <NewAccount> Don&apos;t have an account? &nbsp;<a href="#" onClick={() => setIsSigningUp(true)}>Sign up</a>&nbsp;today!</NewAccount>
    </ProfileContainer>
    </Layout>
  );
};

export default ProfilePage;