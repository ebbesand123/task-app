import { useContext } from "react";
import { ProjectContext } from "../store/ProjectContext";
import NewTask from "./NewTask";

type TasksProps = {
  projectId: string;
};

export default function Tasks({ projectId }: TasksProps) {
  const { tasks, deleteTask } = useContext(ProjectContext);
  const projectTasks = tasks.filter((task) => task.projectId === projectId);
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask projectId={projectId} />
      {projectTasks.length > 0 ? (
        <ul>
          {projectTasks.map((task) => {
            return (
              <li
                className="mb-2 w-full flex justify-between items-center"
                key={task.id}
              >
                {task.text}
                <button
                  className="px-4 py-1 rounded-md bg-stone-400 text-stone-50 hover:bg-stone-500"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="py-2">This project does not have any tasks yet.</p>
      )}
    </section>
  );
}
