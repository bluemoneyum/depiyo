import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Lock, Plus, Edit2, Trash2, Save, X, Settings, Briefcase, History, MessageSquare, ExternalLink } from 'lucide-react';
import { PROJECTS as initialProjects, Project, Experience } from '../data/portfolio';

import { useProjectsContext, SiteConfig } from '../context/ProjectsContext';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'projects' | 'settings' | 'experiences' | 'inquiries'>('projects');
  
  const { 
    projects, 
    addOrUpdateProject, 
    deleteProjectById, 
    experiences,
    addOrUpdateExperience,
    deleteExperienceById,
    messages,
    deleteMessageById,
    siteConfig, 
    updateSiteConfig 
  } = useProjectsContext();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingExperience, setEditingExperience] = useState<(Experience & { id: string }) | null>(null);
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  
  // Local state for editing SiteConfig
  const [localConfig, setLocalConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    if (siteConfig && !localConfig) {
      setLocalConfig({ ...siteConfig });
    }
  }, [siteConfig, localConfig]);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === '123qwe') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('비밀번호가 올바르지 않습니다.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteProjectById(id);
      } catch (err) {
        alert('삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject({ ...project });
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    // Sync tags with category for filtering
    const updatedProject = {
      ...editingProject,
      tags: [editingProject.category],
      isFeatured: editingProject.isFeatured || false,
      role: editingProject.role || '디자인',
    };

    try {
      await addOrUpdateProject(updatedProject);
      setEditingProject(null);
    } catch (err) {
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  const handleSaveConfig = async (e: FormEvent) => {
    e.preventDefault();
    if (!localConfig || isSavingConfig) return;

    setIsSavingConfig(true);
    try {
      await updateSiteConfig(localConfig);
      alert('설정이 저장되었습니다.');
    } catch (err) {
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setIsSavingConfig(false);
    }
  };

  const handleSaveExperience = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingExperience) return;

    try {
      await addOrUpdateExperience(editingExperience);
      setEditingExperience(null);
    } catch (err) {
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  const handleDeleteExperience = async (id: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteExperienceById(id);
      } catch (err) {
        alert('삭제 중 오류가 발생했습니다.');
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl shadow-neutral-200/50"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-neutral-100 rounded-2xl">
              <Lock className="w-8 h-8 text-neutral-400" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-8">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-neutral-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-black outline-none transition-all"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full py-4 bg-black text-white rounded-xl font-medium hover:bg-neutral-800 transition-colors"
            >
              로그인
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* Tabs */}
      <div className="flex gap-4 mb-12 border-b border-neutral-100 overflow-x-auto scroller-hide">
        <button 
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-2 px-6 py-4 font-bold border-b-2 transition-all whitespace-nowrap ${activeTab === 'projects' ? 'border-black text-black' : 'border-transparent text-neutral-400 hover:text-black'}`}
        >
          <Briefcase className="w-5 h-5" />
          프로젝트 관리
        </button>
        <button 
          onClick={() => setActiveTab('experiences')}
          className={`flex items-center gap-2 px-6 py-4 font-bold border-b-2 transition-all whitespace-nowrap ${activeTab === 'experiences' ? 'border-black text-black' : 'border-transparent text-neutral-400 hover:text-black'}`}
        >
          <History className="w-5 h-5" />
          경력 관리
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-6 py-4 font-bold border-b-2 transition-all whitespace-nowrap ${activeTab === 'settings' ? 'border-black text-black' : 'border-transparent text-neutral-400 hover:text-black'}`}
        >
          <Settings className="w-5 h-5" />
          사이트 정보 관리
        </button>
        <button 
          onClick={() => setActiveTab('inquiries')}
          className={`flex items-center gap-2 px-6 py-4 font-bold border-b-2 transition-all whitespace-nowrap ${activeTab === 'inquiries' ? 'border-black text-black' : 'border-transparent text-neutral-400 hover:text-black'}`}
        >
          <MessageSquare className="w-5 h-5" />
          문의 내역
        </button>
      </div>

      {activeTab === 'projects' ? (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">포트폴리오 관리</h1>
              <p className="text-neutral-500">프로젝트를 추가하거나 수정할 수 있습니다.</p>
            </div>
            <button 
              onClick={() => setEditingProject({
                id: Date.now().toString(),
                title: '',
                category: '웹사이트',
                role: '디자인',
                description: '',
                tools: [],
                year: new Date().getFullYear().toString(),
                thumbnail: '',
                tags: [],
                isFeatured: false,
              })}
              className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-neutral-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
              새 프로젝트 추가
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-6 border border-neutral-100 rounded-3xl hover:bg-neutral-50 transition-colors">
                <div className="flex items-center gap-6">
                  <div className="w-24 aspect-[16/9] bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {project.thumbnail ? (
                      <img src={project.thumbnail} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[10px] text-neutral-300">No Image</span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{project.title}</h3>
                      {project.isFeatured && (
                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-[10px] font-bold rounded-full">대표</span>
                      )}
                    </div>
                    <p className="text-neutral-500 text-sm">{project.category} · {project.year}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(project)} className="p-3 hover:bg-neutral-200 rounded-xl transition-colors">
                    <Edit2 className="w-5 h-5 text-neutral-600" />
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="p-3 hover:bg-red-50 rounded-xl transition-colors">
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : activeTab === 'experiences' ? (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">경력 관리</h1>
              <p className="text-neutral-500">경력 사항을 추가하거나 수정할 수 있습니다.</p>
            </div>
            <button 
              onClick={() => setEditingExperience({
                id: Date.now().toString(),
                company: '',
                period: '',
                role: '',
                projects: [''],
                skills: [''],
                order: experiences.length,
              })}
              className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-neutral-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
              새 경력 추가
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {experiences.map((exp) => (
              <div key={exp.id} className="flex items-center justify-between p-8 border border-neutral-100 rounded-3xl hover:bg-neutral-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-neutral-400 uppercase tracking-widest">{exp.period}</span>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingExperience({ ...exp })} className="p-2 hover:bg-neutral-200 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4 text-neutral-600" />
                      </button>
                      <button onClick={() => handleDeleteExperience(exp.id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{exp.company}</h3>
                  <p className="text-lg font-medium text-neutral-dark/70 mb-4">{exp.role}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : activeTab === 'settings' ? (
        <div className="max-w-4xl">
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-2">사이트 정보 관리</h1>
            <p className="text-neutral-500">각 페이지의 주요 멘트와 이미지를 관리합니다.</p>
          </div>

          {localConfig && (
            <form onSubmit={handleSaveConfig} className="space-y-12">
              {/* Logo Config */}
              <div className="p-8 border border-neutral-100 rounded-3xl space-y-8">
                <h2 className="text-xl font-bold pb-4 border-b border-neutral-50 flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full"></span>
                  로고 관리 (Logo)
                </h2>
                <div className="flex gap-4 p-1 bg-neutral-50 rounded-xl w-fit">
                  <button
                    type="button"
                    onClick={() => setLocalConfig({...localConfig, logo: {...localConfig.logo, type: 'text'}})}
                    className={`px-6 py-2 rounded-lg font-bold transition-all ${localConfig.logo?.type === 'text' ? 'bg-white shadow-sm text-black' : 'text-neutral-400 hover:text-neutral-600'}`}
                  >
                    텍스트 로고
                  </button>
                  <button
                    type="button"
                    onClick={() => setLocalConfig({...localConfig, logo: {...localConfig.logo, type: 'image'}})}
                    className={`px-6 py-2 rounded-lg font-bold transition-all ${localConfig.logo?.type === 'image' ? 'bg-white shadow-sm text-black' : 'text-neutral-400 hover:text-neutral-600'}`}
                  >
                    이미지 로고
                  </button>
                </div>

                {localConfig.logo?.type === 'text' ? (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-500">로고 텍스트</label>
                    <input
                      type="text"
                      value={localConfig.logo.text}
                      onChange={(e) => setLocalConfig({
                        ...localConfig,
                        logo: { ...localConfig.logo, text: e.target.value }
                      })}
                      className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-500">로고 이미지 URL</label>
                    <input
                      type="text"
                      value={localConfig.logo.imageUrl}
                      onChange={(e) => setLocalConfig({
                        ...localConfig,
                        logo: { ...localConfig.logo, imageUrl: e.target.value }
                      })}
                      placeholder="https://..."
                      className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Home Config */}
              <div className="p-8 border border-neutral-100 rounded-3xl space-y-8">
                <h2 className="text-xl font-bold pb-4 border-b border-neutral-50 flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full"></span>
                  홈페이지 (Home)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-500">히어로 소제목</label>
                    <input
                      type="text"
                      value={localConfig.home.heroSubtitle}
                      onChange={(e) => setLocalConfig({
                        ...localConfig,
                        home: { ...localConfig.home, heroSubtitle: e.target.value }
                      })}
                      className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-500">히어로 이미지 URL</label>
                    <input
                      type="text"
                      value={localConfig.home.heroImage}
                      onChange={(e) => setLocalConfig({
                        ...localConfig,
                        home: { ...localConfig.home, heroImage: e.target.value }
                      })}
                      className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-500">히어로 제목 (줄바꿈은 \n 사용)</label>
                  <textarea
                    rows={2}
                    value={localConfig.home.heroTitle}
                    onChange={(e) => setLocalConfig({
                      ...localConfig,
                      home: { ...localConfig.home, heroTitle: e.target.value }
                    })}
                    className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-500">히어로 설명</label>
                  <textarea
                    rows={3}
                    value={localConfig.home.heroDescription}
                    onChange={(e) => setLocalConfig({
                      ...localConfig,
                      home: { ...localConfig.home, heroDescription: e.target.value }
                    })}
                    className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                  />
                </div>

                <div className="pt-6 border-t border-neutral-50">
                  <h3 className="font-bold text-neutral-800 mb-4 italic text-sm"># 대표 프로젝트 섹션 (Featured Projects)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-neutral-400">제목</label>
                      <input
                        type="text"
                        value={localConfig.home.featuredTitle}
                        onChange={(e) => setLocalConfig({...localConfig, home: {...localConfig.home, featuredTitle: e.target.value}})}
                        className="w-full px-4 py-2 bg-neutral-50 border border-neutral-100 rounded-lg focus:ring-2 focus:ring-black outline-none text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-neutral-400">설명</label>
                      <input
                        type="text"
                        value={localConfig.home.featuredDescription}
                        onChange={(e) => setLocalConfig({...localConfig, home: {...localConfig.home, featuredDescription: e.target.value}})}
                        className="w-full px-4 py-2 bg-neutral-50 border border-neutral-100 rounded-lg focus:ring-2 focus:ring-black outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-50">
                  <h3 className="font-bold text-neutral-800 mb-4 italic text-sm"># 경력 요약 섹션 (Experience Summary)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-neutral-400">제목</label>
                      <input
                        type="text"
                        value={localConfig.home.experienceTitle}
                        onChange={(e) => setLocalConfig({...localConfig, home: {...localConfig.home, experienceTitle: e.target.value}})}
                        className="w-full px-4 py-2 bg-neutral-50 border border-neutral-100 rounded-lg focus:ring-2 focus:ring-black outline-none text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-neutral-400">인용구/설명</label>
                      <input
                        type="text"
                        value={localConfig.home.experienceSubtitle}
                        onChange={(e) => setLocalConfig({...localConfig, home: {...localConfig.home, experienceSubtitle: e.target.value}})}
                        className="w-full px-4 py-2 bg-neutral-50 border border-neutral-100 rounded-lg focus:ring-2 focus:ring-black outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-50">
                  <h3 className="font-bold text-neutral-800 mb-4 italic text-sm"># 마인드셋 섹션 (Mindset / Philosophy)</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-neutral-400">상단 레이블</label>
                        <input
                          type="text"
                          value={localConfig.home.philosophyLabel}
                          onChange={(e) => setLocalConfig({...localConfig, home: {...localConfig.home, philosophyLabel: e.target.value}})}
                          className="w-full px-4 py-2 bg-neutral-50 border border-neutral-100 rounded-lg focus:ring-2 focus:ring-black outline-none text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-neutral-400">제목 (줄바꿈 \n)</label>
                        <input
                          type="text"
                          value={localConfig.home.philosophyTitle}
                          onChange={(e) => setLocalConfig({...localConfig, home: {...localConfig.home, philosophyTitle: e.target.value}})}
                          className="w-full px-4 py-2 bg-neutral-50 border border-neutral-100 rounded-lg focus:ring-2 focus:ring-black outline-none text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-neutral-400">설명</label>
                      <textarea
                        rows={2}
                        value={localConfig.home.philosophyDescription}
                        onChange={(e) => setLocalConfig({...localConfig, home: {...localConfig.home, philosophyDescription: e.target.value}})}
                        className="w-full px-4 py-2 bg-neutral-50 border border-neutral-100 rounded-lg focus:ring-2 focus:ring-black outline-none text-sm"
                      />
                    </div>
                    
                    {/* Grid items */}
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {localConfig.home.philosophyItems.map((item, idx) => (
                        <div key={idx} className="p-4 bg-neutral-50 rounded-xl border border-neutral-100 space-y-2">
                          <input
                            type="text"
                            placeholder="항목 제목"
                            value={item.label}
                            onChange={(e) => {
                              const newItems = [...localConfig.home.philosophyItems];
                              newItems[idx].label = e.target.value;
                              setLocalConfig({...localConfig, home: {...localConfig.home, philosophyItems: newItems}});
                            }}
                            className="w-full px-3 py-1 bg-white border border-neutral-100 rounded-lg text-xs font-bold"
                          />
                          <input
                            type="text"
                            placeholder="항목 설명"
                            value={item.desc}
                            onChange={(e) => {
                              const newItems = [...localConfig.home.philosophyItems];
                              newItems[idx].desc = e.target.value;
                              setLocalConfig({...localConfig, home: {...localConfig.home, philosophyItems: newItems}});
                            }}
                            className="w-full px-3 py-1 bg-white border border-neutral-100 rounded-lg text-[10px]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-50">
                  <h3 className="font-bold text-neutral-800 mb-4 italic text-sm"># 하단 호출 섹션 (CTA)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-neutral-400">제목 (줄바꿈 \n)</label>
                      <input
                        type="text"
                        value={localConfig.home.ctaTitle}
                        onChange={(e) => setLocalConfig({...localConfig, home: {...localConfig.home, ctaTitle: e.target.value}})}
                        className="w-full px-4 py-2 bg-neutral-50 border border-neutral-100 rounded-lg focus:ring-2 focus:ring-black outline-none text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-neutral-400">설명</label>
                      <input
                        type="text"
                        value={localConfig.home.ctaDescription}
                        onChange={(e) => setLocalConfig({...localConfig, home: {...localConfig.home, ctaDescription: e.target.value}})}
                        className="w-full px-4 py-2 bg-neutral-50 border border-neutral-100 rounded-lg focus:ring-2 focus:ring-black outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* About Config */}
              <div className="p-8 border border-neutral-100 rounded-3xl space-y-8">
                <h2 className="text-xl font-bold pb-4 border-b border-neutral-50 flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full"></span>
                  소개 페이지 (About)
                </h2>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-500">상단 소제목</label>
                  <input
                    type="text"
                    value={localConfig.about.subtitle}
                    onChange={(e) => setLocalConfig({
                      ...localConfig,
                      about: { ...localConfig.about, subtitle: e.target.value }
                    })}
                    className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-500">메인 제목</label>
                  <textarea
                    rows={2}
                    value={localConfig.about.title}
                    onChange={(e) => setLocalConfig({
                      ...localConfig,
                      about: { ...localConfig.about, title: e.target.value }
                    })}
                    className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-500">소개 본문</label>
                  <textarea
                    rows={4}
                    value={localConfig.about.description}
                    onChange={(e) => setLocalConfig({
                      ...localConfig,
                      about: { ...localConfig.about, description: e.target.value }
                    })}
                    className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                  />
                </div>
              </div>

              {/* Experience Config */}
              <div className="p-8 border border-neutral-100 rounded-3xl space-y-8">
                <h2 className="text-xl font-bold pb-4 border-b border-neutral-50 flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full"></span>
                  경력 페이지 (Experience)
                </h2>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-500">상단 제목</label>
                  <input
                    type="text"
                    value={localConfig.experience.title}
                    onChange={(e) => setLocalConfig({
                      ...localConfig,
                      experience: { ...localConfig.experience, title: e.target.value }
                    })}
                    className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-500">페이지 설명</label>
                  <textarea
                    rows={2}
                    value={localConfig.experience.description}
                    onChange={(e) => setLocalConfig({
                      ...localConfig,
                      experience: { ...localConfig.experience, description: e.target.value }
                    })}
                    className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                  />
                </div>
              </div>

              {/* Category Pages Config */}
              <div className="p-8 border border-neutral-100 rounded-3xl space-y-12">
                <h2 className="text-xl font-bold pb-4 border-b border-neutral-50 flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full"></span>
                  카테고리별 안내 멘트
                </h2>
                
                {/* Website Design */}
                <div className="space-y-4">
                  <h3 className="font-bold text-neutral-800">웹사이트 디자인</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <input
                      type="text"
                      placeholder="제목"
                      value={localConfig.websiteDesign.title}
                      onChange={(e) => setLocalConfig({
                        ...localConfig,
                        websiteDesign: { ...localConfig.websiteDesign, title: e.target.value }
                      })}
                      className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                    />
                    <textarea
                      rows={2}
                      placeholder="설명"
                      value={localConfig.websiteDesign.description}
                      onChange={(e) => setLocalConfig({
                        ...localConfig,
                        websiteDesign: { ...localConfig.websiteDesign, description: e.target.value }
                      })}
                      className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>
                </div>

                {/* Event Promotion */}
                <div className="space-y-4">
                  <h3 className="font-bold text-neutral-800">이벤트 / 프로모션</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <input
                      type="text"
                      placeholder="제목"
                      value={localConfig.eventPromotion.title}
                      onChange={(e) => setLocalConfig({
                        ...localConfig,
                        eventPromotion: { ...localConfig.eventPromotion, title: e.target.value }
                      })}
                      className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                    />
                    <textarea
                      rows={2}
                      placeholder="설명"
                      value={localConfig.eventPromotion.description}
                      onChange={(e) => setLocalConfig({
                        ...localConfig,
                        eventPromotion: { ...localConfig.eventPromotion, description: e.target.value }
                      })}
                      className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>
                </div>

                {/* Detail Page */}
                <div className="space-y-4">
                  <h3 className="font-bold text-neutral-800">상세페이지</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <input
                      type="text"
                      placeholder="제목"
                      value={localConfig.detailPage.title}
                      onChange={(e) => setLocalConfig({
                        ...localConfig,
                        detailPage: { ...localConfig.detailPage, title: e.target.value }
                      })}
                      className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                    />
                    <textarea
                      rows={2}
                      placeholder="설명"
                      value={localConfig.detailPage.description}
                      onChange={(e) => setLocalConfig({
                        ...localConfig,
                        detailPage: { ...localConfig.detailPage, description: e.target.value }
                      })}
                      className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>
                </div>

                {/* Print Design */}
                <div className="space-y-4">
                  <h3 className="font-bold text-neutral-800">인쇄물 디자인</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <input
                      type="text"
                      placeholder="제목"
                      value={localConfig.printDesign.title}
                      onChange={(e) => setLocalConfig({
                        ...localConfig,
                        printDesign: { ...localConfig.printDesign, title: e.target.value }
                      })}
                      className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                    />
                    <textarea
                      rows={2}
                      placeholder="설명"
                      value={localConfig.printDesign.description}
                      onChange={(e) => setLocalConfig({
                        ...localConfig,
                        printDesign: { ...localConfig.printDesign, description: e.target.value }
                      })}
                      className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Other Pages Config */}
              <div className="p-8 border border-neutral-100 rounded-3xl space-y-12">
                <h2 className="text-xl font-bold pb-4 border-b border-neutral-50 flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full"></span>
                  기타 페이지 안내 멘트
                </h2>

                {/* Process */}
                <div className="space-y-4">
                  <h3 className="font-bold text-neutral-800">작업 프로세스 (Process)</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <input
                      type="text"
                      placeholder="제목"
                      value={localConfig.process.title}
                      onChange={(e) => setLocalConfig({
                        ...localConfig,
                        process: { ...localConfig.process, title: e.target.value }
                      })}
                      className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                    />
                    <textarea
                      rows={2}
                      placeholder="설명"
                      value={localConfig.process.description}
                      onChange={(e) => setLocalConfig({
                        ...localConfig,
                        process: { ...localConfig.process, description: e.target.value }
                      })}
                      className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-4">
                  <h3 className="font-bold text-neutral-800">문의하기 (Contact)</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <input
                      type="text"
                      placeholder="제목"
                      value={localConfig.contact.title}
                      onChange={(e) => setLocalConfig({
                        ...localConfig,
                        contact: { ...localConfig.contact, title: e.target.value }
                      })}
                      className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                    />
                    <textarea
                      rows={2}
                      placeholder="설명"
                      value={localConfig.contact.description}
                      onChange={(e) => setLocalConfig({
                        ...localConfig,
                        contact: { ...localConfig.contact, description: e.target.value }
                      })}
                      className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSavingConfig}
                  className={`flex items-center gap-2 px-12 py-5 bg-black text-white rounded-2xl font-bold transition-all shadow-lg shadow-neutral-200 ${isSavingConfig ? 'opacity-50 cursor-not-allowed' : 'hover:bg-neutral-800'}`}
                >
                  {isSavingConfig ? (
                    '저장 중...'
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      전체 설정 저장하기
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <div className="max-w-6xl">
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-2">프로젝트 문의 내역</h1>
            <p className="text-neutral-500">문의하기 페이지를 통해 접수된 내용을 확인할 수 있습니다.</p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {messages.length === 0 ? (
              <div className="p-20 text-center border-2 border-dashed border-neutral-100 rounded-3xl">
                <p className="text-neutral-400 font-medium">아직 접수된 문의가 없습니다.</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="p-8 border border-neutral-100 rounded-3xl hover:border-neutral-200 transition-all bg-white group">
                  <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-neutral-soft text-xs font-bold rounded-full">
                          {msg.type}
                        </span>
                        <span className="text-xs text-neutral-400">
                          {new Date(msg.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <h3 className="text-xl font-bold">{msg.name}</h3>
                        <span className="text-neutral-300">|</span>
                        <p className="text-neutral-600 font-medium flex items-center gap-1">
                          <History className="w-3 h-3" /> {msg.contact}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        if(window.confirm('문의 내역을 삭제하시겠습니까?')) {
                          deleteMessageById(msg.id);
                        }
                      }}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-xl md:self-start opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-6 bg-neutral-soft rounded-2xl">
                    <p className="text-neutral-dark/80 whitespace-pre-wrap leading-relaxed">
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Experience Edit Modal */}
      {editingExperience && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white w-full max-w-2xl rounded-3xl max-h-[90vh] overflow-y-auto p-10"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">경력 편집</h2>
              <button onClick={() => setEditingExperience(null)} className="p-2 hover:bg-neutral-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveExperience} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-500">회사명</label>
                  <input
                    type="text"
                    required
                    value={editingExperience.company}
                    onChange={(e) => setEditingExperience({ ...editingExperience, company: e.target.value })}
                    className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-500">기간</label>
                  <input
                    type="text"
                    required
                    placeholder="예: 2024.08 - 2026.03"
                    value={editingExperience.period}
                    onChange={(e) => setEditingExperience({ ...editingExperience, period: e.target.value })}
                    className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-500">역할 및 직무</label>
                <input
                  type="text"
                  required
                  value={editingExperience.role}
                  onChange={(e) => setEditingExperience({ ...editingExperience, role: e.target.value })}
                  className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-neutral-500">주요 프로젝트 및 업무</label>
                  <button 
                    type="button"
                    onClick={() => setEditingExperience({ ...editingExperience, projects: [...editingExperience.projects, ''] })}
                    className="text-xs font-bold text-neutral-400 hover:text-black flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> 추가
                  </button>
                </div>
                {editingExperience.projects.map((p, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={p}
                      onChange={(e) => {
                        const newProjects = [...editingExperience.projects];
                        newProjects[idx] = e.target.value;
                        setEditingExperience({ ...editingExperience, projects: newProjects });
                      }}
                      className="flex-1 px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                    />
                    <button 
                      type="button"
                      onClick={() => {
                        const newProjects = editingExperience.projects.filter((_, i) => i !== idx);
                        setEditingExperience({ ...editingExperience, projects: newProjects });
                      }}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-xl"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-neutral-500">핵심 스킬 (선택)</label>
                  <button 
                    type="button"
                    onClick={() => setEditingExperience({ ...editingExperience, skills: [...editingExperience.skills, ''] })}
                    className="text-xs font-bold text-neutral-400 hover:text-black flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> 추가
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {editingExperience.skills.map((s, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={s}
                        onChange={(e) => {
                          const newSkills = [...editingExperience.skills];
                          newSkills[idx] = e.target.value;
                          setEditingExperience({ ...editingExperience, skills: newSkills });
                        }}
                        className="flex-1 px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                      />
                      <button 
                        type="button"
                        onClick={() => {
                          const newSkills = editingExperience.skills.filter((_, i) => i !== idx);
                          setEditingExperience({ ...editingExperience, skills: newSkills });
                        }}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-500">정렬 순서 (작을수록 상단)</label>
                <input
                  type="number"
                  value={editingExperience.order}
                  onChange={(e) => setEditingExperience({ ...editingExperience, order: parseInt(e.target.value) || 0 })}
                  className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 py-4 bg-black text-white rounded-2xl font-bold hover:bg-neutral-800 transition-colors"
                >
                  <Save className="w-5 h-5" />
                  저장하기
                </button>
                <button
                  type="button"
                  onClick={() => setEditingExperience(null)}
                  className="px-8 py-4 bg-neutral-100 text-neutral-600 rounded-2xl font-bold hover:bg-neutral-200 transition-colors"
                >
                  취소
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Edit Modal */}
      {editingProject && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white w-full max-w-2xl rounded-3xl max-h-[90vh] overflow-y-auto p-10"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">프로젝트 편집</h2>
              <button onClick={() => setEditingProject(null)} className="p-2 hover:bg-neutral-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-500">프로젝트명</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-500">카테고리</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                  >
                    <option value="웹사이트">웹사이트</option>
                    <option value="상세페이지">상세페이지</option>
                    <option value="이벤트/프로모션">이벤트/프로모션</option>
                    <option value="인쇄물">인쇄물</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-500">담당 역할</label>
                  <input
                    type="text"
                    required
                    placeholder="예: 디자인 + 운영"
                    value={editingProject.role || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, role: e.target.value })}
                    className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                  />
                </div>
                <div className="flex items-center gap-3 h-full pt-8">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={editingProject.isFeatured || false}
                    onChange={(e) => setEditingProject({ ...editingProject, isFeatured: e.target.checked })}
                    className="w-5 h-5 rounded border-neutral-300 text-black focus:ring-black"
                  />
                  <label htmlFor="isFeatured" className="text-sm font-medium cursor-pointer">대표 프로젝트로 설정 (홈페이지 노출)</label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-500">설명</label>
                <textarea
                  required
                  rows={4}
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-500">대표 썸네일 URL (16:9 추천)</label>
                  <input
                    type="text"
                    required
                    value={editingProject.thumbnail}
                    onChange={(e) => setEditingProject({ ...editingProject, thumbnail: e.target.value })}
                    className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-500">상세 이미지 URL (선택사항)</label>
                  <input
                    type="text"
                    value={editingProject.detailImage || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, detailImage: e.target.value })}
                    className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                    placeholder="미입력 시 썸네일 사용"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-500">제작연도</label>
                  <input
                    type="text"
                    value={editingProject.year}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-500">사용한 도구 (쉼표로 구분)</label>
                  <input
                    type="text"
                    value={editingProject.tools.join(', ')}
                    onChange={(e) => setEditingProject({ ...editingProject, tools: e.target.value.split(',').map(t => t.trim()) })}
                    className="w-full px-5 py-3 bg-neutral-50 border border-neutral-100 rounded-xl focus:ring-2 focus:ring-black outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 py-4 bg-black text-white rounded-2xl font-bold hover:bg-neutral-800 transition-colors"
                >
                  <Save className="w-5 h-5" />
                  저장하기
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-8 py-4 bg-neutral-100 text-neutral-600 rounded-2xl font-bold hover:bg-neutral-200 transition-colors"
                >
                  취소
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
