const HabitItem = ({ habit }) => {
    return (
      <li>
        <h3>{habit.name}</h3>
        <p>Frequency: {habit.frequency}</p>
      </li>
    );
  };
  
  export default HabitItem;
  