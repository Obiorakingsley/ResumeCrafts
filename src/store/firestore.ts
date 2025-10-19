import { db } from "@/lib/config/firebase";
import {
  doc,
  setDoc,
  serverTimestamp,
  collection,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
  getCountFromServer,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useAuthStore } from "./useAuthStore";

// Create User Profile
export async function createUserProfile(user: any) {
  if (!user) return;
  try {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) return;

    await setDoc(userRef, {
      name: user.displayName || "",
      email: user.email,
      plan: "free",
      billingCycle: "",
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    });

    console.log("User profile created:", user.uid);
  } catch (err: any) {
    toast.error("Error creating user profile:");
    return null;
  }
}

//Update User Profile
export async function updateUserProfile(uid: string, newData: object) {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      ...newData,
      updatedAt: serverTimestamp(),
    });
    toast.success("User profile updated:");
  } catch (err: any) {
    toast.error("Failed to update profile");
  }
}

// Save User Resume
export async function saveUserResume(
  uid: string,
  resumeData: object,
  template: string
) {
  try {
    const resumeRef = collection(db, "users", uid, "resumes");
    if (Object.keys(resumeData).length === 0) {
      toast.error("Resume data is empty");
      return;
    }
    // Check current count of resumes
    const snapshot = await getCountFromServer(resumeRef);
    const count = snapshot.data().count;

    //check free plan limit
    if (count >= 1 && useAuthStore.getState().profile?.plan === "free") {
      toast.error("Upgrade to save more resume.");
      return;
    }

    //check pro plan limit
    if (count > 4 && useAuthStore.getState().profile?.plan === "pro") {
      toast.error("Max limit of 5 resume reached.");
      return;
    }

    // Check if a resume with same data + template exist
    const q = query(resumeRef, where("template", "==", template));
    const querySnapshot = await getDocs(q);

    let duplicateFound = false;

    for (const doc of querySnapshot.docs) {
      const existing = doc.data().data;
      // Compare data
      if (JSON.stringify(existing) === JSON.stringify(resumeData)) {
        duplicateFound = true;
        break;
      }
    }

    //Return if duplicate found
    if (duplicateFound) {
      toast.success("Already saved");
      return;
    }

    //Add doc if no duplicate was found
    await addDoc(resumeRef, {
      data: resumeData,
      template,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    toast.success("Saved");
  } catch (err: any) {
    toast.error("Failed to save resume");
    return null;
  }
}

// Delete Resume
export async function deleteResume(uid: string, resumeId: string) {
  if (!uid || !resumeId) return;
  const deleteRef = doc(db, "users", uid, "resumes", resumeId);
  await deleteDoc(deleteRef);
}

export async function editResume(uid: string, resumeId: string) {
  if (!uid || !resumeId) return;
  const editRef = doc(db, "users", uid, "resumes", resumeId);
  const snapshot = await getDoc(editRef);
  return snapshot.exists() ? { ...snapshot.data() } : null;
}

// Update Resume
export async function updateResume(
  uid: string,
  resumeId: string,
  newData: object
) {
  try {
    const resumeRef = doc(db, "users", uid, "resumes", resumeId);
    await updateDoc(resumeRef, {
      data: newData,
      updatedAt: serverTimestamp(),
    });
  } catch (err: any) {
    err.message === "Failed to get document because the client is offline."
      ? toast.error("Pls check your neteork connection")
      : toast.error("Failed to update resume");
    return null;
  }
}

// Get User Profile
export async function getUserProfile(uid: string) {
  if (!uid) return null;
  try {
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);
    return snap.exists() ? { uid, ...snap.data() } : null;
  } catch (err: any) {
    err.message === "Failed to get document because the client is offline."
      ? toast.error("Pls check your neteork connection")
      : toast.error("There was an error, pls refresh");
    return null;
  }
}

// Get All User Resumes
export async function getUserResumes(uid: string) {
  if (!uid) return [];
  try {
    const resumeRef = collection(db, "users", uid, "resumes");
    const snapshot = await getDocs(resumeRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err: any) {
    err.message === "Failed to get document because the client is offline."
      ? toast.error("Pls check your neteork connection")
      : toast.error("Failed to fetch resumes");
    return [];
  }
}

// Save Payment Info to firestore

export async function savePayment(uid: string, paymentData: any) {
  const ref = doc(db, "users", uid, "payments", paymentData.reference);
  await setDoc(ref, {
    ...paymentData,
    verifiedAt: serverTimestamp(),
  });
}
