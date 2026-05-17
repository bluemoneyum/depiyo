import { motion } from 'motion/react';
import { PROJECTS } from '../data/portfolio';
import ProjectCard from '../components/ProjectCard';
import { useProjectsContext, SiteConfig } from '../context/ProjectsContext';

interface CategoryPageProps {
  categoryTag: string;
  configKey: keyof Pick<SiteConfig, 'websiteDesign' | 'eventPromotion' | 'detailPage' | 'printDesign'>;
}

export default function CategoryPage({ categoryTag, configKey }: CategoryPageProps) {
  const { projects, siteConfig, isLoading } = useProjectsContext();
  const filteredProjects = projects.filter(p => p.tags.includes(categoryTag));

  if (isLoading) return null;

  const { title, description } = siteConfig[configKey];

  return (
    <div className="pt-20 min-h-screen">
      <header className="px-6 py-32 md:py-40 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">{title}</h1>
          <p className="text-xl text-neutral-gray max-w-2xl leading-relaxed whitespace-pre-line">{description}</p>
        </motion.div>
      </header>

      <section className="px-6 pb-40 max-w-7xl mx-auto">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border-y border-neutral-100">
            <p className="text-neutral-gray">해당 카테고리의 프로젝트가 준비 중입니다.</p>
          </div>
        )}
      </section>
    </div>
  );
}
