import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { Nav, NavItem, NavItemsContainer, ToggleButton } from "./NavigationStyles";
import { Collapse, Expand, HomeIcon, HabitsIcon, SubscriptionsIcon, ProfileIcon } from "@/components/Icons";

const NAV_LINKS = [
  { href: "/", label: "Dashboard", Icon: HomeIcon },
  { href: "/habits", label: "Habits", Icon: HabitsIcon },
  { href: "/subscriptions", label: "Subscriptions", Icon: SubscriptionsIcon },
  { href: "/profile", label: "Profile", Icon: ProfileIcon },
];

const Navigation = () => {
  const { pathname } = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Nav $isExpanded={isExpanded}>
      <ToggleButton
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-label={isExpanded ? "Collapse navigation" : "Expand navigation"}
      >
        {isExpanded ? <Collapse /> : <Expand />}
      </ToggleButton>

      <NavItemsContainer>
        {NAV_LINKS.map(({ href, label, Icon }) => (
          <NavItem key={href} $isExpanded={isExpanded} $isActive={pathname === href}>
            <Link href={href} aria-label={label} title={label}>
              <Icon />
              <span>{label}</span>
            </Link>
          </NavItem>
        ))}
      </NavItemsContainer>
    </Nav>
  );
};

export default Navigation;
