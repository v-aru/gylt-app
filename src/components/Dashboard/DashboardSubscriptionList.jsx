import SubscriptionList from "@/components/Subscriptions/SubscriptionList";
import { withRenewalInfo } from "@/components/Subscriptions/subscriptionUtils";
import { MutedText } from "@/components/UI/UI";
import { useSubscriptions } from "@/context/SubscriptionsContext";

const UPCOMING_DAYS = 30;

const DashboardSubscriptionList = () => {
  const { subscriptions, isLoading } = useSubscriptions();

  if (isLoading) return <MutedText>Loading…</MutedText>;

  const upcoming = withRenewalInfo(subscriptions)
    .filter((subscription) => subscription.daysLeft <= UPCOMING_DAYS)
    .slice(0, 5);

  return (
    <SubscriptionList
      subscriptions={upcoming}
      emptyMessage={subscriptions.length === 0 ? "No subscriptions tracked yet." : `Nothing renews in the next ${UPCOMING_DAYS} days.`}
    />
  );
};

export default DashboardSubscriptionList;
