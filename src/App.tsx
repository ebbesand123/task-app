import { useState, type ReactNode } from "react";
import { v4 as uuid } from "uuid";
import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import { Project } from "./components/NewProject";

export type ProjectWithId = Project & {
  id: string;
};

export default function App() {
  const [projectsState, setProjectsState] = useState<{
    selectedProjectId: undefined | null | string;
    projects: ProjectWithId[];
  }>({
    selectedProjectId: undefined,
    projects: [],
  });

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleAddProject(projectData: {
    title: string;
    description: string;
    dueDate: string;
  }) {
    setProjectsState((prevState) => {
      const uniqueId = uuid();

      const newProject = {
        ...projectData,
        id: uniqueId,
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  let content: ReactNode;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
      />
      {content}
    </main>
  );
}
