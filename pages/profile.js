import React, { useState } from "react";
import { ProfileContainer, ProfileCard, ProfileImage, ProfileDetails, ProfileName, ProfileEmail, SignInOptions, SignInButton, SignOutButton, Icon, UserInfo, EditButton, SaveButton, InputField, LoginButton, EyeButton} from '../src/ProfileStyles';
import { useSession, signIn, signOut } from "next-auth/react";
import CloseEye from '../public/assets/CloseEye';
import OpenEye from '../public/assets/OpenEye';

const ProfilePage = () => {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false); // State for handling sign-in form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [city, setCity] = useState('');

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    signIn("credentials", { email, password });
  };

  return (
    <ProfileContainer>
      <ProfileCard>
      {session ? (
          <>
            <ProfileImage src={session.user.image} alt="Profile Picture" />
            <ProfileDetails>
              <ProfileName>Welcome, {session.user.name}!</ProfileName>
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
              {!isSigningIn ? (
                <form onSubmit={handleSignIn}>
                  <InputField
                    type="email"
                    placeholder="Email or Username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div style={{ position: 'relative' }}>
                    <InputField
                      type={showPassword ? "text" : "password"} // Toggle between text and password
                      placeholder="Password"
                      value={password}  
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <EyeButton
                      type="button"
                      onClick={() => setShowPassword(!showPassword)} // Toggle show/hide
                    >
                      {showPassword ? <OpenEye /> : <CloseEye />}
                    </EyeButton>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <LoginButton type="submit">Sign In</LoginButton>
                  </div>
                </form>
              ) : (
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
              )}
              <SignInOptions>
                <SignInButton onClick={() => setIsSigningIn(!isSigningIn)}>
                  {isSigningIn ? "Back to Email Sign In" : "Use Alternate Sign In"}
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