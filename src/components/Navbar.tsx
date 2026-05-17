import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useProjectsContext } from '../context/ProjectsContext';

const MENU_ITEMS = [
  { name: '홈', path: '/' },
  { name: '소개', path: '/about' },
  { name: '웹사이트 디자인', path: '/website-design' },
  { name: '이벤트 / 프로모션', path: '/event-promotion' },
  { name: '상세페이지', path: '/detail-page' },
  { name: '인쇄물 디자인', path: '/print-design' },
  { name: '경력', path: '/experience' },
  { name: '작업 과정', path: '/process' },
  { name: '문의하기', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { siteConfig, isLoading } = useProjectsContext();

  const LogoContent = () => {
    if (isLoading) return <span className="opacity-0">PORTFOLIO</span>;
    if (siteConfig.logo?.type === 'image' && siteConfig.logo.imageUrl) {
      return <img src={siteConfig.logo.imageUrl} alt="Logo" className="h-8 w-auto object-contain" />;
    }
    return <span className="text-xl font-bold tracking-tighter">{siteConfig.logo?.text || 'PORTFOLIO'}</span>;
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <LogoContent />
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-black ${
                location.pathname === item.path ? 'text-black font-semibold' : 'text-neutral-500'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-neutral-100 py-6 px-6 flex flex-col gap-4"
        >
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`text-lg font-medium ${
                location.pathname === item.path ? 'text-black' : 'text-neutral-500'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
