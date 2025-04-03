import { useContext } from "react";
import { ProjectContext } from "../store/ProjectContext";
import NewProject from "./NewProject";
import NoProjectSelected from "./NoProjectSelected";
import SelectedProject from "./SelectedProject";

export default function ProjectArea() {
  const { projects, selectedProjectId } = useContext(ProjectContext);
  const project = projects.find((project) => project.id === selectedProjectId);

  if (selectedProjectId === null) {
    return <NewProject />;
  } else if (selectedProjectId === undefined) {
    return <NoProjectSelected />;
  } else if (project) {
    return <SelectedProject project={project} />;
  }
}
