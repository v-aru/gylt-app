"use client";
import Link from 'next/link';
import { Nav, NavItem, NavItemsContainer } from './NavigationStyles';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Collapse, Expand, HomeIcon, HabitsIcon, SubscriptionsIcon, ProfileIcon } from '../../../public/assets';

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
         {isExpanded ? <Collapse /> : <Expand />}
      </div>

      <NavItemsContainer>

        <NavItem isExpanded={isExpanded} isActive={router.pathname === "/"}>
          <Link href="/">
          {/* Dashboard */}
            <HomeIcon/>
            <span>Dashboard</span>
          </Link>
        </NavItem>

        <NavItem isExpanded={isExpanded} isActive={router.pathname === "/habits"}>
          <Link href="/habits">
          {/* Habits/Tasks */}
            <HabitsIcon />
            <span>Habits</span>
          </Link>
        </NavItem>

        <NavItem isExpanded={isExpanded} isActive={router.pathname === "/subscriptions"}>
          <Link href="/subscriptions">
          {/* Subscriptions */}
            <SubscriptionsIcon />
            <span>Subscriptions</span>
          </Link>
        </NavItem>

        <NavItem isExpanded={isExpanded} isActive={router.pathname === "/profile"}>
          <Link href="/profile">
          {/* Profile */}
            <ProfileIcon />
            <span>Profile</span>
          </Link>
        </NavItem>

      </NavItemsContainer>
      
    </Nav>
  );
};

export default Navigation;
