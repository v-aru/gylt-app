import { useState } from "react";
import { Form, Input, Select, DaysContainer, DayButton, Actions } from "./HabitFormStyles";
import { CustomColorPicker, colors } from "@/components/ColorPicker/ColorPicker";
import { Button, ErrorText } from "@/components/UI/UI";
import { WEEKDAYS, toDateKey } from "@/lib/dates";

const EMPTY_HABIT = { habitName: "", category: "", frequency: "daily", days: [], color: colors[6] };

export default function HabitForm({ habit, onSubmit, onDelete }) {
  const [values, setValues] = useState(() => ({ ...EMPTY_HABIT, ...habit }));
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const isEditing = Boolean(habit?._id);

  const setField = (field, value) => setValues((prev) => ({ ...prev, [field]: value }));

  const toggleDay = (day) =>
    setField("days", values.days.includes(day) ? values.days.filter((d) => d !== day) : [...values.days, day]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (values.frequency === "custom" && values.days.length === 0) {
      setError("Pick at least one day for a custom habit.");
      return;
    }
    setIsSaving(true);
    try {
      await onSubmit({
        habitName: values.habitName.trim(),
        category: values.category.trim(),
        frequency: values.frequency,
        days: values.frequency === "custom" ? WEEKDAYS.filter((d) => values.days.includes(d)) : [],
        color: values.color,
        startDate: values.startDate || toDateKey(new Date()),
      });
    } catch (err) {
      setError(err.message);
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${habit.habitName}"? Its history will be lost.`)) return;
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
      <h2>{isEditing ? "Edit habit" : "New habit"}</h2>

      <label htmlFor="habitName">Habit name</label>
      <Input
        id="habitName"
        placeholder="e.g. Drink 2L of water"
        value={values.habitName}
        onChange={(e) => setField("habitName", e.target.value)}
        required
      />

      <label htmlFor="habitCategory">Category</label>
      <Input
        id="habitCategory"
        placeholder="e.g. Health"
        value={values.category}
        onChange={(e) => setField("category", e.target.value)}
        required
      />

      <label htmlFor="habitFrequency">Frequency</label>
      <Select id="habitFrequency" value={values.frequency} onChange={(e) => setField("frequency", e.target.value)}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly (same weekday as start)</option>
        <option value="monthly">Monthly (same date as start)</option>
        <option value="custom">Custom days</option>
      </Select>

      {values.frequency === "custom" && (
        <DaysContainer role="group" aria-label="Days of the week">
          {WEEKDAYS.map((day) => (
            <DayButton key={day} $selected={values.days.includes(day)} aria-pressed={values.days.includes(day)} onClick={() => toggleDay(day)}>
              {day}
            </DayButton>
          ))}
        </DaysContainer>
      )}

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
          {isEditing ? "Save changes" : "Create habit"}
        </Button>
      </Actions>
    </Form>
  );
}
