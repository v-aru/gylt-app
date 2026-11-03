import Link from "next/link";
import styled from "styled-components";
import { Card, MutedText } from "./UI";

const PromptCard = styled(Card)`
  max-width: 420px;
  margin: 40px auto;
  text-align: center;

  a {
    display: inline-block;
    margin-top: 15px;
    padding: 10px 18px;
    background-color: #3c096c;
    color: white;
    border-radius: 6px;
    text-decoration: none;
  }
`;

export default function SignInPrompt({ message = "Sign in to start getting your life together." }) {
  return (
    <PromptCard>
      <MutedText>{message}</MutedText>
      <Link href="/profile">Sign in or create an account</Link>
    </PromptCard>
  );
}
