import { useContext } from "react";
import { ProjectContext, ProjectWithId } from "../store/ProjectContext";
import Tasks from "./Tasks";

type SelectedProjectProps = {
  project: ProjectWithId;
};

export default function SelectedProject({ project }: SelectedProjectProps) {
  const { deleteProject } = useContext(ProjectContext);
  const formattedDate = new Date(project.dueDate).toLocaleDateString("de-DE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {project.title}
          </h1>
          <button
            onClick={() => deleteProject(project.id)}
            className="text-stone-700 hover:text-stone-500"
          >
            Delete Project
          </button>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">
          {project.description}
        </p>
      </header>
      <Tasks projectId={project.id} />
    </div>
  );
}
