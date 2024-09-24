export default function CreateHabitPage() {
    return (
      <div>
        <h1>Create a New Habit</h1>
        {/* Here you would add a form to create a habit */}
        <form>
          <input type="text" placeholder="Habit Name" required />
          <select>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <button type="submit">Create Habit</button>
        </form>
      </div>
    );
  }
  