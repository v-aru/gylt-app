import { useState } from "react";
import { signIn } from "next-auth/react";
import { Form, InputField, SubmitButton, Message, SelectField, SignUpFormContainer } from "../../../../styles/ProfileStyles";
import { apiRequest } from "@/lib/api";

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  email: "",
  city: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [values, setValues] = useState(EMPTY_FORM);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setField = (field) => (event) => setValues((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (values.password !== values.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { confirmPassword, ...account } = values;
      await apiRequest("/api/signup", { method: "POST", body: account });
      const result = await signIn("credentials", { email: values.email, password: values.password, redirect: false });
      if (result?.error) throw new Error("Account created, but signing in failed. Please sign in.");
    } catch (error) {
      setMessage(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <SignUpFormContainer>
      <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <InputField placeholder="First name*" value={values.firstName} onChange={setField("firstName")} required />
        <InputField placeholder="Last name" value={values.lastName} onChange={setField("lastName")} />
        <InputField
          type="date"
          aria-label="Date of birth"
          value={values.dateOfBirth}
          onChange={setField("dateOfBirth")}
          style={{ color: "#5c677d" }}
        />
        <SelectField value={values.gender} onChange={setField("gender")} style={{ color: "#5c677d" }}>
          <option value="">Gender (optional)</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Non-binary">Non-binary</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </SelectField>
        <InputField type="email" placeholder="Email*" autoComplete="email" value={values.email} onChange={setField("email")} required />
        <InputField placeholder="City" value={values.city} onChange={setField("city")} />
        <InputField placeholder="Username" value={values.username} onChange={setField("username")} />
        <InputField
          type="password"
          placeholder="Password* (min. 8 characters)"
          autoComplete="new-password"
          minLength={8}
          value={values.password}
          onChange={setField("password")}
          required
        />
        <InputField
          type="password"
          placeholder="Confirm password*"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={setField("confirmPassword")}
          required
        />
        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating account…" : "Sign Up"}
        </SubmitButton>
        {message && <Message>{message}</Message>}
      </Form>
    </SignUpFormContainer>
  );
};

export default SignUpForm;
