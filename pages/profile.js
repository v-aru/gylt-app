import { useEffect, useState } from "react";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  ProfileContainer,
  ProfileCard,
  ProfileImageWrapper,
  ProfileImage,
  ProfileDetails,
  ProfileName,
  ProfileEmail,
  SignInOptions,
  SignInButton,
  SignOutButton,
  Icon,
  UserInfo,
  EditButton,
  SaveButton,
  ExitEditingButton,
  SaveBackButtonsContainer,
  InputField,
  NewAccount,
  Message,
} from "../styles/ProfileStyles";
import SignInForm from "@/components/Profile/SignIn/SignInForm";
import SignUpForm from "@/components/Profile/SignUp/SignUpForm";
import SkeletonList from "@/components/UI/Skeleton";
import { apiRequest } from "@/lib/api";

const OAUTH_ICONS = {
  google: "/images/googleIcon.png",
  github: "/images/githubIcon.png",
  facebook: "/images/facebookIcon.png",
};

const PROFILE_FIELDS = [
  { key: "username", label: "Username" },
  { key: "firstName", label: "First name" },
  { key: "lastName", label: "Last name" },
  { key: "dateOfBirth", label: "Date of birth", type: "date" },
  { key: "gender", label: "Gender" },
  { key: "city", label: "City" },
];

function ageFrom(dateOfBirth) {
  if (!dateOfBirth) return null;
  const birth = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  if (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate())) age -= 1;
  return age;
}

function SignedInProfile({ session }) {
  const [profile, setProfile] = useState({});
  const [draft, setDraft] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    apiRequest("/api/profile")
      .then(setProfile)
      .catch((error) => setMessage(error.message));
  }, []);

  const startEditing = () => {
    setDraft(profile);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      setProfile(await apiRequest("/api/profile", { method: "PUT", body: draft }));
      setIsEditing(false);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const age = ageFrom(profile.dateOfBirth);

  return (
    <>
      <ProfileImageWrapper>
        <ProfileImage src={session.user.image || "/images/ProfileImg.svg"} alt="Profile picture" />
      </ProfileImageWrapper>
      <ProfileName>Welcome, {profile.firstName || session.user.name || "friend"}!</ProfileName>
      <ProfileEmail>{session.user.email}</ProfileEmail>

      {isEditing ? (
        <>
          {PROFILE_FIELDS.map(({ key, label, type = "text" }) => (
            <InputField
              key={key}
              type={type}
              aria-label={label}
              placeholder={label}
              value={draft[key] || ""}
              onChange={(e) => setDraft((prev) => ({ ...prev, [key]: e.target.value }))}
            />
          ))}
          <SaveBackButtonsContainer>
            <SaveButton type="button" onClick={handleSave}>
              Save
            </SaveButton>
            <ExitEditingButton type="button" onClick={() => setIsEditing(false)}>
              Back
            </ExitEditingButton>
          </SaveBackButtonsContainer>
        </>
      ) : (
        <>
          <UserInfo>
            {PROFILE_FIELDS.map(({ key, label }) => (
              <p key={key}>
                <strong>{label}:</strong> {profile[key] || "Not set"}
              </p>
            ))}
            {age !== null && (
              <p>
                <strong>Age:</strong> {age}
              </p>
            )}
          </UserInfo>
          <EditButton type="button" onClick={startEditing}>
            Edit Profile
          </EditButton>
        </>
      )}

      {message && <Message>{message}</Message>}

      <SignOutButton type="button" onClick={() => signOut({ callbackUrl: "/profile" })}>
        Sign Out
      </SignOutButton>
    </>
  );
}

function SignedOutProfile({ isSigningUp, setIsSigningUp }) {
  const { query } = useRouter();
  const [oauthProviders, setOauthProviders] = useState([]);

  useEffect(() => {
    getProviders().then((providers) =>
      setOauthProviders(Object.values(providers || {}).filter((provider) => provider.type === "oauth"))
    );
  }, []);

  return (
    <>
      <ProfileName>{isSigningUp ? "Create your account" : "Welcome back!"}</ProfileName>
      {query.error && !isSigningUp && <Message>Sign-in failed. Please try again.</Message>}

      {isSigningUp ? <SignUpForm /> : <SignInForm />}

      {!isSigningUp && oauthProviders.length > 0 && (
        <SignInOptions>
          {oauthProviders.map((provider) => (
            <SignInButton key={provider.id} type="button" onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
              {OAUTH_ICONS[provider.id] && <Icon src={OAUTH_ICONS[provider.id]} alt="" />}
              Sign in with {provider.name}
            </SignInButton>
          ))}
        </SignInOptions>
      )}
    </>
  );
}

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [isSigningUp, setIsSigningUp] = useState(false);

  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfileDetails>
          {status === "loading" ? (
            <div style={{ width: "100%" }}>
              <SkeletonList rows={4} height={40} />
            </div>
          ) : session ? (
            <SignedInProfile session={session} />
          ) : (
            <SignedOutProfile isSigningUp={isSigningUp} setIsSigningUp={setIsSigningUp} />
          )}
        </ProfileDetails>
      </ProfileCard>

      {status === "unauthenticated" && (
        <NewAccount>
          {isSigningUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <a href="#" onClick={(e) => { e.preventDefault(); setIsSigningUp(!isSigningUp); }}>
            {isSigningUp ? "Sign in" : "Sign up today!"}
          </a>
        </NewAccount>
      )}
    </ProfileContainer>
  );
};

export default ProfilePage;
