import { Link } from 'react-router-dom';
import { useProjectsContext } from '../context/ProjectsContext';

export default function Footer() {
  const { siteConfig, isLoading } = useProjectsContext();

  const LogoContent = () => {
    if (isLoading) return <span className="opacity-0">PORTFOLIO</span>;
    if (siteConfig.logo?.type === 'image' && siteConfig.logo.imageUrl) {
      return <img src={siteConfig.logo.imageUrl} alt="Logo" className="h-8 w-auto object-contain grayscale" />;
    }
    return <span className="text-2xl font-bold tracking-tighter">{siteConfig.logo?.text || 'PORTFOLIO'}</span>;
  };

  return (
    <footer className="bg-neutral-soft py-20 px-6 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="max-w-md">
          <div className="mb-4">
            <LogoContent />
          </div>
          <p className="text-neutral-gray text-sm leading-relaxed mb-6">
            운영을 이해하는 실무형 웹디자이너.<br />
            다양한 실무 경험으로 프로젝트의 목적과 비즈니스의 흐름을 고려한 최적의 결과물을 제안합니다.
          </p>
          <div className="flex gap-4">
            <a href="mailto:depiyo302@gmail.com" className="text-sm font-medium hover:underline">depiyo302@gmail.com</a>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-12">
          <div>
            <h3 className="font-bold text-sm mb-4">메뉴</h3>
            <ul className="space-y-2 text-sm text-neutral-gray">
              <li><Link to="/" className="hover:text-black">홈</Link></li>
              <li><Link to="/about" className="hover:text-black">소개</Link></li>
              <li><Link to="/experience" className="hover:text-black">경력</Link></li>
              <li><Link to="/process" className="hover:text-black">작업 과정</Link></li>
              <li><Link to="/contact" className="hover:text-black">문의하기</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm mb-4">카테고리</h3>
            <ul className="space-y-2 text-sm text-neutral-gray">
              <li><Link to="/website-design" className="hover:text-black">웹사이트 디자인</Link></li>
              <li><Link to="/event-promotion" className="hover:text-black">이벤트 / 프로모션</Link></li>
              <li><Link to="/detail-page" className="hover:text-black">상세페이지</Link></li>
              <li><Link to="/print-design" className="hover:text-black">인쇄물 디자인</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-neutral-gray">© 2026 Practical Designer. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link to="/admin" className="text-neutral-300 hover:text-neutral-600 text-[10px] transition-colors tracking-widest uppercase">
            Admin Access
          </Link>
          <p className="text-xs text-neutral-gray">Designed based on practical experience.</p>
        </div>
      </div>
    </footer>
  );
}
