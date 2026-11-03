import Link from "next/link";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import Dashboard from "@/components/Dashboard/Dashboard";
import { MutedText, PageTitle } from "@/components/UI/UI";

const Intro = styled.div`
  text-align: center;
  margin-bottom: 20px;

  a {
    display: inline-block;
    margin-top: 12px;
    padding: 10px 20px;
    background-color: var(--primary);
    color: white;
    border-radius: 6px;
    text-decoration: none;
  }
`;

export default function Home() {
  const { data: session, status } = useSession();
  const name = session?.user?.name;

  return (
    <>
      <Intro>
        <PageTitle>{name ? `Hi ${name}, here's your day` : "Your Dashboard"}</PageTitle>
        <MutedText>Track your habits and stay on top of your subscriptions.</MutedText>
        {status === "unauthenticated" && <Link href="/profile">Get started</Link>}
      </Intro>
      <Dashboard />
    </>
  );
}
