import { createContext } from "react";
import { Project } from "../components/NewProject";
import { TaskItem } from "../components/NewTask";

export type ProjectWithId = Project & {
  id: string;
};

export type TaskItemWithId = TaskItem & {
  id: string;
};

export type TProjectContext = {
  selectedProjectId: undefined | null | string;
  projects: ProjectWithId[];
  tasks: TaskItemWithId[];
  startAddProject: () => void;
  addProject: (project: Project) => void;
  cancelAddProject: () => void;
  selectProject: (id: string) => void;
  deleteProject: (id: string) => void;
  addTask: (task: TaskItem) => void;
  deleteTask: (id: string) => void;
};

export const ProjectContext = createContext<TProjectContext>({
  selectedProjectId: undefined,
  projects: [],
  tasks: [],
  addProject: () => {},
  startAddProject: () => {},
  cancelAddProject: () => {},
  selectProject: () => {},
  deleteProject: () => {},
  addTask: () => {},
  deleteTask: () => {},
});
