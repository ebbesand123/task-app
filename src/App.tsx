import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import ProjectsSidebar from "./components/ProjectsSidebar";
import { type Project } from "./components/NewProject";
import {
  ProjectContext,
  TProjectContext,
  type ProjectWithId,
  type TaskItemWithId,
} from "./store/ProjectContext";
import { TaskItem } from "./components/NewTask";
import ProjectArea from "./components/ProjectArea";

type ProjectState = {
  selectedProjectId: undefined | null | string;
  projects: ProjectWithId[];
  tasks: TaskItemWithId[];
};

export default function App() {
  const [projectsState, setProjectsState] = useState<ProjectState>({
    projects: [],
    tasks: [],
    selectedProjectId: undefined,
  });

  useEffect(() => {
    const stored = localStorage.getItem("projects-app");
    const parsed = stored && JSON.parse(stored);
    if (parsed satisfies ProjectState) setProjectsState(parsed);
  }, []);

  function saveLocalProjectState(state: ProjectState) {
    localStorage.setItem("projects-app", JSON.stringify(state));
  }

  function handleAddTask(taskData: TaskItem) {
    setProjectsState((prevState) => {
      const id = uuid();
      const newState = {
        ...prevState,
        tasks: [...prevState.tasks, { ...taskData, id }],
      };
      saveLocalProjectState(newState);

      return newState;
    });
  }

  function handleDeleteTask(id: string) {
    setProjectsState((prevState) => {
      const newState = {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
      saveLocalProjectState(newState);

      return newState;
    });
  }

  function handleSelectProject(id: string) {
    setProjectsState((prevState) => {
      const newState = {
        ...prevState,
        selectedProjectId: id,
      };
      saveLocalProjectState(newState);

      return newState;
    });
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      const newState = {
        ...prevState,
        selectedProjectId: null,
      };
      saveLocalProjectState(newState);

      return newState;
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      const newState = {
        ...prevState,
        selectedProjectId: undefined,
      };
      saveLocalProjectState(newState);

      return newState;
    });
  }

  function handleAddProject(projectData: Project) {
    setProjectsState((prevState) => {
      const id = uuid();
      const newProject = {
        ...projectData,
        id,
      };
      const newState = {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
      saveLocalProjectState(newState);

      return newState;
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      const newState = {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        ),
      };
      saveLocalProjectState(newState);
      return newState;
    });
  }

  const ctxValue: TProjectContext = {
    projects: projectsState.projects,
    tasks: projectsState.tasks,
    selectedProjectId: projectsState.selectedProjectId,
    addProject: handleAddProject,
    startAddProject: handleStartAddProject,
    deleteProject: handleDeleteProject,
    cancelAddProject: handleCancelAddProject,
    selectProject: handleSelectProject,
    addTask: handleAddTask,
    deleteTask: handleDeleteTask,
  };

  return (
    <ProjectContext.Provider value={ctxValue}>
      <main className="h-screen my-8 flex gap-8">
        <ProjectsSidebar />
        <ProjectArea />
      </main>
    </ProjectContext.Provider>
  );
}
