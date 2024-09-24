"use client";
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';

const Nav = styled.nav`
  display: flex;
  position: fixed;
  left: 0;
  flex-direction: column;
  height: 90vh;
  width: 50px;
  padding: 20px 0;
  gap: 50px;
  background-color: #ddbdfc;
  border-radius: 15px;
  z-index: 1000;

  a {
    margin-bottom: 20px; /* Spacing between links */
    text-align: center;
    display: flex;
    justify-content: center; 
  }
`;

const Navigation = () => (
  <Nav>
    <Link href="/">
    <Image src="/dashboard.svg" alt="Dashboard" width={35} height={35} />
    </Link>

    <Link href="/habits">
      {/* Habits */}
      <Image src="/habits.png" alt="Habits" width={40} height={40} />
    </Link>

    <Link href="/health">
      {/* Health Tracker */}
      <Image src="/health-icon.svg" alt="Health Tracker" width={40} height={40} />
    </Link>

    <Link href="/todos">
      {/* To-Dos */}
      <Image src="/todo-list.svg" alt="To-Dos" width={40} height={40} />
    </Link>

    <Link href="/subscriptions">
      {/* Subscriptions */}
      <Image src="/subscriptions.svg" alt="Subscriptions" width={40} height={40} />
    </Link>

    <Link href="/timer">
      {/* Pomodoro Timer */}
      <Image src="/pomodoro-timer.svg" alt="Pomodoro Timer" width={45} height={45} />
    </Link>

  </Nav>
);

export default Navigation;
