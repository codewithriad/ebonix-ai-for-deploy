import {
  Brain,
  Check,
  Copy,
  Eye,
  EyeOff,
  FileText,
  Key,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";

// Firebase imports (you'll need to configure these)
// import { getAuth } from 'firebase/auth';
// import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

interface UserProfile {
  name: string;
  email: string;
  country: string;
  memoryEnabled: boolean;
  chatHistoryEnabled: boolean;
  apiKey?: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john.doe@example.com",
    country: "United States",
    memoryEnabled: false,
    chatHistoryEnabled: false,
    apiKey: "",
  });

  const [loading, setLoading] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatingKey, setGeneratingKey] = useState(false);

  // Fetch user profile from Firebase
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual Firebase implementation
      // const auth = getAuth();
      // const db = getFirestore();
      // const user = auth.currentUser;
      //
      // if (user) {
      //   const docRef = doc(db, 'users', user.uid);
      //   const docSnap = await getDoc(docRef);
      //
      //   if (docSnap.exists()) {
      //     setProfile(docSnap.data() as UserProfile);
      //   }
      // }

      // Mock data for demo
      setTimeout(() => {
        setProfile({
          name: "John Doe",
          email: "john.doe@example.com",
          country: "United States",
          memoryEnabled: false,
          chatHistoryEnabled: false,
          apiKey: "",
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setLoading(false);
    }
  };

  const updateSetting = async (key: keyof UserProfile, value: any) => {
    try {
      // TODO: Update Firebase
      // const auth = getAuth();
      // const db = getFirestore();
      // const user = auth.currentUser;
      //
      // if (user) {
      //   const docRef = doc(db, 'users', user.uid);
      //   await updateDoc(docRef, { [key]: value });
      // }

      setProfile((prev) => ({ ...prev, [key]: value }));
    } catch (error) {
      console.error("Error updating setting:", error);
    }
  };

  const generateApiKey = async () => {
    setGeneratingKey(true);
    try {
      // TODO: Call your backend API to generate a new key
      // const response = await fetch('/api/generate-key', { method: 'POST' });
      // const data = await response.json();

      // Mock key generation
      setTimeout(() => {
        const newKey = `sk_${Math.random()
          .toString(36)
          .substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
        updateSetting("apiKey", newKey);
        setGeneratingKey(false);
      }, 1500);
    } catch (error) {
      console.error("Error generating API key:", error);
      setGeneratingKey(false);
    }
  };

  const copyApiKey = () => {
    if (profile.apiKey) {
      navigator.clipboard.writeText(profile.apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-y-auto">
      <div className="hidden lg:block fixed left-0 top-0 w-16 h-full bg-background">
        <Sidebar />
      </div>
      <div className="lg:ml-16 w-full">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Profile</h1>
            <p className="text-gray-400 text-sm">
              Manage your account settings and preferences
            </p>
          </div>

          {/* Profile Information Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-850 rounded-2xl p-6 sm:p-8 mb-6 border border-gray-700 shadow-xl">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-400" />
              Personal Information
            </h2>

            <div className="space-y-5">
              {/* Name */}
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <User className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 mb-1">Full Name</p>
                  <p className="text-foreground font-medium">{profile.name}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Mail className="w-5 h-5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 mb-1">Email Address</p>
                  <p className="text-foreground font-medium">{profile.email}</p>
                </div>
              </div>

              {/* Country */}
              <div className="flex items-start gap-4">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <MapPin className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 mb-1">Country</p>
                  <p className="text-foreground font-medium">
                    {profile.country}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Memory Settings Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-850 rounded-2xl p-6 sm:p-8 mb-6 border border-gray-700 shadow-xl">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Brain className="w-5 h-5 text-pink-400" />
              Memory
            </h2>

            <div className="space-y-6">
              {/* Saved Memories */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-foreground font-medium">
                      Saved memories
                    </h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        profile.memoryEnabled
                          ? "bg-green-500/20 text-green-400"
                          : "bg-gray-700 text-gray-400"
                      }`}
                    >
                      {profile.memoryEnabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    When enabled, new memories can be saved and referenced in
                    chat conversations.
                  </p>
                </div>
                <button
                  onClick={() =>
                    updateSetting("memoryEnabled", !profile.memoryEnabled)
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-babg-background ${
                    profile.memoryEnabled ? "bg-blue-600" : "bg-gray-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-foregtext-foreground transition-transform ${
                      profile.memoryEnabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Chat History */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-foreground font-medium">
                      Chat history
                    </h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        profile.chatHistoryEnabled
                          ? "bg-green-500/20 text-green-400"
                          : "bg-gray-700 text-gray-400"
                      }`}
                    >
                      {profile.chatHistoryEnabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    When enabled, messages from recent chat conversations may be
                    referenced.
                  </p>
                </div>
                <button
                  onClick={() =>
                    updateSetting(
                      "chatHistoryEnabled",
                      !profile.chatHistoryEnabled
                    )
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-babg-background ${
                    profile.chatHistoryEnabled ? "bg-blue-600" : "bg-gray-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-foregtext-foreground transition-transform ${
                      profile.chatHistoryEnabled
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Manage Memories Link */}
              <div className="pt-4 border-t border-gray-700">
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Manage memories
                </button>
              </div>
            </div>
          </div>

          {/* API Credentials Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-850 rounded-2xl p-6 sm:p-8 border border-gray-700 shadow-xl">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Key className="w-5 h-5 text-yellow-400" />
              API credentials
            </h2>

            <div className="space-y-4">
              {profile.apiKey ? (
                <div className="space-y-3">
                  <p className="text-sm text-gray-400">Your API key</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-background rounded-lg px-4 py-3 font-mono text-sm text-gray-300 border border-gray-700">
                      {showApiKey
                        ? profile.apiKey
                        : "••••••••••••••••••••••••••••"}
                    </div>
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                      title={showApiKey ? "Hide" : "Show"}
                    >
                      {showApiKey ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={copyApiKey}
                      className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                      title="Copy"
                    >
                      {copied ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-400 mb-4">
                  Click the Generate button to create an API key
                </p>
              )}

              <button
                onClick={generateApiKey}
                disabled={generatingKey}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                {generatingKey ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Key className="w-4 h-4" />
                    {profile.apiKey ? "Regenerate" : "Generate"}
                  </>
                )}
              </button>

              <div className="pt-4 border-t border-gray-700">
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Documentation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
