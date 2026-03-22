import { db } from "./firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import {
  Project,
  Skill,
  Education,
  Experience,
  Achievement,
  ProfileData,
} from "./types";
import { defaultProfile } from "./data";

/**
 * Utility function to get the primary portfolio admin user document.
 * Since this is a personal portfolio, we query the 'users' collection 
 * and pick the first available user document.
 */
async function getAdminUserDoc() {
  const usersSnap = await getDocs(collection(db, "users"));
  if (usersSnap.empty) {
    return null;
  }
  return usersSnap.docs[0];
}

// ============================================
// PROFILE
// ============================================

export async function getProfile(): Promise<ProfileData | null> {
  const adminDoc = await getAdminUserDoc();
  if (!adminDoc) return null;
  const data = adminDoc.data();
  return data.profile ? (data.profile as ProfileData) : null;
}

export async function updateProfile(data: Partial<ProfileData>) {
  const adminDoc = await getAdminUserDoc();
  if (!adminDoc) throw new Error("No admin user found to update");
  
  const currentData = adminDoc.data();
  await updateDoc(doc(db, "users", adminDoc.id), {
    profile: {
      ...currentData.profile,
      ...data
    }
  });
}

// ============================================
// PROJECTS
// ============================================

export async function getProjects(): Promise<Project[]> {
  const adminDoc = await getAdminUserDoc();
  if (!adminDoc) return [];
  const data = adminDoc.data();
  
  if (data.projects && Array.isArray(data.projects)) {
    return data.projects.map((p: any, index: number) => ({
      ...p,
      id: p.id || `proj-${index}`,
      createdAt: p.createdAt?.toDate ? p.createdAt.toDate() : new Date(),
      updatedAt: p.updatedAt?.toDate ? p.updatedAt.toDate() : new Date(),
    })) as Project[];
  }
  return [];
}

export async function addProject(project: Omit<Project, "id">) {
  const adminDoc = await getAdminUserDoc();
  if (!adminDoc) throw new Error("No admin user found");
  
  const currentData = adminDoc.data();
  const currentProjects = currentData.projects || [];
  
  const newProject = {
    ...project,
    id: Date.now().toString(),
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };

  await updateDoc(doc(db, "users", adminDoc.id), {
    projects: [...currentProjects, newProject]
  });
}

export async function updateProject(id: string, data: Partial<Project>) {
  const adminDoc = await getAdminUserDoc();
  if (!adminDoc) throw new Error("No admin user found");
  
  const currentData = adminDoc.data();
  const currentProjects = currentData.projects || [];
  const updatedProjects = currentProjects.map((p: any) => 
    p.id === id ? { ...p, ...data, updatedAt: Timestamp.now() } : p
  );

  await updateDoc(doc(db, "users", adminDoc.id), {
    projects: updatedProjects
  });
}

export async function deleteProject(id: string) {
  const adminDoc = await getAdminUserDoc();
  if (!adminDoc) throw new Error("No admin user found");
  
  const currentData = adminDoc.data();
  const currentProjects = currentData.projects || [];
  const updatedProjects = currentProjects.filter((p: any) => p.id !== id);

  await updateDoc(doc(db, "users", adminDoc.id), {
    projects: updatedProjects
  });
}

// ============================================
// SKILLS
// ============================================

export async function getSkills(): Promise<Skill[]> {
  const adminDoc = await getAdminUserDoc();
  if (!adminDoc) return [];
  const data = adminDoc.data();
  return (data.skills || []) as Skill[];
}

export async function addSkill(skill: Omit<Skill, "id">) {
  const adminDoc = await getAdminUserDoc();
  if (!adminDoc) throw new Error("No admin user found");
  
  const currentData = adminDoc.data();
  const currentSkills = currentData.skills || [];
  const newSkill = { ...skill, id: Date.now().toString() };

  await updateDoc(doc(db, "users", adminDoc.id), {
    skills: [...currentSkills, newSkill]
  });
}

export async function updateSkill(id: string, data: Partial<Skill>) {
  const adminDoc = await getAdminUserDoc();
  if (!adminDoc) throw new Error("No admin user found");
  
  const currentData = adminDoc.data();
  const currentSkills = currentData.skills || [];
  const updatedSkills = currentSkills.map((s: any) => 
    s.id === id ? { ...s, ...data } : s
  );

  await updateDoc(doc(db, "users", adminDoc.id), {
    skills: updatedSkills
  });
}

export async function deleteSkill(id: string) {
  const adminDoc = await getAdminUserDoc();
  if (!adminDoc) throw new Error("No admin user found");
  
  const currentData = adminDoc.data();
  const currentSkills = currentData.skills || [];
  const updatedSkills = currentSkills.filter((s: any) => s.id !== id);

  await updateDoc(doc(db, "users", adminDoc.id), {
    skills: updatedSkills
  });
}

// ============================================
// EDUCATION
// ============================================

export async function getEducation(): Promise<Education[]> {
  const adminDoc = await getAdminUserDoc();
  if (!adminDoc) return [];
  const data = adminDoc.data();
  return (data.education || []) as Education[];
}

export async function addEducation(edu: Omit<Education, "id">) {
  const adminDoc = await getAdminUserDoc();
  if (!adminDoc) throw new Error("No admin user found");
  
  const currentData = adminDoc.data();
  const currentEdu = currentData.education || [];
  const newEdu = { ...edu, id: Date.now().toString() };

  await updateDoc(doc(db, "users", adminDoc.id), {
    education: [...currentEdu, newEdu]
  });
}

export async function updateEducation(id: string, data: Partial<Education>) {
  const adminDoc = await getAdminUserDoc();
  if (!adminDoc) throw new Error("No admin user found");
  
  const currentData = adminDoc.data();
  const currentEdu = currentData.education || [];
  const updatedEdu = currentEdu.map((e: any) => 
    e.id === id ? { ...e, ...data } : e
  );

  await updateDoc(doc(db, "users", adminDoc.id), {
    education: updatedEdu
  });
}

export async function deleteEducation(id: string) {
  const adminDoc = await getAdminUserDoc();
  if (!adminDoc) throw new Error("No admin user found");
  
  const currentData = adminDoc.data();
  const currentEdu = currentData.education || [];
  const updatedEdu = currentEdu.filter((e: any) => e.id !== id);

  await updateDoc(doc(db, "users", adminDoc.id), {
    education: updatedEdu
  });
}

// ============================================
// EXPERIENCE
// ============================================

export async function getExperiences(): Promise<Experience[]> {
  const adminDoc = await getAdminUserDoc();
  if (!adminDoc) return [];
  const data = adminDoc.data();
  return (data.experiences || []) as Experience[];
}

export async function addExperience(exp: Omit<Experience, "id">) {
  const adminDoc = await getAdminUserDoc();
  if (!adminDoc) throw new Error("No admin user found");
  
  const currentData = adminDoc.data();
  const currentExp = currentData.experiences || [];
  const newExp = { ...exp, id: Date.now().toString() };

  await updateDoc(doc(db, "users", adminDoc.id), {
    experiences: [...currentExp, newExp]
  });
}

export async function updateExperience(id: string, data: Partial<Experience>) {
  const adminDoc = await getAdminUserDoc();
  if (!adminDoc) throw new Error("No admin user found");
  
  const currentData = adminDoc.data();
  const currentExp = currentData.experiences || [];
  const updatedExp = currentExp.map((e: any) => 
    e.id === id ? { ...e, ...data } : e
  );

  await updateDoc(doc(db, "users", adminDoc.id), {
    experiences: updatedExp
  });
}

export async function deleteExperience(id: string) {
  const adminDoc = await getAdminUserDoc();
  if (!adminDoc) throw new Error("No admin user found");
  
  const currentData = adminDoc.data();
  const currentExp = currentData.experiences || [];
  const updatedExp = currentExp.filter((e: any) => e.id !== id);

  await updateDoc(doc(db, "users", adminDoc.id), {
    experiences: updatedExp
  });
}

// ============================================
// ACHIEVEMENTS
// ============================================

export async function getAchievements(): Promise<Achievement[]> {
  const adminDoc = await getAdminUserDoc();
  if (!adminDoc) return [];
  const data = adminDoc.data();
  return (data.achievements || []) as Achievement[];
}

export async function addAchievement(ach: Omit<Achievement, "id">) {
  const adminDoc = await getAdminUserDoc();
  if (!adminDoc) throw new Error("No admin user found");
  
  const currentData = adminDoc.data();
  const currentAch = currentData.achievements || [];
  const newAch = { ...ach, id: Date.now().toString() };

  await updateDoc(doc(db, "users", adminDoc.id), {
    achievements: [...currentAch, newAch]
  });
}

export async function updateAchievement(id: string, data: Partial<Achievement>) {
  const adminDoc = await getAdminUserDoc();
  if (!adminDoc) throw new Error("No admin user found");
  
  const currentData = adminDoc.data();
  const currentAch = currentData.achievements || [];
  const updatedAch = currentAch.map((a: any) => 
    a.id === id ? { ...a, ...data } : a
  );

  await updateDoc(doc(db, "users", adminDoc.id), {
    achievements: updatedAch
  });
}

export async function deleteAchievement(id: string) {
  const adminDoc = await getAdminUserDoc();
  if (!adminDoc) throw new Error("No admin user found");
  
  const currentData = adminDoc.data();
  const currentAch = currentData.achievements || [];
  const updatedAch = currentAch.filter((a: any) => a.id !== id);

  await updateDoc(doc(db, "users", adminDoc.id), {
    achievements: updatedAch
  });
}
