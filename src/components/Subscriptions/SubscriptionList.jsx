import styled, { keyframes } from "styled-components";
import { staggered } from "../../../styles/animations";
import EmptyState from "@/components/UI/EmptyState";
import { formatMoney, renewalLabel } from "./subscriptionUtils";

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const grow = keyframes`
  from { transform: scaleX(0); }
`;

const Item = styled.li`
  position: relative;
  overflow: hidden;
  border-left: 6px solid ${({ $color }) => $color};
  background-color: #dfe0e2;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  ${({ $index }) => staggered($index)}

  &:hover {
    transform: ${({ $clickable }) => ($clickable ? "translateX(3px)" : "none")};
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
  }

  button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 12px 15px;
    background: none;
    border: none;
    text-align: left;
    color: inherit;
    cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
  }
`;

const Name = styled.span`
  display: block;
  font-size: 1.1rem;
  font-weight: 600;
`;

const Meta = styled.span`
  display: block;
  font-size: 0.85rem;
  color: var(--muted);
`;

const Price = styled.span`
  text-align: right;
  white-space: nowrap;
  font-weight: 600;
`;

const Badge = styled.span`
  display: inline-block;
  margin-top: 2px;
  padding: 1px 8px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 600;
  background-color: ${({ $alert }) => ($alert ? "#ffe0dc" : "#e6e6f0")};
  color: ${({ $alert }) => ($alert ? "#b03a2e" : "#3c096c")};
`;

// Fills up across the billing cycle; full means it renews today.
const CycleBar = styled.span`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 4px;
  width: 100%;
  background-color: ${({ $alert, $color }) => ($alert ? "#e0796c" : $color)};
  opacity: 0.8;
  transform-origin: left;
  transform: scaleX(${({ $progress }) => $progress});
  animation: ${grow} 0.8s cubic-bezier(0.3, 0.8, 0.3, 1) backwards;
  animation-delay: ${({ $index }) => 150 + Math.min($index, 10) * 40}ms;
`;

const CYCLE_SUFFIX = { weekly: "/wk", monthly: "/mo", yearly: "/yr" };

export default function SubscriptionList({ subscriptions, onEdit, emptyMessage = "No subscriptions yet.", emptyEmoji = "🧾", emptyAction }) {
  if (subscriptions.length === 0) {
    return <EmptyState emoji={emptyEmoji} message={emptyMessage} actionLabel={emptyAction?.label} onAction={emptyAction?.onClick} />;
  }

  return (
    <List>
      {subscriptions.map((subscription, index) => (
        <Item key={subscription._id} $color={subscription.color} $clickable={Boolean(onEdit)} $index={index}>
          <button type="button" onClick={() => onEdit?.(subscription)} disabled={!onEdit}>
            <span>
              <Name>{subscription.name}</Name>
              <Meta>
                {[subscription.category, subscription.paymentMethod].filter(Boolean).join(" · ") || " "}
              </Meta>
              <Badge $alert={subscription.isDueSoon}>
                {subscription.isDueSoon && "⚠ "}
                {renewalLabel(subscription.daysLeft)} ·{" "}
                {subscription.renewal.toLocaleDateString(undefined, { day: "numeric", month: "short" })}
              </Badge>
            </span>
            <Price>
              {formatMoney(subscription.cost, subscription.currency)}
              <Meta>{CYCLE_SUFFIX[subscription.billingCycle]}</Meta>
            </Price>
          </button>
          <CycleBar
            aria-hidden="true"
            $progress={subscription.cycleProgress}
            $color={subscription.color}
            $alert={subscription.isDueSoon}
            $index={index}
          />
        </Item>
      ))}
    </List>
  );
}
