import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolio';
import ProjectCard from '../components/ProjectCard';
import { useProjectsContext } from '../context/ProjectsContext';

export default function Home() {
  const { projects, experiences, siteConfig, isLoading } = useProjectsContext();
  const featuredProjects = projects.filter(p => p.isFeatured).slice(0, 4);

  if (isLoading) return null;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="px-6 pt-12 pb-16 md:pt-16 md:pb-24 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl lg:w-1/2"
        >
          <p className="text-xs font-bold tracking-widest text-neutral-400 mb-6 uppercase">{siteConfig.home.heroSubtitle}</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-12 leading-tight whitespace-pre-line">
            {siteConfig.home.heroTitle}
          </h1>
          <p className="text-base md:text-lg text-neutral-dark/80 leading-relaxed mb-12">
            {siteConfig.home.heroDescription}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/contact" className="px-8 py-4 bg-black text-white rounded-full font-bold hover:bg-neutral-800 transition-colors">
              작업 문의하기
            </Link>
            <Link to="/about" className="px-8 py-4 border border-neutral-200 rounded-full font-bold hover:bg-neutral-50 transition-colors">
              더 알아보기
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:w-1/2 flex justify-center items-center"
        >
          <div className="relative w-full max-w-[630px] aspect-[630/660] md:h-[660px] md:aspect-auto flex items-center justify-center overflow-hidden">
            {siteConfig.home.heroImage ? (
              <img 
                src={siteConfig.home.heroImage} 
                alt="실무형 디자이너 일러스트" 
                className="w-full h-full object-contain drop-shadow-2xl rounded-2xl"
              />
            ) : (
              <div className="w-full aspect-[630/660] bg-neutral-50 rounded-3xl flex items-center justify-center border-2 border-dashed border-neutral-100 italic text-neutral-300">
                Hero Illustration
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section className="px-6 pt-16 pb-24 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">대표 프로젝트</h2>
              <p className="text-neutral-gray">실제 운영 환경에서 성과를 낸 주요 작업물입니다.</p>
            </div>
            <Link to="/website-design" className="hidden md:flex items-center gap-2 text-sm font-bold hover:translate-x-1 transition-transform">
              전체 보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Brief Experience Section */}
      <section className="px-6 py-24 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight mb-4">경력 요약</h2>
              <p className="text-neutral-gray italic">
                "2004년부터 꾸준히 쌓아온 필드 경험은 이론이 아닌 실무 데이터에 근거한 디자인을 가능하게 합니다."
              </p>
            </div>
            <Link to="/experience" className="flex items-center gap-2 text-sm font-bold hover:translate-x-1 transition-transform">
              상세 경력 보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {experiences.map((exp) => (
              <div 
                key={exp.id} 
                className="p-6 border border-neutral-100 rounded-2xl bg-white transition-all duration-300 hover:border-neutral-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
              >
                <span className="text-[10px] font-bold text-neutral-400 block mb-2">{exp.period}</span>
                <h3 className="text-base font-bold mb-3">{exp.company}</h3>
                <p className="text-xs font-semibold text-neutral-500 mb-3">{exp.role}</p>
                <ul className="space-y-1.5">
                  {exp.projects.slice(0, 2).map((proj, i) => (
                    <li key={i} className="text-[11px] text-neutral-gray leading-snug flex items-start gap-1">
                      <span className="shrink-0 text-neutral-300">•</span>
                      {proj}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Brief (Now after Experience) */}
      <section className="px-6 py-32 bg-neutral-soft">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-4 block">PORTFOLIO MINDSET</span>
            <h2 className="text-4xl font-bold tracking-tight mb-8">
              운영을 아는 디자인은<br />다릅니다.
            </h2>
            <p className="text-lg text-neutral-gray leading-relaxed mb-8">
              다양한 실무 경험은 저에게 디자인 이상의 관점을 갖게 해주었습니다. 
              사용자가 어디서 멈추는지, 관리자가 무엇을 어려워하는지 이해하는 디자이너로서 프로젝트에 참여합니다.
            </p>
            <Link to="/process" className="inline-flex items-center gap-2 font-bold hover:gap-4 transition-all">
              작업 프로세스 확인하기 <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: '디자인', desc: '웹, 상세페이지, 인쇄물' },
              { label: '운영 경험', desc: '고도몰, 카페24, SCM' },
              { label: '광고 관리', desc: '네이버 검색광고 운영' },
              { label: '유지보수', desc: '효율적인 사후 관리' },
            ].map(item => (
              <div 
                key={item.label} 
                className="p-8 bg-white rounded-2xl border border-neutral-100 transition-all duration-300 hover:border-neutral-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
              >
                <h3 className="font-bold mb-2">{item.label}</h3>
                <p className="text-sm text-neutral-gray">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-40 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">비즈니스에 맞는<br />디자인을 만듭니다.</h2>
          <p className="text-xl text-neutral-gray mb-12">작업 목적에 맞는 구조와 가독성 중심의 디자인, 지금 시작하세요.</p>
          <Link to="/contact" className="inline-block px-12 py-5 bg-black text-white rounded-full text-lg font-bold hover:bg-neutral-800 transition-colors">
            협업 문의하기
          </Link>
        </div>
      </section>
    </div>
  );
}
