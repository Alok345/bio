import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import * as dotenv from "dotenv";
import { resolve } from "path";

// Load environment variables from .env.local
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

// Import default data
import {
  defaultProfile,
  defaultExperiences,
  defaultEducation,
  defaultAchievements,
  defaultProjects,
  defaultSkills,
} from "../src/lib/data";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function seedData() {
  try {
    console.log("Starting Firebase seeding process...");

    // 1. Define admin credentials
    const adminEmail = "akumar.panday31@gmail.com";
    const adminPassword = "AdminPassword123!"; // Recommended to change this later

    // 2. Create the Auth User
    console.log(`Creating user with email: ${adminEmail}...`);
    let uid = "";
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
      uid = userCredential.user.uid;
      console.log(`✅ User created successfully with UID: ${uid}`);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
         console.warn("⚠️ User already exists. Attempting to sign in to update the data...");
         const { signInWithEmailAndPassword } = await import('firebase/auth');
         const cred = await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
         uid = cred.user.uid;
         console.log(`✅ User signed in successfully with UID: ${uid}`);
      } else {
        throw error;
      }
    }

    if (!uid) {
      throw new Error("UID was not generated properly.");
    }

    // 3. Store Data based on UID
    console.log(`Writing data to document: users/${uid}`);
    
    const userDocRef = doc(db, "users", uid);
    
    // Store all portfolio data as a deeply nested document for the user
    await setDoc(userDocRef, {
      email: adminEmail,
      createdAt: new Date(),
      profile: defaultProfile,
      experiences: defaultExperiences,
      education: defaultEducation,
      achievements: defaultAchievements,
      projects: defaultProjects,
      skills: defaultSkills
    });

    console.log("✅ All data successfully written to the users collection!");
    
    console.log("\n==================================");
    console.log("🎉 SEEDING COMPLETE!");
    console.log("Email: " + adminEmail);
    console.log("Password: " + adminPassword);
    console.log("Collection: users => Document: " + uid);
    console.log("==================================\n");
    
    process.exit(0);

  } catch (error) {
    console.error("❌ Error during seeding:", error);
    process.exit(1);
  }
}

seedData();
