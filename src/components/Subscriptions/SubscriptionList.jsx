import styled from "styled-components";
import { MutedText } from "@/components/UI/UI";
import { formatMoney, renewalLabel } from "./subscriptionUtils";

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Item = styled.li`
  border-left: 6px solid ${({ $color }) => $color};
  background-color: #dfe0e2;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

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

const CYCLE_SUFFIX = { weekly: "/wk", monthly: "/mo", yearly: "/yr" };

export default function SubscriptionList({ subscriptions, onEdit, emptyMessage = "No subscriptions yet." }) {
  if (subscriptions.length === 0) return <MutedText>{emptyMessage}</MutedText>;

  return (
    <List>
      {subscriptions.map((subscription) => (
        <Item key={subscription._id} $color={subscription.color} $clickable={Boolean(onEdit)}>
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
        </Item>
      ))}
    </List>
  );
}
