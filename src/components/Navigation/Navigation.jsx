"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Nav, NavItem, NavItemsContainer } from './NavigationStyles';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Menu from '../../../public/assets/Menu';

const Navigation = () => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false); 
  
  const toggleNav = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Nav isExpanded={isExpanded}>
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'center', // Centers horizontally
          alignItems: 'center', // Centers vertically
          cursor: 'pointer' 
        }}
        onClick={toggleNav}
      >
        <Menu/>
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
