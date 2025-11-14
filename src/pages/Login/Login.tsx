import {
  auth,
  db,
  facebookProvider,
  githubProvider,
  googleProvider,
} from "@/firebase/firebase.config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🔇 Ignore harmless COOP popup warning
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Cross-Origin-Opener-Policy")
    ) {
      return;
    }
    originalWarn(...args);
  };
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Custom admin email
  const adminEmail = "tapplix@gmail.com";

  const redirectBasedOnRole = (userEmail: string) => {
    if (userEmail === adminEmail) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(
          userRef,
          {
            uid: user.uid,
            name: user.displayName || "Unknown",
            email: user.email,
            photoURL: user.photoURL || "",
            role: user.email === adminEmail ? "admin" : "user",
            status: "active",
            verified: user.emailVerified,
            country: "Unknown",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      }

      toast.success("✅ Login successful!");
      redirectBasedOnRole(user.email || "");
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.code === "auth/invalid-email") {
        toast.error("Invalid email address.");
      } else if (error.code === "auth/user-not-found") {
        toast.error("No user found with this email.");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password.");
      } else if (error.code === "auth/invalid-credential") {
        toast.error("Invalid email or password.");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (providerName: string) => {
    setLoading(true);
    try {
      let provider;
      switch (providerName) {
        case "Google":
          provider = googleProvider;
          break;
        case "Facebook":
          provider = facebookProvider;
          break;
        case "GitHub":
          provider = githubProvider;

        default:
          throw new Error("Invalid provider");
      }

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName || "Unknown",
          email: user.email,
          photoURL: user.photoURL || "",
          role: user.email === adminEmail ? "admin" : "user",
          status: "active",
          verified: user.emailVerified,
          country: "Unknown",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } else {
        await setDoc(
          userRef,
          { updatedAt: serverTimestamp() },
          { merge: true }
        );
      }

      toast.success(`✅ Logged in with ${providerName}!`);
      redirectBasedOnRole(user.email || "");
    } catch (error: any) {
      console.error(`${providerName} login error:`, error);
      if (error.code === "auth/popup-closed-by-user") {
        toast.warn("Popup closed. Try again.");
      } else if (
        error.code === "auth/account-exists-with-different-credential"
      ) {
        toast.error(
          "Account exists with this email using a different provider."
        );
      } else if (error.code === "auth/cancelled-popup-request") {
        return;
      } else {
        toast.error(`Login failed with ${providerName}.`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-4 sm:p-6 lg:p-8 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full blur-2xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-rose-300 rounded-full blur-2xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-gray-500 mt-2">Login to continue</p>
          </div>

          {/* Email */}
          <div className="space-y-2 mb-5">
            <label className="text-sm font-medium text-gray-700 block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyPress}
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
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyPress}
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

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex justify-center"
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleSocialLogin("Google")}
              disabled={loading}
              className="flex items-center justify-center p-3 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              title="Login with Google"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
            </button>
            <button
              onClick={() => handleSocialLogin("Facebook")}
              disabled={loading}
              className="flex items-center justify-center p-3 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              title="Login with Facebook"
            >
              <img
                src="https://www.svgrepo.com/show/452196/facebook-1.svg"
                alt="Facebook"
                className="w-5 h-5"
              />
            </button>
            <button
              onClick={() => handleSocialLogin("GitHub")}
              disabled={loading}
              className="flex items-center justify-center p-3 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              title="Login with GitHub"
            >
              <img
                src="https://www.svgrepo.com/show/349375/github.svg"
                alt="GitHub"
                className="w-5 h-5"
              />
            </button>
          </div>

          {/* Signup link */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <NavLink
              to={"/signup"}
              className="font-semibold text-purple-600 hover:text-purple-700 transition-colors"
            >
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}
