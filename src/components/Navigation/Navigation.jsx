"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Nav, NavItem, NavItemsContainer } from './NavigationStyles';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Navigation = () => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false); 
  
  const toggleNav = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Nav isExpanded={isExpanded}>
      <div onClick={toggleNav} style={{ cursor: 'pointer' }}>
        <Image src="/images/Logo.png" alt="GYLT" width={150} height={50}/>
      </div>

      <NavItemsContainer>

        <NavItem isExpanded={isExpanded} isActive={router.pathname === "/"}>
          <Link href="/">
          {/* Dashboard */}
            <Image src="/images/dashboard.svg" alt="Dashboard" width={35} height={35} />
            <span>Dashboard</span>
          </Link>
        </NavItem>

        <NavItem isExpanded={isExpanded} isActive={router.pathname === "/habits"}>
          <Link href="/habits">
          {/* Habits */}
            <Image src="/images/habits.png" alt="Habits" width={35} height={35} />
            <span>Habits</span>
          </Link>
        </NavItem>

        <NavItem isExpanded={isExpanded} isActive={router.pathname === "/subscriptions"}>
          <Link href="/subscriptions">
          {/* Subscriptions */}
            <Image src="/images/subscriptions.svg" alt="Subscriptions" width={35} height={35} />
            <span>Subscriptions</span>
          </Link>
        </NavItem>

        <NavItem isExpanded={isExpanded} isActive={router.pathname === "/profile"}>
          <Link href="/profile">
          {/* Subscriptions */}
            <Image src="/images/profileIcon.png" alt="Profile" width={35} height={35} />
            <span>Profile</span>
          </Link>
        </NavItem>

      </NavItemsContainer>
      
    </Nav>
  );
};

export default Navigation;
