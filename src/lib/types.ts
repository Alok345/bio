export interface Project {
  id: string;
  name: string;
  description: string;
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  techStack: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  fromGithub?: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  logo?: string;
  level: number; // 0-100
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string;
  description?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  year: string;
}

export interface ProfileData {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  whatsapp: string;
  profileImageUrl?: string;
  cvUrl?: string;
  resumeText?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  sessionId: string;
  messages: ChatMessage[];
  messageCount: number;
  lastMessageTime: Date;
}
