"use client";
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';

const Nav = styled.nav`
  display: flex;
  position: fixed;
  left: 0;
  flex-direction: column;
  justify-content: space-evenly;
  height: auto;
  width: 150px;
  padding: 20px 0;
  gap: 50px;
  background-color: #ddbdfc;
  border-radius: 0 15px 15px 0;
  z-index: 1000;

  .nav-items {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }

  a {
    margin-bottom: 20px; 
    text-align: center;
    display: flex;
    justify-content: center; 
  }
`;

const Navigation = () => (
  <Nav>
    <div>
      <Image src="/images/Logo.png" alt="GYLT" width={150} height={50}/>
    </div>

    <div className='nav-items'>
      <Link href="/">
        {/* Dashboard */}
        <Image src="/images/dashboard.svg" alt="Dashboard" width={35} height={35} />
      </Link>

      <Link href="/habits">
        {/* Habits */}
        <Image src="/images/habits.png" alt="Habits" width={40} height={40} />
      </Link>

      <Link href="/subscriptions">
        {/* Subscriptions */}
        <Image src="/images/subscriptions.svg" alt="Subscriptions" width={40} height={40} />
      </Link>
    </div>

  </Nav>
);

export default Navigation;
