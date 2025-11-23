// import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllUsersPage from "./pages/Dashboard/AllUsers";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Dashboard/Profile/Profile";
import Settings from "./pages/Dashboard/Settings/Settings";
// import AllOrders from "./pages/Dashboard/shared/AllOrders";
import AllOrders from "./pages/Dashboard/Sidebar/AllOrders";
import Payout from "./pages/Dashboard/Sidebar/Payout";
import Plans from "./pages/Dashboard/Sidebar/Plans";
import Templates from "./pages/Dashboard/Sidebar/Templates";
import EbonixAiHome from "./pages/ebonix-prompt/EbonixAiHome";
import EbonixPrompt from "./pages/ebonix-prompt/EbonixPrompt";
import ExplorePage from "./pages/ebonix-prompt/Explore/ExplorePage";
import LibraryPage from "./pages/ebonix-prompt/Library/Library";
import ModalsPage from "./pages/ebonix-prompt/Models/ModalsPage";
import SettingsPage from "./pages/ebonix-prompt/Setting/SettingPage";
import Imagine from "./pages/ebonix-prompt/Sidebar/Imagine";
import Video from "./pages/ebonix-prompt/Sidebar/Video";
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
                path="/dashboard/profile"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/settings"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <Settings />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard/all-users"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AllUsersPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard/all-orders"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AllOrders />
                  </ProtectedRoute>
                }
              />

              {/* dashboard sidebar */}
              <Route
                path="/dashboard/plans"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <Plans />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/templates"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <Templates />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/all-orders"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AllOrders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/payouts"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <Payout />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />

              {/* routes for ebonix ai tools */}
              <Route path="/app" element={<EbonixAiHome />} />
              <Route path="/app/explore" element={<ExplorePage />} />
              <Route path="app/library" element={<LibraryPage />} />
              <Route path="app/modals" element={<ModalsPage />} />
              <Route path="app/settings" element={<SettingsPage />} />
              <Route path="app/chat" element={<EbonixPrompt />} />
              <Route path="app/imagine" element={<Imagine />} />
              <Route path="app/video" element={<Video />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
));

export default App;
