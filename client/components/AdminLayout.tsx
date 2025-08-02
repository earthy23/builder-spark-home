import { Link, useLocation } from "react-router-dom";
import { 
  Home,
  Users, 
  MessageCircle, 
  LifeBuoy, 
  Globe, 
  BarChart3, 
  Webhook, 
  UserPlus,
  Layout as LayoutIcon,
  FileText,
  Flag,
  Shield,
  Settings
} from "lucide-react";
import Layout from "./Layout";
import { useAuth } from "@/contexts/AuthContext";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const adminNavItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: Home },
  { href: "/admin/users", label: "User Management", icon: Users },
  { href: "/admin/chat-moderation", label: "Chat Moderation", icon: MessageCircle },
  { href: "/admin/tickets", label: "Support Tickets", icon: LifeBuoy },
  { href: "/admin/domains", label: "Domain Manager", icon: Globe },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/webhooks", label: "Webhooks", icon: Webhook },
  { href: "/admin/partners", label: "Partner Management", icon: UserPlus },
  { href: "/admin/ui-editor", label: "UI Editor", icon: LayoutIcon },
  { href: "/admin/logs", label: "System Logs", icon: FileText },
  { href: "/admin/flagged-content", label: "Flagged Content", icon: Flag },
  { href: "/admin/role-perms", label: "Role Permissions", icon: Shield },
  { href: "/admin/client-manager", label: "Client Manager", icon: Settings },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const { isAdmin } = useAuth();

  const isActive = (href: string) => location.pathname === href;

  // Redirect non-admin users
  if (!isAdmin) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
            <p className="text-gray-400 mb-6">You need administrator privileges to access this area.</p>
            <Link to="/dashboard" className="button-primary px-6 py-3">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="flex">
          {/* Admin Sidebar */}
          <div className="w-72 bg-red-950/20 border-r border-red-800/30 min-h-screen">
            <div className="p-6 border-b border-red-800/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-red-400">Admin Panel</h2>
                  <p className="text-sm text-red-300/70">System Administration</p>
                </div>
              </div>
            </div>

            <nav className="p-4">
              <ul className="space-y-2">
                {adminNavItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                        transition-all duration-200
                        ${isActive(item.href) 
                          ? 'bg-red-600 text-white shadow-lg' 
                          : 'text-red-200 hover:bg-red-600/20 hover:text-red-100'
                        }
                      `}
                      data-admin-nav={item.label.toLowerCase().replace(' ', '-')}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Back to Main App */}
              <div className="mt-8 pt-6 border-t border-red-800/30">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-all duration-200"
                  data-action="back-to-dashboard"
                >
                  <Home className="w-5 h-5" />
                  Back to Dashboard
                </Link>
              </div>
            </nav>
          </div>

          {/* Admin Content */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
}
