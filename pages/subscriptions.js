import { useState } from "react";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import { fadeUp } from "../styles/animations";
import Modal from "@/components/Modal/Modal";
import SignInPrompt from "@/components/UI/SignInPrompt";
import SkeletonList from "@/components/UI/Skeleton";
import CountUp from "@/components/UI/CountUp";
import SubscriptionForm from "@/components/Subscriptions/SubscriptionForm";
import SubscriptionList from "@/components/Subscriptions/SubscriptionList";
import { formatMoney, monthlyTotals, withRenewalInfo } from "@/components/Subscriptions/subscriptionUtils";
import { Card, ErrorText, FloatingButton, MutedText, PageTitle, SectionTitle } from "@/components/UI/UI";
import { useSubscriptions } from "@/context/SubscriptionsContext";
import { useToast } from "@/context/ToastContext";

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
  animation: ${fadeUp} 0.4s ease backwards;
`;

// One animated figure per currency, e.g. "€21.48 + $9.99".
const Totals = ({ totals, multiplier = 1 }) => {
  const entries = Object.entries(totals);
  if (entries.length === 0) return formatMoney(0);
  return entries.map(([currency, amount], index) => (
    <span key={currency}>
      {index > 0 && " + "}
      <CountUp value={amount * multiplier} format={(n) => formatMoney(n, currency)} />
    </span>
  ));
};

export default function SubscriptionsPage() {
  const { status } = useSession();
  const { subscriptions, isLoading, error, create, update, remove } = useSubscriptions();
  const showToast = useToast();
  // null = closed, {} = creating, subscription = editing
  const [formSubscription, setFormSubscription] = useState(null);

  if (status === "unauthenticated") return <SignInPrompt message="Sign in to keep track of your subscriptions." />;

  const withInfo = withRenewalInfo(subscriptions);
  const dueSoon = withInfo.filter((subscription) => subscription.isDueSoon);
  const totals = monthlyTotals(subscriptions);

  const handleSubmit = async (values) => {
    if (formSubscription._id) {
      await update(formSubscription._id, values);
      showToast("Changes saved");
    } else {
      await create(values);
      showToast(`${values.name} added`);
    }
    setFormSubscription(null);
  };

  const handleDelete = async () => {
    const { _id, __v, userId, createdAt, updatedAt, renewal, daysLeft, isDueSoon, ...deleted } = formSubscription;
    await remove(_id);
    setFormSubscription(null);
    showToast(`${deleted.name} deleted`, {
      action: {
        label: "Undo",
        onClick: () => create(deleted).catch(() => showToast("Couldn't restore it", { tone: "error" })),
      },
    });
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
          <strong>
            <CountUp value={subscriptions.length} />
          </strong>
        </Stat>
        <Stat>
          <MutedText>Per month</MutedText>
          <strong>
            <Totals totals={totals} />
          </strong>
        </Stat>
        <Stat>
          <MutedText>Per year</MutedText>
          <strong>
            <Totals totals={totals} multiplier={12} />
          </strong>
        </Stat>
      </Summary>

      {error && <ErrorText>{error}</ErrorText>}

      <Card>
        <SectionTitle>Upcoming renewals</SectionTitle>
        {isLoading || status === "loading" ? (
          <SkeletonList rows={3} height={72} />
        ) : (
          <SubscriptionList
            subscriptions={withInfo}
            onEdit={setFormSubscription}
            emptyMessage="No subscriptions yet. Add Netflix, Spotify, your gym…"
            emptyAction={{ label: "Add a subscription", onClick: () => setFormSubscription({}) }}
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
