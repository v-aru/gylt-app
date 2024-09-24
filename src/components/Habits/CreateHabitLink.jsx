import Link from "next/link";

const CreateHabitLink = () => {
  return (
    <div>
      <Link href="/habits/create">+ Create New Habit</Link>
    </div>
  );
};

export default CreateHabitLink;
