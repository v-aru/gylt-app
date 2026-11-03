import createResourceContext from "./createResourceContext";

const [SubscriptionsProvider, useSubscriptionsResource] = createResourceContext("/api/subscriptions");

export { SubscriptionsProvider };

export function useSubscriptions() {
  const { items: subscriptions, ...rest } = useSubscriptionsResource();
  return { subscriptions, ...rest };
}
