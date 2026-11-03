import { daysBetween, monthlyCost, nextRenewalFrom } from "@/lib/dates";

export const CURRENCIES = ["EUR", "USD", "GBP", "INR", "CHF"];

export function formatMoney(amount, currency = "EUR") {
  return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(amount);
}

// Adds the rolled-forward renewal date, days left and whether a reminder is due.
export function withRenewalInfo(subscriptions, today = new Date()) {
  return subscriptions
    .map((subscription) => {
      const renewal = nextRenewalFrom(subscription, today);
      const daysLeft = daysBetween(today, renewal);
      return { ...subscription, renewal, daysLeft, isDueSoon: daysLeft <= (subscription.remindDaysBefore ?? 3) };
    })
    .sort((a, b) => a.renewal - b.renewal);
}

// { EUR: 23.5, USD: 9.99 } — kept per currency rather than converted.
export function monthlyTotals(subscriptions) {
  return subscriptions.reduce((totals, subscription) => {
    const currency = subscription.currency || "EUR";
    totals[currency] = (totals[currency] || 0) + monthlyCost(subscription);
    return totals;
  }, {});
}

export function renewalLabel(daysLeft) {
  if (daysLeft === 0) return "Renews today";
  if (daysLeft === 1) return "Renews tomorrow";
  return `Renews in ${daysLeft} days`;
}
