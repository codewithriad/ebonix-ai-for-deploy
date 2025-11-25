import {
  auth,
  db,
  githubProvider,
  googleProvider,
} from "@/firebase/firebase.config";
import { ADMIN_EMAIL, uploadProfilePhoto } from "@/utils/authHelpers";
import {
  createUserWithEmailAndPassword,
  User as FirebaseUser,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { Eye, EyeOff, Lock, Mail, User, UserPlus } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // 🔹 Create Firestore user if not exists
  const createUserIfNotExists = async (
    user: FirebaseUser,
    displayName?: string
  ) => {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const firebasePhotoURL = await uploadProfilePhoto(user);

      const role = user.email === ADMIN_EMAIL ? "admin" : "user";

      await setDoc(userRef, {
        uid: user.uid,
        name: displayName || user.displayName || "Unknown",
        email: user.email || "",
        photoURL: firebasePhotoURL,
        role: role,
        status: "active",
        verified: user.emailVerified,
        country: "Unknown",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      console.log("✅ User created with role:", role);
      console.log("📸 Photo URL:", firebasePhotoURL);
    } else {
      console.log("✅ User already exists");
    }
  };

  // 🔹 Handle Email Signup
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please Fill All The Fields");
      return;
    }

    setLoading(true);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;

      await updateProfile(user, { displayName: name });
      await createUserIfNotExists(user, name);

      toast.success("Account created successfully!");

      // ✅ Redirect based on role
      if (user.email === ADMIN_EMAIL) {
        console.log("🔑 Admin account created, redirecting to dashboard");
        navigate("/dashboard");
      } else {
        console.log("👤 User account created, redirecting to home");
        navigate("/");
      }
    } catch (error: unknown) {
      console.error("❌ Signup Error:", error);
      if (error instanceof Error && "code" in error) {
        const firebaseError = error as { code: string };
        if (firebaseError.code === "auth/email-already-in-use") {
          toast.error("Already have an account with this email.");
        } else if (firebaseError.code === "auth/weak-password") {
          toast.error("Password should be at least 6 characters.");
        } else {
          toast.error("Signup failed. Please try again.");
        }
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle Social Signup (Google / Facebook / GitHub)
  const handleSocialSignup = async (providerName: string) => {
    setLoading(true);
    try {
      let provider;
      switch (providerName) {
        case "Google":
          provider = googleProvider;
          break;

        case "GitHub":
          provider = githubProvider;
          break;
        default:
          throw new Error("Invalid provider");
      }

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Create Firestore user if not exists
      await createUserIfNotExists(user);

      toast.success(`✅ ${providerName} signup successful!`);

      // ✅ Redirect based on role
      if (user.email === ADMIN_EMAIL) {
        console.log("🔑 Admin logged in, redirecting to dashboard");
        navigate("/dashboard");
      } else {
        console.log("👤 User logged in, redirecting to home");
        navigate("/");
      }
    } catch (error: unknown) {
      console.error("❌ Social Signup Error:", error);
      if (error instanceof Error && "code" in error) {
        const firebaseError = error as { code: string };
        if (firebaseError.code === "auth/popup-closed-by-user") {
          toast.warn("Signup popup closed before completion.");
        } else if (firebaseError.code === "auth/cancelled-popup-request") {
          return; // Silent fail
        } else {
          toast.error(`${providerName} signup failed. Please try again.`);
        }
      } else {
        toast.error(`${providerName} signup failed. Please try again.`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-4 sm:p-6 lg:p-8 relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full blur-2xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-rose-300 rounded-full blur-2xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-gray-500 mt-2">Join our community</p>
          </div>

          {/* Name */}
          <div className="space-y-2 mb-4">
            <label className="text-sm font-medium text-gray-700 block">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none bg-gray-50 hover:bg-white transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2 mb-4">
            <label className="text-sm font-medium text-gray-700 block">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none bg-gray-50 hover:bg-white transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2 mb-6">
            <label className="text-sm font-medium text-gray-700 block">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none bg-gray-50 hover:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Signup Button */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex justify-center"
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Sign Up"
            )}
          </button>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                Or sign up with
              </span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSocialSignup("Google")}
              disabled={loading}
              className="flex items-center justify-center p-3 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
            </button>

            <button
              onClick={() => handleSocialSignup("GitHub")}
              disabled={loading}
              className="flex items-center justify-center p-3 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50"
            >
              <img
                src="https://www.svgrepo.com/show/349375/github.svg"
                alt="GitHub"
                className="w-5 h-5"
              />
            </button>
          </div>

          {/* Login link */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <NavLink
              to={"/login"}
              className="font-semibold text-purple-600 hover:text-purple-700"
            >
              Login
            </NavLink>
          </p>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
