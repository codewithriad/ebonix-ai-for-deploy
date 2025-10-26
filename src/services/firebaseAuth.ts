// src/services/firebaseAuth.ts
import { auth, db, googleProvider } from "@/firebase.config";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User as FirebaseUser,
} from "firebase/auth";
import {
  doc,
  serverTimestamp,
  setDoc,
  type DocumentData,
} from "firebase/firestore";

export type AppUser = {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  role?: string;
  createdAt?: any;
  lastLogin?: any;
};

async function saveUserToFirestore(
  user: FirebaseUser,
  extra: Partial<AppUser> = {}
) {
  if (!user?.uid) return;
  const userRef = doc(db, "users", user.uid);
  const payload: DocumentData = {
    uid: user.uid,
    email: user.email ?? null,
    displayName: user.displayName ?? null,
    photoURL: user.photoURL ?? null,
    role: "user", // default
    lastLogin: serverTimestamp(),
    ...extra,
  };
  // merge true -> update if exists
  await setDoc(userRef, payload, { merge: true });
}

export async function signUpWithEmail(email: string, password: string) {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  await saveUserToFirestore(res.user, { createdAt: serverTimestamp() });
  return res.user;
}

export async function signInWithEmailFn(email: string, password: string) {
  const res = await signInWithEmailAndPassword(auth, email, password);
  await saveUserToFirestore(res.user);
  return res.user;
}

// Option A: Firebase popup (recommended / simpler)
export async function signInWithGooglePopup() {
  const res = await signInWithPopup(auth, googleProvider);
  await saveUserToFirestore(res.user);
  return res.user;
}

// Option B: If you use @react-oauth/google and get an ID token:
export async function signInWithGoogleCredential(idToken: string) {
  const cred = GoogleAuthProvider.credential(idToken);
  const res = await signInWithCredential(auth, cred);
  await saveUserToFirestore(res.user);
  return res.user;
}

export async function signOutUser() {
  return signOut(auth);
}
