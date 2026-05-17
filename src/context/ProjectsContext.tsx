import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PROJECTS as initialProjects, EXPERIENCES as initialExperiences, Project, Experience } from '../data/portfolio';
import { 
  collection, 
  onSnapshot, 
  setDoc, 
  doc, 
  deleteDoc, 
  query, 
  orderBy,
  getDocs,
  writeBatch
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

export interface SiteConfig {
  home: {
    heroSubtitle: string;
    heroTitle: string;
    heroDescription: string;
    heroImage: string;
  };
  about: {
    subtitle: string;
    title: string;
    description: string;
  };
  experience: {
    title: string;
    description: string;
  };
  websiteDesign: {
    title: string;
    description: string;
  };
  eventPromotion: {
    title: string;
    description: string;
  };
  detailPage: {
    title: string;
    description: string;
  };
  printDesign: {
    title: string;
    description: string;
  };
  process: {
    title: string;
    description: string;
  };
  contact: {
    title: string;
    description: string;
  };
  logo: {
    type: 'text' | 'image';
    text: string;
    imageUrl: string;
  };
}

interface ProjectsContextType {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  addOrUpdateProject: (project: Project) => Promise<void>;
  deleteProjectById: (id: string) => Promise<void>;
  experiences: (Experience & { id: string })[];
  addOrUpdateExperience: (experience: Experience & { id: string }) => Promise<void>;
  deleteExperienceById: (id: string) => Promise<void>;
  messages: any[];
  addMessage: (message: any) => Promise<void>;
  deleteMessageById: (id: string) => Promise<void>;
  siteConfig: SiteConfig;
  updateSiteConfig: (config: SiteConfig) => Promise<void>;
  isLoading: boolean;
}

const DEFAULT_CONFIG: SiteConfig = {
  home: {
    heroSubtitle: "실무형 웹디자이너",
    heroTitle: "운영을 이해하는\n준비된 파트너입니다.",
    heroDescription: "단순히 보기 좋은 디자인을 넘어, 실제 쇼핑몰 운영 환경과 비즈니스 성과를 고려한 실무 중심의 디자인 솔루션을 제공합니다.",
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
  },
  about: {
    subtitle: "PRAGMATIC DESIGNER",
    title: "성장과 개선을 추구하는\n실무형 웹디자이너입니다.",
    description: "2004년부터 이어진 실무 경험을 통해 디자인, 기획, 광고 운영 그리고 상품 관리까지 쇼핑몰 비즈니스의 전 과정을 깊이 있게 이해하고 있습니다."
  },
  experience: {
    title: "경력 아카이브",
    description: "2004년부터 현재까지, 다양한 쇼핑몰과 브랜드의 디자인 및 운영 업무를 경험해온 실무 중심 경력입니다."
  },
  websiteDesign: {
    title: "웹사이트 디자인",
    description: "쇼핑몰과 브랜드 사이트 중심의 웹디자인 프로젝트입니다. 운영 흐름과 사용자 경험을 함께 고려해 작업했습니다."
  },
  eventPromotion: {
    title: "이벤트 / 프로모션",
    description: "이벤트와 프로모션 목적에 맞춰 사용자 시선과 정보 흐름을 중심으로 작업했습니다. 프로모션 운영 경험을 기반으로 실무 중심의 디자인을 진행합니다."
  },
  detailPage: {
    title: "상세페이지",
    description: "상품의 특징을 단순 나열하기보다 구매 흐름과 정보 전달을 고려해 구성했습니다. 실제 판매 환경을 기준으로 가독성과 정보 우선순위를 중심으로 작업했습니다."
  },
  printDesign: {
    title: "인쇄물 디자인",
    description: "패키지, 리플렛, 스티커 등 실제 제작 환경을 고려해 작업한 인쇄물 디자인입니다. 브랜드 톤과 사용 목적에 맞춰 다양한 인쇄물 디자인을 진행했습니다."
  },
  process: {
    title: "작업 프로세스",
    description: "디자인만 제작하는 방식보다 운영 환경과 작업 목적을 먼저 확인합니다. 실제 사용 환경과 운영 흐름을 고려해 프로젝트를 단계적으로 정리하며 작업합니다."
  },
  contact: {
    title: "함께 고민하겠습니다.",
    description: "작업 목적과 운영 환경에 맞는 방향으로 소통합니다. 간단한 내용만 보내주셔도 좋습니다. 확인 후 빠른 시일 내에 답변드리겠습니다."
  },
  logo: {
    type: 'text',
    text: 'PORTFOLIO',
    imageUrl: ''
  }
};

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjectsState] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<(Experience & { id: string })[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from Firestore
  useEffect(() => {
    const qProjects = query(collection(db, 'projects'));
    const unsubscribeProjects = onSnapshot(qProjects, (snapshot) => {
      const projectsData: Project[] = [];
      snapshot.forEach((doc) => {
        projectsData.push(doc.data() as Project);
      });

      if (projectsData.length === 0 && isLoading) {
        setProjectsState(initialProjects);
      } else {
        setProjectsState(projectsData);
      }
    }, (error) => {
      console.error("Firestore projects error:", error);
      setProjectsState(initialProjects);
    });

    const qExperiences = query(collection(db, 'experiences'), orderBy('order', 'asc'));
    const unsubscribeExperiences = onSnapshot(qExperiences, (snapshot) => {
      const experiencesData: (Experience & { id: string })[] = [];
      snapshot.forEach((doc) => {
        experiencesData.push({ ...doc.data() as Experience, id: doc.id });
      });

      if (experiencesData.length === 0 && isLoading) {
        // Map initial experiences to include sequential order
        const initialWithIds = initialExperiences.map((exp, idx) => ({ 
          ...exp, 
          id: `initial-${idx}`,
          order: idx 
        }));
        setExperiences(initialWithIds as (Experience & { id: string })[]);
      } else {
        setExperiences(experiencesData);
      }
    }, (error) => {
      console.error("Firestore experiences error:", error);
      setExperiences(initialExperiences.map((exp, idx) => ({ ...exp, id: `initial-${idx}`, order: idx })) as (Experience & { id: string })[]);
    });

    const qMessages = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubscribeMessages = onSnapshot(qMessages, (snapshot) => {
      const messagesData: any[] = [];
      snapshot.forEach((doc) => {
        messagesData.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messagesData);
    }, (error) => {
      console.error("Firestore messages error:", error);
    });

    const unsubscribeConfig = onSnapshot(doc(db, 'settings', 'siteConfig'), (snapshot) => {
      if (snapshot.exists()) {
        const remoteData = snapshot.data();
        setSiteConfig({
          home: { ...DEFAULT_CONFIG.home, ...remoteData.home },
          about: { ...DEFAULT_CONFIG.about, ...remoteData.about },
          experience: { ...DEFAULT_CONFIG.experience, ...remoteData.experience },
          websiteDesign: { ...DEFAULT_CONFIG.websiteDesign, ...remoteData.websiteDesign },
          eventPromotion: { ...DEFAULT_CONFIG.eventPromotion, ...remoteData.eventPromotion },
          detailPage: { ...DEFAULT_CONFIG.detailPage, ...remoteData.detailPage },
          printDesign: { ...DEFAULT_CONFIG.printDesign, ...remoteData.printDesign },
          process: { ...DEFAULT_CONFIG.process, ...remoteData.process },
          contact: { ...DEFAULT_CONFIG.contact, ...remoteData.contact },
          logo: { ...DEFAULT_CONFIG.logo, ...remoteData.logo }
        } as SiteConfig);
      }
      setIsLoading(false);
    }, (error) => {
      console.error("Firestore config error:", error);
      setIsLoading(false);
    });

    return () => {
      unsubscribeProjects();
      unsubscribeExperiences();
      unsubscribeMessages();
      unsubscribeConfig();
    };
  }, []);

  const addOrUpdateProject = async (project: Project) => {
    const path = `projects/${project.id}`;
    try {
      await setDoc(doc(db, 'projects', project.id), project);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  const deleteProjectById = async (id: string) => {
    const path = `projects/${id}`;
    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const addOrUpdateExperience = async (experience: Experience & { id: string }) => {
    const path = `experiences/${experience.id}`;
    try {
      await setDoc(doc(db, 'experiences', experience.id), experience);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  const deleteExperienceById = async (id: string) => {
    const path = `experiences/${id}`;
    try {
      await deleteDoc(doc(db, 'experiences', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const addMessage = async (message: any) => {
    const path = `messages/${message.id}`;
    try {
      await setDoc(doc(db, 'messages', message.id), message);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  const deleteMessageById = async (id: string) => {
    const path = `messages/${id}`;
    try {
      await deleteDoc(doc(db, 'messages', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const updateSiteConfig = async (config: SiteConfig) => {
    const path = `settings/siteConfig`;
    try {
      await setDoc(doc(db, 'settings', 'siteConfig'), config);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  // Legacy setProjects for compatibility with current Admin.tsx
  const setProjects = async (updatedProjects: Project[]) => {
    setProjectsState(updatedProjects);
  };

  return (
    <ProjectsContext.Provider value={{ 
      projects, 
      setProjects, 
      addOrUpdateProject, 
      deleteProjectById, 
      experiences,
      addOrUpdateExperience,
      deleteExperienceById,
      messages,
      addMessage,
      deleteMessageById,
      siteConfig,
      updateSiteConfig,
      isLoading 
    }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjectsContext() {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error('useProjectsContext must be used within a ProjectsProvider');
  }
  return context;
}
