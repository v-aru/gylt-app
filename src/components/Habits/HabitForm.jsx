const HabitForm = () => {
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Habit Name" required />
        <select>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <button type="submit">Add Habit</button>
      </form>
    );
  };
  
  export default HabitForm;
  