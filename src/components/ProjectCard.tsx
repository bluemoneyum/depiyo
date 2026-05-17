import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import type { Project } from '../data/portfolio';

interface ProjectCardProps {
  project: Project;
  key?: string | number;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link to={`/project/${project.id}`}>
        <div className="overflow-hidden rounded-2xl mb-4 bg-neutral-100 aspect-[16/9]">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-300 text-xs">
              No Image
            </div>
          )}
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 border border-neutral-200 px-1.5 py-0.5 rounded">
              {project.category}
            </span>
            <span className="text-[10px] text-neutral-400 font-medium">
              {project.year}
            </span>
          </div>
          <h3 className="text-lg font-bold group-hover:text-neutral-600 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-neutral-gray line-clamp-2 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tools.map(tool => (
              <span key={tool} className="text-[11px] text-neutral-500 bg-neutral-50 px-2 py-0.5 rounded">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
