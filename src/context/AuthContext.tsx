import { auth, db } from "@/firebase/firebase.config";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserData {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
  profileImage?: string;
  role: string;
  status: string;
  verified: boolean;
  country: string;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔄 AuthContext: Setting up auth listener...");

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("🔍 AuthContext: Auth state changed", {
        email: currentUser?.email,
        uid: currentUser?.uid,
      });

      setUser(currentUser);

      if (currentUser) {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const data = userDoc.data() as UserData;
            console.log("✅ AuthContext: User data loaded", {
              email: data.email,
              role: data.role,
              photoURL: data.photoURL,
            });
            setUserData(data);
          } else {
            console.warn(
              "⚠️ AuthContext: User document not found in Firestore"
            );
            setUserData(null);
          }
        } catch (error) {
          console.error("❌ AuthContext: Error loading user data", error);
          setUserData(null);
        }
      } else {
        console.log("👋 AuthContext: No user logged in");
        setUserData(null);
      }

      setLoading(false);
      console.log("✅ AuthContext: Loading complete");
    });

    return () => {
      console.log("🛑 AuthContext: Cleaning up auth listener");
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
