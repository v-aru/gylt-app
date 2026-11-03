import { useState } from "react";
import { Form, Input, Select, Actions } from "@/components/Habits/HabitForm/HabitFormStyles";
import { CustomColorPicker, colors } from "@/components/ColorPicker/ColorPicker";
import { Button, ErrorText } from "@/components/UI/UI";
import { toDateKey } from "@/lib/dates";
import { CURRENCIES } from "./subscriptionUtils";

const EMPTY_SUBSCRIPTION = {
  name: "",
  category: "",
  cost: "",
  currency: "EUR",
  billingCycle: "monthly",
  nextRenewal: "",
  paymentMethod: "",
  remindDaysBefore: 3,
  color: colors[4],
};

export default function SubscriptionForm({ subscription, onSubmit, onDelete }) {
  const [values, setValues] = useState(() => ({
    ...EMPTY_SUBSCRIPTION,
    nextRenewal: toDateKey(new Date()),
    ...subscription,
  }));
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const isEditing = Boolean(subscription?._id);

  const setField = (field, value) => setValues((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    try {
      await onSubmit({
        name: values.name.trim(),
        category: values.category.trim(),
        cost: Number(values.cost),
        currency: values.currency,
        billingCycle: values.billingCycle,
        nextRenewal: values.nextRenewal,
        paymentMethod: values.paymentMethod.trim(),
        remindDaysBefore: Number(values.remindDaysBefore),
        color: values.color,
      });
    } catch (err) {
      setError(err.message);
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${subscription.name}"?`)) return;
    setIsSaving(true);
    try {
      await onDelete();
    } catch (err) {
      setError(err.message);
      setIsSaving(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>{isEditing ? "Edit subscription" : "New subscription"}</h2>

      <label htmlFor="subName">Name</label>
      <Input id="subName" placeholder="e.g. Netflix" value={values.name} onChange={(e) => setField("name", e.target.value)} required />

      <label htmlFor="subCategory">Category</label>
      <Input id="subCategory" placeholder="e.g. Streaming" value={values.category} onChange={(e) => setField("category", e.target.value)} />

      <label htmlFor="subCost">Cost</label>
      <div style={{ display: "flex", gap: 8 }}>
        <Input
          id="subCost"
          type="number"
          min="0"
          step="0.01"
          placeholder="9.99"
          value={values.cost}
          onChange={(e) => setField("cost", e.target.value)}
          required
          style={{ flex: 1 }}
        />
        <Select aria-label="Currency" value={values.currency} onChange={(e) => setField("currency", e.target.value)}>
          {CURRENCIES.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </Select>
      </div>

      <label htmlFor="subCycle">Billing cycle</label>
      <Select id="subCycle" value={values.billingCycle} onChange={(e) => setField("billingCycle", e.target.value)}>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </Select>

      <label htmlFor="subRenewal">Next renewal</label>
      <Input id="subRenewal" type="date" value={values.nextRenewal} onChange={(e) => setField("nextRenewal", e.target.value)} required />

      <label htmlFor="subRemind">Remind me (days before)</label>
      <Input
        id="subRemind"
        type="number"
        min="0"
        max="60"
        value={values.remindDaysBefore}
        onChange={(e) => setField("remindDaysBefore", e.target.value)}
      />

      <label htmlFor="subPayment">Paid with</label>
      <Input
        id="subPayment"
        placeholder="e.g. PayPal (no card numbers)"
        value={values.paymentMethod}
        onChange={(e) => setField("paymentMethod", e.target.value)}
      />

      <label>Color</label>
      <CustomColorPicker selectedColor={values.color} onSelectColor={(color) => setField("color", color)} />

      {error && <ErrorText>{error}</ErrorText>}

      <Actions>
        {isEditing ? (
          <Button type="button" $variant="danger" onClick={handleDelete} disabled={isSaving}>
            Delete
          </Button>
        ) : (
          <span />
        )}
        <Button type="submit" disabled={isSaving}>
          {isEditing ? "Save changes" : "Add subscription"}
        </Button>
      </Actions>
    </Form>
  );
}
