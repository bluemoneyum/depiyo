import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useProjectsContext } from '../context/ProjectsContext';

export default function ProjectDetail() {
  const { id } = useParams();
  const { projects, isLoading } = useProjectsContext();
  const project = projects.find(p => p.id === id);

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="animate-pulse space-y-12">
            <div className="h-4 w-32 bg-neutral-100 rounded" />
            <div className="space-y-4 max-w-4xl">
              <div className="h-4 w-24 bg-neutral-100 rounded" />
              <div className="h-12 w-full bg-neutral-100 rounded" />
              <div className="h-6 w-48 bg-neutral-100 rounded" />
            </div>
            <div className="aspect-video w-full bg-neutral-50 rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-40 text-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">프로젝트를 찾을 수 없습니다.</h2>
        <Link to="/" className="text-neutral-400 hover:text-black underline underline-offset-4">
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-20"
    >
      <div className="max-w-7xl mx-auto px-6 py-20">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-neutral-gray hover:text-black mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" /> 목록으로 돌아가기
        </Link>
        
        <header className="max-w-4xl mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 border border-neutral-200 rounded-full text-xs font-bold">{project?.category}</span>
            <span className="text-xs text-neutral-400">{project?.year}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
            {project?.title}
          </h1>
          <p className="text-xl text-neutral-gray leading-relaxed uppercase tracking-tighter mb-12">
            [{project?.role}]
          </p>
        </header>

        <div className="rounded-3xl overflow-hidden mb-24 bg-neutral-100 min-h-[200px] flex items-center justify-center">
          {(project?.detailImage || project?.thumbnail) ? (
            <img 
              src={project?.detailImage || project?.thumbnail} 
              alt={project?.title} 
              className="w-full h-auto block" 
            />
          ) : (
            <span className="text-neutral-300 font-medium tracking-widest uppercase">No Visual Content</span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-32">
          <div className="md:col-span-2 space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">프로젝트 소개</h2>
              <p className="text-lg text-neutral-gray leading-relaxed">
                {project?.description}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6">주요 작업 범위</h2>
              <ul className="space-y-4">
                {[
                  '운영 목적에 따른 정보 구조(IA) 설계',
                  '모바일 최적화 및 반응형 레이아웃 구현',
                  '이벤트 성격에 맞는 시각적 아이덴티티 수립',
                  '유지보수를 고려한 이미지 및 코드 자산화'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-neutral-400 mt-1 shrink-0" />
                    <span className="text-neutral-gray">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-12">
            <div>
              <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4">Core Tools</h3>
              <div className="flex flex-wrap gap-2">
                {project.tools.map(tool => (
                  <span key={tool} className="px-3 py-1.5 bg-neutral-soft rounded-lg text-sm font-medium">{tool}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4">Project Context</h3>
              <p className="text-sm text-neutral-gray leading-relaxed">
                실제 운영 환경에서의 전환율 향상과 관리 효율성을 최우선으로 고려한 프로젝트입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
