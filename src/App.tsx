// import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllUsersPage from "./pages/Dashboard/AllUsers";
import Dashboard from "./pages/Dashboard/Dashboard";
import AllOrders from "./pages/Dashboard/shared/AllOrders";
import EbonixAiHome from "./pages/ebonix-prompt/EbonixAiHome";
import EbonixPrompt from "./pages/ebonix-prompt/EbonixPrompt";
import ExplorePage from "./pages/ebonix-prompt/Explore/ExplorePage";
import LibraryPage from "./pages/ebonix-prompt/Library/Library";
import ModalsPage from "./pages/ebonix-prompt/Models/ModalsPage";
import SettingsPage from "./pages/ebonix-prompt/Setting/SettingPage";
import Imagine from "./pages/ebonix-prompt/Sidebar/Imagine";
import Video from "./pages/ebonix-prompt/Sidebar/Video";
import VoiceIsolotor from "./pages/ebonix-prompt/Sidebar/VoiceIsolotor";
import Voiceover from "./pages/ebonix-prompt/Sidebar/Voiceover";
import ProtectedRoute from "./routes/ProtectedRoute";

const Login = lazy(() => import("./pages/Login/Login"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const Index = lazy(() => import("./pages/Index"));

const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Create a theme instance
const theme = createTheme();

const App = React.memo(() => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TooltipProvider>
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-screen">
                Loading...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/app" element={<EbonixAiHome />} />
              <Route path="/app/explore" element={<ExplorePage />} />
              <Route path="app/library" element={<LibraryPage />} />
              <Route path="app/modals" element={<ModalsPage />} />
              <Route path="app/settings" element={<SettingsPage />} />

              {/* only admin can visit dashboard */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/all-users"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AllUsersPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="dashboard/all-orders"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AllOrders />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />

              {/* routes for ebonix ai tools */}
              <Route path="app/chat" element={<EbonixPrompt />} />
              <Route path="app/imagine" element={<Imagine />} />
              <Route path="app/video" element={<Video />} />

              <Route path="app/voiceover" element={<Voiceover />} />
              <Route path="app/voice-isolator" element={<VoiceIsolotor />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
));

export default App;
