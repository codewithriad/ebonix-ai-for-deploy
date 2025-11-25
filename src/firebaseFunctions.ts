import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // add other fields as needed (storageBucket, messagingSenderId, appId)
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const saveUserToFirestore = async (user: {
  uid: string;
  name: string;
  email: string;
  role: "user" | "admin";
}) => {
  try {
    await setDoc(doc(db, "users", user.uid), {
      name: user.name,
      email: user.email,
      role: user.role,
      status: "active",
      createdAt: new Date(),
    });
    console.log("User saved to Firestore");
  } catch (err) {
    console.error("Error saving user:", err);
  }
};
