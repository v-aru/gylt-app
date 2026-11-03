export const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// 'YYYY-MM-DD' in the user's local time zone (toISOString would shift to UTC).
export function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function fromDateKey(value) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  }
  const date = new Date(value);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function addDays(date, amount) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

export function weekdayOf(date) {
  return WEEKDAYS[(date.getDay() + 6) % 7];
}

export function startOfWeek(date) {
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return addDays(start, -((start.getDay() + 6) % 7));
}

export function weekOf(date) {
  const start = startOfWeek(date);
  return WEEKDAYS.map((_, index) => addDays(start, index));
}

export function isSameDay(a, b) {
  return toDateKey(a) === toDateKey(b);
}

export function daysBetween(from, to) {
  return Math.round((fromDateKey(toDateKey(to)) - fromDateKey(toDateKey(from))) / 86400000);
}

export function formatDate(date, options = { weekday: "long", day: "numeric", month: "long" }) {
  return date.toLocaleDateString(undefined, options);
}

// Daily: every day. Weekly: same weekday as the start date. Monthly: same day of
// month as the start date (or the last day for shorter months). Custom: chosen weekdays.
export function isHabitDueOn(habit, date) {
  const start = fromDateKey(habit.startDate);
  if (fromDateKey(toDateKey(date)) < start) return false;

  switch (habit.frequency) {
    case "daily":
      return true;
    case "weekly":
      return date.getDay() === start.getDay();
    case "monthly": {
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      return date.getDate() === Math.min(start.getDate(), lastDay);
    }
    case "custom":
      return (habit.days || []).includes(weekdayOf(date));
    default:
      return false;
  }
}

export function isHabitDoneOn(habit, date) {
  return (habit.completedDates || []).includes(toDateKey(date));
}

// Rolls a stored renewal date forward past any renewals that already happened.
export function nextRenewalFrom(subscription, today = new Date()) {
  let renewal = fromDateKey(subscription.nextRenewal);
  const todayStart = fromDateKey(toDateKey(today));
  while (renewal < todayStart) {
    if (subscription.billingCycle === "weekly") renewal = addDays(renewal, 7);
    else if (subscription.billingCycle === "yearly") renewal = new Date(renewal.getFullYear() + 1, renewal.getMonth(), renewal.getDate());
    else renewal = new Date(renewal.getFullYear(), renewal.getMonth() + 1, renewal.getDate());
  }
  return renewal;
}

export function monthlyCost(subscription) {
  if (subscription.billingCycle === "weekly") return (subscription.cost * 52) / 12;
  if (subscription.billingCycle === "yearly") return subscription.cost / 12;
  return subscription.cost;
}
