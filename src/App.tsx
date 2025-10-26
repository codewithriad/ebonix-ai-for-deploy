// import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllUsersPage from "./pages/Admin/Dashboard/AllUsers";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import AllOrders from "./pages/Admin/Dashboard/shared/AllOrders";
import EbonixPrompt from "./pages/ebonix-prompt/EbonixPrompt";
import LibraryPage from "./pages/ebonix-prompt/Library/Library";
import Chat from "./pages/ebonix-prompt/Tools/Chat";
import Classifier from "./pages/ebonix-prompt/Tools/Classifier";
import Coder from "./pages/ebonix-prompt/Tools/Coder";
import Imagine from "./pages/ebonix-prompt/Tools/Imagine";
import Transcriber from "./pages/ebonix-prompt/Tools/Transcriber";
import Video from "./pages/ebonix-prompt/Tools/Video";
import VoiceIsolotor from "./pages/ebonix-prompt/Tools/VoiceIsolotor";
import Voiceover from "./pages/ebonix-prompt/Tools/Voiceover";
import Writer from "./pages/ebonix-prompt/Tools/Writer";

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
              <Route path="/app" element={<EbonixPrompt />} />
              <Route path="app/library" element={<LibraryPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/all-users" element={<AllUsersPage />} />
              <Route path="dashboard/all-orders" element={<AllOrders />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />

              {/* routes for ebonix ai tools */}
              <Route path="app/chat" element={<Chat />} />
              <Route path="app/writer" element={<Writer />} />
              <Route path="app/coder" element={<Coder />} />
              <Route path="app/imagine" element={<Imagine />} />
              <Route path="app/video" element={<Video />} />
              <Route path="app/transcriber" element={<Transcriber />} />
              <Route path="app/voiceover" element={<Voiceover />} />
              <Route path="app/voice-isolator" element={<VoiceIsolotor />} />
              <Route path="app/classifier" element={<Classifier />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
));

export default App;
