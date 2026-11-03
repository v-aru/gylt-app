import { addDays, daysBetween, monthlyCost, nextRenewalFrom } from "@/lib/dates";

export const CURRENCIES = ["EUR", "USD", "GBP", "INR", "CHF"];

export function formatMoney(amount, currency = "EUR") {
  return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(amount);
}

function previousRenewal(renewal, billingCycle) {
  if (billingCycle === "weekly") return addDays(renewal, -7);
  if (billingCycle === "yearly") return new Date(renewal.getFullYear() - 1, renewal.getMonth(), renewal.getDate());
  return new Date(renewal.getFullYear(), renewal.getMonth() - 1, renewal.getDate());
}

// Adds the rolled-forward renewal date, days left, whether a reminder is due,
// and how far through the current billing cycle we are (0–1).
export function withRenewalInfo(subscriptions, today = new Date()) {
  return subscriptions
    .map((subscription) => {
      const renewal = nextRenewalFrom(subscription, today);
      const daysLeft = daysBetween(today, renewal);
      const cycleDays = daysBetween(previousRenewal(renewal, subscription.billingCycle), renewal);
      const cycleProgress = cycleDays ? Math.min(1, Math.max(0, 1 - daysLeft / cycleDays)) : 0;
      return {
        ...subscription,
        renewal,
        daysLeft,
        cycleProgress,
        isDueSoon: daysLeft <= (subscription.remindDaysBefore ?? 3),
      };
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
