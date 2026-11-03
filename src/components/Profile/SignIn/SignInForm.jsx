import { useState } from "react";
import { signIn } from "next-auth/react";
import { EyeButton, Form, InputField, LoginButton, Message } from "../../../../styles/ProfileStyles";
import { CloseEye, OpenEye } from "@/components/Icons";

const SignInForm = ({ initialEmail = "" }) => {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const result = await signIn("credentials", { email, password, redirect: false });
    if (result?.error) {
      setMessage("Wrong email or password.");
      setIsSubmitting(false);
    }
    // On success the session updates and the profile page re-renders.
  };

  return (
    <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <InputField type="email" placeholder="Email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <div style={{ position: "relative", width: "100%" }}>
        <InputField
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <EyeButton type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <OpenEye /> : <CloseEye />}
        </EyeButton>
      </div>
      <LoginButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Signing in…" : "Sign In"}
      </LoginButton>
      {message && <Message>{message}</Message>}
    </Form>
  );
};

export default SignInForm;
