import { useProjectsContext } from '../context/ProjectsContext';

export function useProjects() {
  const { projects } = useProjectsContext();
  return projects;
}
