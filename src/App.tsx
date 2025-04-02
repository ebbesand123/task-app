import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";

export default function App() {
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar />
      <NewProject />
    </main>
  );
}
