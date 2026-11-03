import { useState } from "react";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import Modal from "@/components/Modal/Modal";
import SignInPrompt from "@/components/UI/SignInPrompt";
import SubscriptionForm from "@/components/Subscriptions/SubscriptionForm";
import SubscriptionList from "@/components/Subscriptions/SubscriptionList";
import { formatMoney, monthlyTotals, withRenewalInfo } from "@/components/Subscriptions/subscriptionUtils";
import { Card, ErrorText, FloatingButton, MutedText, PageTitle, SectionTitle } from "@/components/UI/UI";
import { useSubscriptions } from "@/context/SubscriptionsContext";

const Summary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const Stat = styled(Card)`
  text-align: center;

  strong {
    display: block;
    font-size: 1.6rem;
    color: var(--primary);
  }
`;

const AlertBanner = styled.div`
  background-color: #ffe0dc;
  color: #b03a2e;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 20px;
  font-weight: 600;
`;

const formatTotals = (totals, multiplier = 1) =>
  Object.entries(totals)
    .map(([currency, amount]) => formatMoney(amount * multiplier, currency))
    .join(" + ") || formatMoney(0);

export default function SubscriptionsPage() {
  const { status } = useSession();
  const { subscriptions, isLoading, error, create, update, remove } = useSubscriptions();
  // null = closed, {} = creating, subscription = editing
  const [formSubscription, setFormSubscription] = useState(null);

  if (status === "loading") return <MutedText>Loading…</MutedText>;
  if (status === "unauthenticated") return <SignInPrompt message="Sign in to keep track of your subscriptions." />;

  const withInfo = withRenewalInfo(subscriptions);
  const dueSoon = withInfo.filter((subscription) => subscription.isDueSoon);
  const totals = monthlyTotals(subscriptions);

  const handleSubmit = async (values) => {
    if (formSubscription._id) await update(formSubscription._id, values);
    else await create(values);
    setFormSubscription(null);
  };

  const handleDelete = async () => {
    await remove(formSubscription._id);
    setFormSubscription(null);
  };

  return (
    <>
      <PageTitle>Subscriptions</PageTitle>

      {dueSoon.length > 0 && (
        <AlertBanner role="status">
          ⚠ {dueSoon.map((s) => s.name).join(", ")} {dueSoon.length === 1 ? "renews" : "renew"} soon. Cancel now if you
          don&apos;t need {dueSoon.length === 1 ? "it" : "them"} anymore.
        </AlertBanner>
      )}

      <Summary>
        <Stat>
          <MutedText>Active</MutedText>
          <strong>{subscriptions.length}</strong>
        </Stat>
        <Stat>
          <MutedText>Per month</MutedText>
          <strong>{formatTotals(totals)}</strong>
        </Stat>
        <Stat>
          <MutedText>Per year</MutedText>
          <strong>{formatTotals(totals, 12)}</strong>
        </Stat>
      </Summary>

      {error && <ErrorText>{error}</ErrorText>}

      <Card>
        <SectionTitle>Upcoming renewals</SectionTitle>
        {isLoading ? (
          <MutedText>Loading your subscriptions…</MutedText>
        ) : (
          <SubscriptionList
            subscriptions={withInfo}
            onEdit={setFormSubscription}
            emptyMessage="No subscriptions yet. Add Netflix, Spotify, your gym…"
          />
        )}
      </Card>

      <FloatingButton type="button" onClick={() => setFormSubscription({})}>
        + Add Subscription
      </FloatingButton>

      {formSubscription && (
        <Modal title={formSubscription._id ? "Edit subscription" : "New subscription"} onClose={() => setFormSubscription(null)}>
          <SubscriptionForm subscription={formSubscription} onSubmit={handleSubmit} onDelete={handleDelete} />
        </Modal>
      )}
    </>
  );
}
