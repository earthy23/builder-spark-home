import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Friends from "./pages/Friends";
import Chat from "./pages/Chat";
import DirectMessages from "./pages/DirectMessages";
import Store from "./pages/Store";
import News from "./pages/News";
import Events from "./pages/Events";
import Support from "./pages/Support";
import Profile from "./pages/Profile";
import About from "./pages/About";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ChatModeration from "./pages/admin/ChatModeration";
import UserManagement from "./pages/admin/UserManagement";
import TicketManagement from "./pages/admin/TicketManagement";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./components/PlaceholderPage";
import ProtectedRoute, {
  AdminRoute,
  AuthenticatedRoute,
} from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <AuthenticatedRoute>
                  <Dashboard />
                </AuthenticatedRoute>
              }
            />

            {/* Store */}
            <Route path="/store" element={<Store />} />
            <Route
              path="/downloads"
              element={
                <PlaceholderPage
                  title="Downloads"
                  description="Download Eaglercraft clients for offline play."
                />
              }
            />

            {/* Community */}
            <Route path="/news" element={<News />} />
            <Route path="/events" element={<Events />} />
            <Route
              path="/partners"
              element={
                <PlaceholderPage
                  title="Partners"
                  description="Our trusted partners and sponsors."
                />
              }
            />
            <Route
              path="/forums"
              element={
                <PlaceholderPage
                  title="Forums"
                  description="Community discussions, topics, and user-generated content."
                />
              }
            />

            {/* Support */}
            <Route path="/support" element={<Support />} />

            {/* Info Pages */}
            <Route path="/about" element={<About />} />
            <Route
              path="/terms"
              element={
                <PlaceholderPage
                  title="Terms of Service"
                  description="Terms and conditions for using UEC Launcher."
                />
              }
            />
            <Route
              path="/privacy"
              element={
                <PlaceholderPage
                  title="Privacy Policy"
                  description="How we protect and handle your personal data."
                />
              }
            />

            {/* Authentication */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route
              path="/auth/reset-password"
              element={
                <PlaceholderPage
                  title="Reset Password"
                  description="Reset your account password."
                  showSidebar={false}
                />
              }
            />
            <Route
              path="/auth/verify-email"
              element={
                <PlaceholderPage
                  title="Verify Email"
                  description="Verify your email address."
                  showSidebar={false}
                />
              }
            />

            {/* Profile */}
            <Route
              path="/profile/settings"
              element={
                <AuthenticatedRoute>
                  <Profile />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/profile/notifications"
              element={
                <AuthenticatedRoute>
                  <PlaceholderPage
                    title="Notifications"
                    description="Configure your notification preferences."
                  />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/profile/security"
              element={
                <AuthenticatedRoute>
                  <PlaceholderPage
                    title="Security"
                    description="Manage password, sessions, and two-factor authentication."
                  />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/profile/rank"
              element={
                <AuthenticatedRoute>
                  <PlaceholderPage
                    title="Your Rank"
                    description="View your current rank and perks."
                  />
                </AuthenticatedRoute>
              }
            />

            {/* Social */}
            <Route
              path="/friends"
              element={
                <AuthenticatedRoute>
                  <Friends />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/friends/requests"
              element={
                <AuthenticatedRoute>
                  <PlaceholderPage
                    title="Friend Requests"
                    description="Accept or reject incoming friend requests."
                  />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/friends/blocked"
              element={
                <AuthenticatedRoute>
                  <PlaceholderPage
                    title="Blocked Users"
                    description="Manage your blocked users list."
                  />
                </AuthenticatedRoute>
              }
            />

            {/* Chat */}
            <Route
              path="/chat"
              element={
                <AuthenticatedRoute>
                  <Chat />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/chat/:id"
              element={
                <AuthenticatedRoute>
                  <Chat />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/chat/group/:id"
              element={
                <AuthenticatedRoute>
                  <Chat />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/chat/create-group"
              element={
                <AuthenticatedRoute>
                  <PlaceholderPage
                    title="Create Group"
                    description="Create a new group chat with friends."
                  />
                </AuthenticatedRoute>
              }
            />

            {/* Direct Messages */}
            <Route
              path="/messages"
              element={
                <AuthenticatedRoute>
                  <DirectMessages />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/messages/:id"
              element={
                <AuthenticatedRoute>
                  <DirectMessages />
                </AuthenticatedRoute>
              }
            />

            {/* Admin Panel */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <UserManagement />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/chat-moderation"
              element={
                <AdminRoute>
                  <ChatModeration />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/tickets"
              element={
                <AdminRoute>
                  <TicketManagement />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/domains"
              element={
                <AdminRoute>
                  <PlaceholderPage
                    title="Domain Manager"
                    description="Manage domain configurations and settings."
                  />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <AdminRoute>
                  <PlaceholderPage
                    title="Analytics"
                    description="View site analytics and user activity."
                  />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/webhooks"
              element={
                <AdminRoute>
                  <PlaceholderPage
                    title="Webhooks"
                    description="Configure Discord webhooks for notifications."
                  />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/partners"
              element={
                <AdminRoute>
                  <PlaceholderPage
                    title="Partner Management"
                    description="Manage partner banners and advertisements."
                  />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/ui-editor"
              element={
                <AdminRoute>
                  <PlaceholderPage
                    title="UI Editor"
                    description="Drag and drop interface for customizing layouts."
                  />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/logs"
              element={
                <AdminRoute>
                  <PlaceholderPage
                    title="System Logs"
                    description="View system and moderation logs."
                  />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/flagged-content"
              element={
                <AdminRoute>
                  <PlaceholderPage
                    title="Flagged Content"
                    description="Review content flagged by the community."
                  />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/role-perms"
              element={
                <AdminRoute>
                  <PlaceholderPage
                    title="Role Permissions"
                    description="Configure permissions for different user roles."
                  />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/client-manager"
              element={
                <AdminRoute>
                  <PlaceholderPage
                    title="Client Manager"
                    description="Manage Eaglercraft client installations."
                  />
                </AdminRoute>
              }
            />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
