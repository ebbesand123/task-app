import { ChangeEvent, useState, useContext } from "react";
import { ProjectContext } from "../store/ProjectContext";

export type TaskItem = {
  text: string;
  projectId: string;
};

type NewTaskProps = {
  projectId: string;
};

export default function NewTask({ projectId }: NewTaskProps) {
  const { addTask } = useContext(ProjectContext);
  const [enteredTask, setEnteredTask] = useState<string>("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setEnteredTask(event.target.value);
  }

  function handleClick() {
    if (enteredTask.trim() === "") return;

    addTask({ text: enteredTask.trim(), projectId });
    setEnteredTask("");
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onChange={handleChange}
        value={enteredTask}
      />
      <button
        onClick={handleClick}
        className="py-1 px-2 rounded-md bg-stone-700 text-stone-200 hover:bg-stone-950"
      >
        Add Task
      </button>
    </div>
  );
}
