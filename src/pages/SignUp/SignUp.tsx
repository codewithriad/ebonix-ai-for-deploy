import {
  auth,
  db,
  facebookProvider,
  githubProvider,
  googleProvider,
} from "@/firebase.config";
import { signInWithPopup } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";

export default function Signup() {
  const [loading, setLoading] = useState(false);

  const handleSocialLogin = async (provider: any) => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save user data to Firestore
      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          uid: user.uid,
          name: user.displayName || "Unknown",
          email: user.email,
          photoURL: user.photoURL || "",
          role: "user",
          status: "active",
          verified: user.emailVerified,
          country: "Unknown",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      alert("Login Successful!");
    } catch (error: any) {
      console.error(error.message);
      alert("Login Failed!");
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Signup / Login</h2>
      <div className="flex flex-col gap-3">
        <button
          onClick={() => handleSocialLogin(googleProvider)}
          className="bg-red-500 text-white p-2 rounded"
        >
          Continue with Google
        </button>
        <button
          onClick={() => handleSocialLogin(facebookProvider)}
          className="bg-blue-600 text-white p-2 rounded"
        >
          Continue with Facebook
        </button>
        <button
          onClick={() => handleSocialLogin(githubProvider)}
          className="bg-gray-800 text-white p-2 rounded"
        >
          Continue with GitHub
        </button>
        <button
          onClick={() => handleSocialLogin(googleProvider)}
          className="bg-blue-400 text-white p-2 rounded"
        >
          Continue with LinkedIn
        </button>
      </div>
    </div>
  );
}
