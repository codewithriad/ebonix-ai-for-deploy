import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase.config";

// new user add
export const saveUser = async (userData: any) => {
  await setDoc(doc(db, "users", userData.uid), {
    ...userData,
    createdAt: serverTimestamp(),
  });
};

// take all users
export const getAllUsers = async () => {
  const snap = await getDocs(collection(db, "users"));
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// user role update
export const updateUserRole = async (uid: string, newRole: string) => {
  await updateDoc(doc(db, "users", uid), { role: newRole });
};

// user delete
export const deleteUser = async (uid: string) => {
  await deleteDoc(doc(db, "users", uid));
};
