import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Download,
  Store,
  Newspaper,
  Calendar,
  Users,
  Info,
  FileText,
  Shield,
  MessageSquare,
  HeadphonesIcon,
  UserPlus,
  LifeBuoy,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Crown
} from "lucide-react";
import { useState } from "react";
import NotificationCenter from "./NotificationCenter";
import { useAuth } from "../contexts/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

const mainNavItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Launcher", icon: Download },
  { href: "/store", label: "Store", icon: Store },
  { href: "/news", label: "News", icon: Newspaper },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/partners", label: "Partners", icon: Users },
  { href: "/forums", label: "Forums", icon: MessageSquare },
];

const userNavItems = [
  { href: "/chat", label: "Chat", icon: MessageSquare },
  { href: "/friends", label: "Friends", icon: UserPlus },
  { href: "/support", label: "Support", icon: LifeBuoy },
];

const infoNavItems = [
  { href: "/about", label: "About", icon: Info },
  { href: "/terms", label: "Terms", icon: FileText },
  { href: "/privacy", label: "Privacy", icon: Shield },
];

export default function Layout({ children, showSidebar = true }: LayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  // Check if user is on a protected route to determine auth state
  const isAuthRoute = location.pathname.startsWith('/auth');
  const isPublicRoute = location.pathname === '/' || location.pathname.startsWith('/about') ||
                       location.pathname.startsWith('/terms') || location.pathname.startsWith('/privacy');
  const [isLoggedIn] = useState(!isAuthRoute && !isPublicRoute); // Only logged in for protected routes

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Topbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
        <div className="flex items-center justify-between px-4 h-16">
          {/* Left side */}
          <div className="flex items-center gap-4">
            {showSidebar && (
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-800 rounded-md"
                data-action="toggle-sidebar"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
            
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="/assets/logo.png" 
                alt="UEC Launcher" 
                className="w-8 h-8"
                onError={(e) => {
                  // Fallback to text if image doesn't load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-xl font-bold text-white">UEC</span>';
                }}
              />
              <span className="text-xl font-bold hidden sm:block">UEC Launcher</span>
            </Link>
          </div>



          {/* Right side */}
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 hover:bg-gray-800 rounded-md relative"
                  data-action="notifications"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
                </button>
                <Link
                  to="/profile/settings"
                  className="flex items-center gap-2 ml-2 p-2 hover:bg-gray-800 rounded-md transition-colors"
                  data-nav="profile"
                >
                  <img
                    src="/assets/default-avatar.png"
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-gray-600 hover:border-white transition-colors"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiM0QjVTNjMiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDIxdi0yYTQgNCAwIDAgMC00LTRIOGE0IDQgMCAwIDAtNCA0djIiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4KPC9zdmc+';
                    }}
                  />
                  <span className="hidden sm:block text-sm hover:text-white transition-colors">Username</span>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link 
                  to="/auth/login" 
                  className="button-secondary px-4 py-2 text-sm"
                  data-auth="login"
                >
                  Login
                </Link>
                <Link 
                  to="/auth/register" 
                  className="button-primary px-4 py-2 text-sm"
                  data-auth="register"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        {showSidebar && (
          <>
            {/* Mobile overlay */}
            {sidebarOpen && (
              <div 
                className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
            
            {/* Sidebar */}
            <aside className={`
              fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900/95 backdrop-blur-md
              transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
              lg:translate-x-0 transition-transform duration-200 ease-in-out
              border-r border-gray-800 pt-16 lg:pt-0
            `}>
              <div className="h-full overflow-y-auto px-3 py-4">
                <nav className="space-y-6">
                  {/* Main Navigation */}
                  <div>
                    <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Main
                    </h3>
                    <ul className="space-y-1">
                      {mainNavItems.map((item) => (
                        <li key={item.href}>
                          <Link
                            to={item.href}
                            className={`
                              flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                              transition-colors duration-200
                              ${isActive(item.href) 
                                ? 'bg-white text-black' 
                                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                              }
                            `}
                            data-nav={item.label.toLowerCase()}
                          >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* User Navigation (only if logged in) */}
                  {isLoggedIn && (
                    <div>
                      <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        Social
                      </h3>
                      <ul className="space-y-1">
                        {userNavItems.map((item) => (
                          <li key={item.href}>
                            <Link
                              to={item.href}
                              className={`
                                flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                                transition-colors duration-200
                                ${isActive(item.href) 
                                  ? 'bg-white text-black' 
                                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                }
                              `}
                              data-nav={item.label.toLowerCase()}
                            >
                              <item.icon className="w-5 h-5" />
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Info Navigation */}
                  <div>
                    <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Information
                    </h3>
                    <ul className="space-y-1">
                      {infoNavItems.map((item) => (
                        <li key={item.href}>
                          <Link
                            to={item.href}
                            className={`
                              flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                              transition-colors duration-200
                              ${isActive(item.href) 
                                ? 'bg-white text-black' 
                                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                              }
                            `}
                            data-nav={item.label.toLowerCase()}
                          >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* User Actions (if logged in) */}
                  {isLoggedIn && (
                    <div className="border-t border-gray-800 pt-4">
                      <ul className="space-y-1">
                        <li>
                          <Link
                            to="/profile/settings"
                            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
                            data-nav="settings"
                          >
                            <Settings className="w-5 h-5" />
                            Settings
                          </Link>
                        </li>
                        <li>
                          <button
                            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200 w-full text-left"
                            data-action="logout"
                          >
                            <LogOut className="w-5 h-5" />
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </nav>
              </div>
            </aside>
          </>
        )}

        {/* Main content */}
        <main className={`flex-1 ${showSidebar ? 'lg:ml-0' : ''}`}>
          {children}
        </main>
      </div>

      {/* Notification Center */}
      <NotificationCenter
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
    </div>
  );
}
