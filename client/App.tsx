import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Friends from "./pages/Friends";
import Chat from "./pages/Chat";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ChatModeration from "./pages/admin/ChatModeration";
import UserManagement from "./pages/admin/UserManagement";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./components/PlaceholderPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Store */}
          <Route path="/store" element={<PlaceholderPage title="Store" description="Purchase VIP, VIP++, and Chatter ranks with exclusive benefits." />} />
          <Route path="/downloads" element={<PlaceholderPage title="Downloads" description="Download Eaglercraft clients for offline play." />} />

          {/* Community */}
          <Route path="/news" element={<PlaceholderPage title="News" description="Latest updates and announcements from UEC Launcher." />} />
          <Route path="/events" element={<PlaceholderPage title="Events" description="Upcoming events, tournaments, and community activities." />} />
          <Route path="/partners" element={<PlaceholderPage title="Partners" description="Our trusted partners and sponsors." />} />
          <Route path="/forums" element={<PlaceholderPage title="Forums" description="Community discussions, topics, and user-generated content." />} />

          {/* Support */}
          <Route path="/support" element={<PlaceholderPage title="Support" description="Get help with tickets and customer support." />} />

          {/* Info Pages */}
          <Route path="/about" element={<PlaceholderPage title="About UEC Launcher" description="Learn more about our platform and mission." />} />
          <Route path="/terms" element={<PlaceholderPage title="Terms of Service" description="Terms and conditions for using UEC Launcher." />} />
          <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" description="How we protect and handle your personal data." />} />

          {/* Authentication */}
          <Route path="/auth/login" element={<PlaceholderPage title="Login" description="Sign in to your UEC Launcher account." showSidebar={false} />} />
          <Route path="/auth/register" element={<PlaceholderPage title="Register" description="Create a new UEC Launcher account." showSidebar={false} />} />
          <Route path="/auth/reset-password" element={<PlaceholderPage title="Reset Password" description="Reset your account password." showSidebar={false} />} />
          <Route path="/auth/verify-email" element={<PlaceholderPage title="Verify Email" description="Verify your email address." showSidebar={false} />} />

          {/* Profile */}
          <Route path="/profile/settings" element={<PlaceholderPage title="Profile Settings" description="Manage your avatar, background, and personal information." />} />
          <Route path="/profile/notifications" element={<PlaceholderPage title="Notifications" description="Configure your notification preferences." />} />
          <Route path="/profile/security" element={<PlaceholderPage title="Security" description="Manage password, sessions, and two-factor authentication." />} />
          <Route path="/profile/rank" element={<PlaceholderPage title="Your Rank" description="View your current rank and perks." />} />

          {/* Social */}
          <Route path="/friends" element={<Friends />} />
          <Route path="/friends/requests" element={<PlaceholderPage title="Friend Requests" description="Accept or reject incoming friend requests." />} />
          <Route path="/friends/blocked" element={<PlaceholderPage title="Blocked Users" description="Manage your blocked users list." />} />

          {/* Chat */}
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/chat/group/:id" element={<Chat />} />
          <Route path="/chat/create-group" element={<PlaceholderPage title="Create Group" description="Create a new group chat with friends." />} />

          {/* Admin Panel */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/chat-moderation" element={<ChatModeration />} />
          <Route path="/admin/tickets" element={<PlaceholderPage title="Support Tickets" description="Manage and respond to user support requests." />} />
          <Route path="/admin/domains" element={<PlaceholderPage title="Domain Manager" description="Manage domain configurations and settings." />} />
          <Route path="/admin/analytics" element={<PlaceholderPage title="Analytics" description="View site analytics and user activity." />} />
          <Route path="/admin/webhooks" element={<PlaceholderPage title="Webhooks" description="Configure Discord webhooks for notifications." />} />
          <Route path="/admin/partners" element={<PlaceholderPage title="Partner Management" description="Manage partner banners and advertisements." />} />
          <Route path="/admin/ui-editor" element={<PlaceholderPage title="UI Editor" description="Drag and drop interface for customizing layouts." />} />
          <Route path="/admin/logs" element={<PlaceholderPage title="System Logs" description="View system and moderation logs." />} />
          <Route path="/admin/flagged-content" element={<PlaceholderPage title="Flagged Content" description="Review content flagged by the community." />} />
          <Route path="/admin/role-perms" element={<PlaceholderPage title="Role Permissions" description="Configure permissions for different user roles." />} />
          <Route path="/admin/client-manager" element={<PlaceholderPage title="Client Manager" description="Manage Eaglercraft client installations." />} />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
