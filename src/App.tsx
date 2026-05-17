import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About, { ExperiencePage } from './pages/AboutAndExperience';
import Process from './pages/Process';
import Contact from './pages/Contact';
import CategoryPage from './pages/CategoryPage';
import ProjectDetail from './pages/ProjectDetail';
import Admin from './pages/Admin';

import { ProjectsProvider } from './context/ProjectsContext';

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <ProjectsProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <ScrollToTop />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/process" element={<Process />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/admin" element={<Admin />} />
              
              <Route path="/website-design" element={
                <CategoryPage 
                  categoryTag="웹사이트"
                  configKey="websiteDesign"
                />
              } />
              
              <Route path="/event-promotion" element={
                <CategoryPage 
                  categoryTag="이벤트/프로모션"
                  configKey="eventPromotion"
                />
              } />
              
              <Route path="/detail-page" element={
                <CategoryPage 
                  categoryTag="상세페이지"
                  configKey="detailPage"
                />
              } />
              
              <Route path="/print-design" element={
                <CategoryPage 
                  categoryTag="인쇄물"
                  configKey="printDesign"
                />
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ProjectsProvider>
  );
}
