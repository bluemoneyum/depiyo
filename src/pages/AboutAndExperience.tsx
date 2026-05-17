import { motion } from 'motion/react';
import { EXPERIENCES } from '../data/portfolio';
import { useProjectsContext } from '../context/ProjectsContext';

export default function About() {
  const { siteConfig, isLoading } = useProjectsContext();

  if (isLoading) return null;

  return (
    <div className="pt-20">
      <section className="px-6 py-32 md:py-48 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6 block">{siteConfig.about.subtitle}</span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-12 leading-tight whitespace-pre-line">
            {siteConfig.about.title}
          </h1>
          <p className="text-xl md:text-2xl text-neutral-dark/80 leading-relaxed mb-12">
            {siteConfig.about.description}
          </p>
        </motion.div>
      </section>

      {/* 1. 업무 경험 상세 */}
      <section className="px-6 py-24 bg-neutral-soft">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-16 border-b border-neutral-200 pb-4">01. CAREER & EXPERIENCE</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-24 md:gap-y-20">
            {[
              {
                title: '기획 경력',
                content: '신규 사업 기획부터 사이트 운영 요구사항 수집, 개발 부서와의 협업을 위한 기안 및 피드백 업무를 수행했습니다. (바보사랑, 건담샵, 이지웨이 등 주요 쇼핑몰 기획)'
              },
              {
                title: '디자인 경력',
                content: '독립몰 및 카페24/고도몰을 활용한 전체 사이트 디자인을 진행해왔습니다. 의류, 가전, 건담 등 다양한 카테고리의 콘텐츠와 릴스 영상 제작, 현재는 디자인 팀을 관리하고 있습니다.'
              },
              {
                title: '광고 운영 경력',
                content: '주로 네이버쇼핑 광고를 대행사 없이 직접 관리하며 최상의 효율을 끌어내고 있습니다. 광고 세팅부터 운영, 데이터 분석 및 수익률(ROAS) 관리를 전문으로 합니다.'
              },
              {
                title: '상품 운용 경력',
                content: 'WMS, ERP 프로그램에 대한 이해도가 높으며 사방넷, 플레이오토 등을 통한 입점사 통합 관리가 가능합니다. 단순 등록을 넘어 가격비교 관리 및 판매 채널 대응 역량을 보유하고 있습니다.'
              },
              {
                title: '커뮤니티 운영 경력',
                content: '4만 명 이상의 회원수를 보유한 네이버 카페를 직접 개설하고 운영했습니다. 규정 제정, 디자인, 온/오프라인 이벤트(도색 경연 등) 기획을 총괄하며 커뮤니티 성장을 주도했습니다.'
              }
            ].map((item, i) => (
              <div key={i} className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-3">
                  <span className="text-neutral-300 text-sm">0{i + 1}</span> {item.title}
                </h3>
                <p className="text-neutral-gray leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. 보유 기술 */}
      <section className="px-6 py-32 max-w-7xl mx-auto">
        <h2 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-16 border-b border-neutral-100 pb-4">02. CORE SKILLS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: '작업 가능 툴', desc: 'Ps, Ai, Pr, XD, HTML/CSS, OA' },
            { label: 'UI/UX 디자인', desc: '사용자 경험을 고려한 웹/앱 디자인' },
            { label: '이미지 디자인', desc: '이벤트, 상세페이지, 콘텐츠 배너' },
            { label: '인쇄물 디자인', desc: '패키지, 박스, 입간판, 스티커' },
            { label: '영상 제작', desc: '유튜브, 인스타그램 릴스 편집' },
            { label: '사이트 제작', desc: '카페24, 고도몰 솔루션 구축' },
            { label: '쇼핑몰 채널 관리', desc: '쿠팡, 네이버쇼핑 상품 관리 및 복구' },
            { label: '오픈마켓 관리', desc: '옥션, 지마켓, 11번가 등록 및 운영' },
            { label: '네이버 광고 관리', desc: '세팅, 운영 실무 및 성과 분석' },
            { label: '기획 및 제안', desc: '프레젠테이션 및 사업 기획서 제작' },
          ].map((skill, i) => (
            <div key={i} className="p-8 border border-neutral-100 rounded-2xl hover:bg-neutral-dark hover:text-white transition-all group">
              <h3 className="font-bold mb-2 group-hover:text-white">{skill.label}</h3>
              <p className="text-sm text-neutral-gray group-hover:text-neutral-400">{skill.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 업무 성향 및 마인드 */}
      <section className="px-6 py-32 bg-neutral-dark text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-16 border-b border-neutral-800 pb-4">03. MINDSET & VALUE</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold mb-6">효율과 소통</h3>
                <p className="text-neutral-400 leading-relaxed text-lg">
                  맡은 업무를 최상의 효율로 수행하기 위해 개선책을 찾고 분석하는 데 주력합니다. 
                  연차가 쌓일수록 깨닫게 된 가장 중요한 가치는 '소통'입니다. 유관 부서와의 유기적인 협업이 프로젝트 성공의 가장 큰 원동력임을 믿습니다.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-6">체계적인 작업 방식</h3>
                <p className="text-neutral-400 leading-relaxed text-lg">
                  구체적인 목표를 설정하고 계획에 따라 규칙적으로 움직입니다. 후처리보다 선처리를 지향하여 오류를 최소화하고, 이를 통해 비용 절감과 작업 효율을 극대화합니다.
                </p>
              </div>
            </div>
            <div className="bg-neutral-800 p-12 rounded-3xl space-y-8">
              <h3 className="text-xl font-bold">강점과 지향점</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="text-neutral-500 font-bold">01</span>
                  <p className="text-neutral-300">다양한 팀의 요구사항을 조율하고 타협점을 찾아내는 원활한 소통 능력</p>
                </li>
                <li className="flex gap-4">
                  <span className="text-neutral-500 font-bold">02</span>
                  <p className="text-neutral-300">어떠한 위치와 미션에서도 최선의 방법을 찾아내는 풍부한 실무 경험</p>
                </li>
                <li className="flex gap-4">
                  <span className="text-neutral-500 font-bold">03</span>
                  <p className="text-neutral-300">디자인의 완성도와 비즈니스의 운영 효율 사이의 균형을 맞추는 최적화 감각</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 클로징 */}
      <section className="px-6 py-40 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 leading-tight">
          조직 전체의 성공에 기여할 수 있는<br />든든한 파트너가 되겠습니다.
        </h2>
        <p className="text-xl text-neutral-gray mb-12">
          오랜 기간 다방면의 직무를 경험한 노하우로 빠르게 융화되어 결과로 보답하겠습니다. 끝까지 읽어주셔서 감사합니다.
        </p>
        <div className="pt-8 border-t border-neutral-100 flex justify-center">
          <p className="text-sm font-bold text-neutral-400 italic">"어떠한 문제라도 해결할 수 있다는 긍정적인 마인드로 임합니다."</p>
        </div>
      </section>
    </div>
  );
}

export function ExperiencePage() {
  const { experiences, siteConfig, isLoading } = useProjectsContext();

  if (isLoading) return null;

  return (
    <div className="pt-20">
      <header className="px-6 py-32 md:py-40 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">{siteConfig.experience.title}</h1>
        <p className="text-xl text-neutral-gray max-w-2xl">{siteConfig.experience.description}</p>
      </header>

      <section className="px-6 pb-40 max-w-7xl mx-auto">
        <div className="space-y-32">
          {experiences.map((exp) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-20"
            >
              <div className="md:col-span-1">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2 block">{exp.period}</span>
                <h2 className="text-2xl font-bold tracking-tight">{exp.company}</h2>
                <p className="text-neutral-500 font-medium text-sm mt-2">{exp.role}</p>
              </div>
              <div className="md:col-span-3 space-y-12">
                <div>
                  <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-6 border-b border-neutral-100 pb-2">Main Responsibilities & Achievements</h3>
                  <ul className="space-y-5">
                    {exp.projects.map((p, i) => (
                      <li key={i} className="text-neutral-dark/80 leading-relaxed flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full mt-2.5 shrink-0" />
                        <span className="text-lg">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {exp.skills.length > 0 && (
                  <div>
                    <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-4">Core Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map(s => (
                        <span key={s} className="px-3 py-1.5 bg-neutral-soft rounded text-xs text-neutral-gray font-medium">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
