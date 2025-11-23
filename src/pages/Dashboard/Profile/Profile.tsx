import {
  Brain,
  Check,
  Copy,
  Eye,
  EyeOff,
  Key,
  Loader2,
  Mail,
  MapPin,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";

import { auth, db } from "@/firebase/firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

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
    name: "",
    email: "",
    country: "",
    memoryEnabled: false,
    chatHistoryEnabled: false,
    apiKey: "",
  });

  const [loading, setLoading] = useState(true);
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatingKey, setGeneratingKey] = useState(false);

  // ---------------------------
  // Fetch user data from Firebase
  // ---------------------------
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setProfile(snap.data() as UserProfile);
      }

      setLoading(false);
    } catch (err) {
      console.error("Error loading user:", err);
      setLoading(false);
    }
  };

  // ---------------------------
  // Update settings in Firestore
  // ---------------------------
  const updateSetting = async (key: keyof UserProfile, value: any) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      await updateDoc(ref, { [key]: value });

      setProfile((prev) => ({ ...prev, [key]: value }));
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // ---------------------------
  // Generate API Key & Save
  // ---------------------------
  const generateApiKey = async () => {
    setGeneratingKey(true);

    try {
      const newKey = `sk_${crypto.randomUUID().replace(/-/g, "")}`;

      const user = auth.currentUser;
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      await updateDoc(ref, { apiKey: newKey });

      setProfile((prev) => ({ ...prev, apiKey: newKey }));
    } catch (err) {
      console.error("Key generation error:", err);
    }

    setGeneratingKey(false);
  };

  const copyApiKey = () => {
    if (!profile.apiKey) return;
    navigator.clipboard.writeText(profile.apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ---------------------------
  // Loading UI
  // ---------------------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  // ---------------------------
  // UI
  // ---------------------------
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="hidden lg:block fixed left-0 top-0 w-16 h-full bg-background">
        <Sidebar />
      </div>

      <div className="lg:ml-16 w-full">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold mb-2">Profile</h1>
          <p className="text-gray-400 mb-8">
            Manage your account settings and preferences
          </p>

          {/* Profile Card */}
          <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700 mb-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <User className="text-blue-400" /> Personal Information
            </h2>

            <div className="space-y-5">
              <InfoItem
                icon={<User />}
                label="Full Name"
                value={profile.name}
              />
              <InfoItem icon={<Mail />} label="Email" value={profile.email} />
              <InfoItem
                icon={<MapPin />}
                label="Country"
                value={profile.country}
              />
            </div>
          </div>

          {/* Memory Settings */}
          <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700 mb-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Brain className="text-pink-400" /> Memory
            </h2>

            <ToggleItem
              title="Saved memories"
              desc="When enabled, new memories can be saved and referenced in conversations."
              enabled={profile.memoryEnabled}
              onToggle={() =>
                updateSetting("memoryEnabled", !profile.memoryEnabled)
              }
            />

            <ToggleItem
              title="Chat history"
              desc="When enabled, messages from previous chats may be referenced."
              enabled={profile.chatHistoryEnabled}
              onToggle={() =>
                updateSetting("chatHistoryEnabled", !profile.chatHistoryEnabled)
              }
            />
          </div>

          {/* API Key Section */}
          <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Key className="text-yellow-400" /> API Credentials
            </h2>

            {profile.apiKey ? (
              <>
                <p className="text-sm text-gray-400 mb-2">Your API Key</p>

                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-900 px-4 py-3 rounded-lg border border-gray-700 text-sm font-mono">
                    {showApiKey ? profile.apiKey : "••••••••••••••••••••••"}
                  </div>

                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600"
                  >
                    {showApiKey ? <EyeOff /> : <Eye />}
                  </button>

                  <button
                    onClick={copyApiKey}
                    className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600"
                  >
                    {copied ? <Check className="text-green-400" /> : <Copy />}
                  </button>
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-400 mb-4">
                Click the button below to generate an API key.
              </p>
            )}

            <button
              onClick={generateApiKey}
              disabled={generatingKey}
              className="mt-5 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg flex gap-2 items-center disabled:bg-gray-700"
            >
              {generatingKey ? <Loader2 className="animate-spin" /> : <Key />}
              {profile.apiKey ? "Regenerate Key" : "Generate API Key"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Small reusable UI items

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-4">
    <div className="p-2 bg-gray-700 rounded-lg text-blue-300">{icon}</div>
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

const ToggleItem = ({
  title,
  desc,
  enabled,
  onToggle,
}: {
  title: string;
  desc: string;
  enabled: boolean;
  onToggle: () => void;
}) => (
  <div className="flex items-start justify-between py-3">
    <div>
      <h3 className="font-medium flex items-center gap-2">
        {title}
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${
            enabled ? "bg-green-600/30 text-green-300" : "bg-gray-700"
          }`}
        >
          {enabled ? "Enabled" : "Disabled"}
        </span>
      </h3>
      <p className="text-sm text-gray-400">{desc}</p>
    </div>

    <button
      onClick={onToggle}
      className={`relative inline-flex w-11 h-6 rounded-full transition ${
        enabled ? "bg-blue-600" : "bg-gray-600"
      }`}
    >
      <span
        className={`absolute h-4 w-4 bg-white rounded-full transition ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  </div>
);

export default Profile;
