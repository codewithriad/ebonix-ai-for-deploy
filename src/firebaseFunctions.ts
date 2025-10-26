import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase.config";

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
