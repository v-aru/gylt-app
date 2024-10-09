import React, { useState } from "react";
import { ProfileContainer, ProfileCard, ProfileImageWrapper, ProfileImage, ProfileDetails, ProfileName, ProfileEmail, SignInOptions, SignInButton, SignOutButton, Icon, UserInfo, EditButton, SaveButton, InputField, LoginButton, EyeButton, NewAccount} from '../styles/ProfileStyles';
import { signIn, signOut } from "next-auth/react";
import CloseEye from '../public/assets/CloseEye';
import OpenEye from '../public/assets/OpenEye';
import SignUpForm from "@/components/Profile/NewAccountSignUp/SignUpForm";
import Layout from "@/components/Layout/Layout";
//import PlaceholderImg from '../public/images/ProfileImg.png';

const ProfilePage = ({ session }) => {
  // const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [city, setCity] = useState('');
  const [username, setUsername] = useState('');

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    signIn("credentials", { email, password });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // Logic for signing up with email and password
    // Implement your sign-up API call here
  };

  return (
    <Layout>
    <ProfileContainer>
      <ProfileCard>
        <ProfileImageWrapper>
          <ProfileImage 
              src={"/images/Placeholder.png"} 
              alt="Profile Picture" 
            />
          </ProfileImageWrapper>
        <ProfileDetails>
        {session ? ( //User is signed in
            <>
              <ProfileImage 
                src={session ? session.user.image : "/images/ProfileImg.svg"} 
                alt="Profile Picture" 
              />
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
                // <form onSubmit={handleSignUp}>
                //   <InputField
                //     type="text"
                //     placeholder="Username"
                //     value={username}
                //     onChange={(e) => setUsername(e.target.value)}
                //     required
                //   />
                //   <InputField
                //     type="email"
                //     placeholder="Email or Username"
                //     value={email}
                //     onChange={(e) => setEmail(e.target.value)}
                //     required
                //   />
                //   <div style={{ position: 'relative', width: '100%' }}>
                //     <InputField
                //       type={showPassword ? "text" : "password"} // Toggle between text and password
                //       placeholder="Password"
                //       value={password}  
                //       onChange={(e) => setPassword(e.target.value)}
                //       required
                //     />
                //     <EyeButton
                //       type="button"
                //       onClick={() => setShowPassword(!showPassword)} // Toggle show/hide
                //     >
                //       {showPassword ? <OpenEye /> : <CloseEye />}
                //     </EyeButton>
                //   </div>
                //   <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', position: 'relative', right: '-10px' }}>
                //     <LoginButton type="submit">Sign Up</LoginButton>
                //   </div>
                // </form>
                <SignUpForm />
              ) : isSigningIn ? ( //User is not signed in
                <form onSubmit={handleSignIn}>
                  <InputField
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div style={{ position: 'relative', width: '100%' }}>
                    <InputField
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}  
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <EyeButton
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <OpenEye /> : <CloseEye />}
                    </EyeButton>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', position: 'relative', right: '-10px' }}>
                    <LoginButton type="submit">Sign In</LoginButton>
                  </div>
                </form>
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