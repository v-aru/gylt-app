import styled from "styled-components";
import { MutedText } from "@/components/UI/UI";
import { WEEKDAYS, isHabitDoneOn, isHabitDueOn, weekOf } from "@/lib/dates";

const Scroll = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  .short {
    display: none;
  }

  @media (max-width: 600px) {
    th,
    td {
      padding: 6px 2px;
    }

    .long {
      display: none;
    }

    .short {
      display: inline;
    }
  }

  th,
  td {
    padding: 8px 4px;
    text-align: center;
  }

  th:first-child,
  td:first-child {
    text-align: left;
  }

  tbody tr + tr {
    border-top: 1px solid #e0e0e0;
  }
`;

const Dot = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${({ $state, $color }) => ($state === "done" ? $color : $state === "due" ? "#d0d0d0" : "transparent")};
  border: 2px solid ${({ $state, $color }) => ($state === "none" ? "#eee" : $state === "done" ? $color : "#d0d0d0")};
`;

const Score = styled.td`
  font-weight: bold;
  color: var(--primary);
`;

const DOT_LABELS = { done: "done", due: "not done", none: "not scheduled" };

export default function WeeklyTracker({ habits, date }) {
  if (habits.length === 0) {
    return <MutedText>Add a habit to see your weekly progress.</MutedText>;
  }

  const week = weekOf(date);

  return (
    <Scroll>
      <Table>
        <thead>
          <tr>
            <th>Habit</th>
            {WEEKDAYS.map((day) => (
              <th key={day} title={day}>
                <span className="long">{day}</span>
                <span className="short">{day[0]}</span>
              </th>
            ))}
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          {habits.map((habit) => {
            const states = week.map((day) =>
              isHabitDoneOn(habit, day) ? "done" : isHabitDueOn(habit, day) ? "due" : "none"
            );
            const due = states.filter((s) => s !== "none").length;
            const done = states.filter((s) => s === "done").length;
            return (
              <tr key={habit._id}>
                <td>{habit.habitName}</td>
                {states.map((state, index) => (
                  <td key={WEEKDAYS[index]}>
                    <Dot $state={state} $color={habit.color} title={`${WEEKDAYS[index]}: ${DOT_LABELS[state]}`} />
                  </td>
                ))}
                <Score>{due ? `${done}/${due}` : "–"}</Score>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Scroll>
  );
}
