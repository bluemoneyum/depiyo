import { motion } from 'motion/react';
import { useProjectsContext } from '../context/ProjectsContext';

const STEPS = [
  // ... (keep STEPS as they are for now unless instructed otherwise)
  {
    num: '01',
    title: '작업 목적 및 운영 환경 확인',
    desc: '단순 디자인 방향보다 운영 목적, 사용자 흐름, 사용 위치, 관리 방식을 함께 고려합니다. 프로젝트의 목적과 실제 사용 환경을 먼저 확인합니다.',
  },
  {
    num: '02',
    title: '구조 및 방향 정리',
    desc: '정보 구조와 콘텐츠 흐름, 시각 우선순위를 정리합니다. 작업 전 전체 흐름과 우선순위를 정리하여 효율적인 진행 흐름을 설계합니다.',
  },
  {
    num: '03',
    title: '디자인 작업 진행',
    desc: '가독성, 정보 전달, 운영 효율을 최우선으로 고려하여 웹디자인, 상세페이지, 프로모션 콘텐츠 등을 제작합니다.',
  },
  {
    num: '04',
    title: '수정 및 보완',
    desc: '실제 운영 환경 기준으로 디자인 수정 및 보완을 진행합니다. 유관 부서와의 긴밀한 소통을 통해 최적의 방향으로 조정합니다.',
  },
  {
    num: '05',
    title: '최종 전달 및 운영 대응',
    desc: '최종 결과물 전달 후에도 유지보수와 운영 효율을 지속적으로 확인하여 비즈니스에 실질적인 도움이 되도록 대응합니다.',
  },
];

export default function Process() {
  const { siteConfig, isLoading } = useProjectsContext();

  if (isLoading) return null;

  return (
    <div className="pt-20">
      <header className="px-6 py-32 md:py-40 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">{siteConfig.process.title}</h1>
        <p className="text-xl text-neutral-gray max-w-3xl leading-relaxed whitespace-pre-line">
          {siteConfig.process.description}
        </p>
      </header>

      <section className="px-6 pb-40 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-12">
          {STEPS.map((step, idx) => (
            <motion.div 
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row gap-8 md:gap-20 p-12 bg-neutral-soft rounded-3xl transition-all duration-500 border border-transparent hover:border-neutral-200 hover:bg-white hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] group"
            >
              <span className="text-6xl md:text-8xl font-bold tracking-tighter text-neutral-200 transition-colors group-hover:text-black/5">{step.num}</span>
              <div className="pt-4">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">{step.title}</h2>
                <p className="text-lg text-neutral-gray leading-relaxed max-w-2xl">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
