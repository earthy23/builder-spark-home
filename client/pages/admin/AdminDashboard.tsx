import { useState, useEffect } from "react";
import { 
  Users, 
  MessageCircle, 
  Server, 
  AlertTriangle, 
  TrendingUp, 
  Activity, 
  Shield, 
  Gamepad2,
  Clock,
  Eye,
  UserCheck,
  Flag,
  Calendar,
  BarChart3,
  Globe,
  Zap
} from "lucide-react";
import Layout from "@/components/Layout";

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  onlineUsers: number;
  totalMessages: number;
  flaggedContent: number;
  openTickets: number;
  serverUptime: number;
  activeClients: number;
  dailyLogins: number;
  weeklyGrowth: number;
}

interface ActivityLog {
  id: string;
  type: 'login' | 'register' | 'message' | 'flag' | 'ban' | 'ticket';
  user: string;
  action: string;
  timestamp: string;
  severity?: 'low' | 'medium' | 'high';
}

// Mock data
const mockStats: AdminStats = {
  totalUsers: 2547,
  activeUsers: 1823,
  onlineUsers: 234,
  totalMessages: 89456,
  flaggedContent: 12,
  openTickets: 8,
  serverUptime: 99.97,
  activeClients: 5,
  dailyLogins: 145,
  weeklyGrowth: 12.5
};

const mockActivity: ActivityLog[] = [
  {
    id: "1",
    type: 'flag',
    user: "steve_builder",
    action: "Reported inappropriate content in chat",
    timestamp: "2024-01-15T10:30:00Z",
    severity: 'high'
  },
  {
    id: "2",
    type: 'register',
    user: "new_player",
    action: "Created new account",
    timestamp: "2024-01-15T10:25:00Z",
    severity: 'low'
  },
  {
    id: "3",
    type: 'ticket',
    user: "alex_crafter",
    action: "Opened support ticket about login issues",
    timestamp: "2024-01-15T10:20:00Z",
    severity: 'medium'
  },
  {
    id: "4",
    type: 'ban',
    user: "admin",
    action: "Banned user toxic_player for 24 hours",
    timestamp: "2024-01-15T10:15:00Z",
    severity: 'high'
  },
  {
    id: "5",
    type: 'login',
    user: "redstone_master",
    action: "Logged in from new device",
    timestamp: "2024-01-15T10:10:00Z",
    severity: 'low'
  }
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [activity, setActivity] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('24h');

  useEffect(() => {
    // Simulate loading admin data
    const loadAdminData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStats(mockStats);
      setActivity(mockActivity);
      setLoading(false);
    };

    loadAdminData();
  }, [timeRange]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login': return <UserCheck className="w-4 h-4 text-green-400" />;
      case 'register': return <Users className="w-4 h-4 text-blue-400" />;
      case 'message': return <MessageCircle className="w-4 h-4 text-gray-400" />;
      case 'flag': return <Flag className="w-4 h-4 text-red-400" />;
      case 'ban': return <Shield className="w-4 h-4 text-red-600" />;
      case 'ticket': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      default: return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'high': return 'border-l-red-500 bg-red-500/5';
      case 'medium': return 'border-l-yellow-500 bg-yellow-500/5';
      case 'low': return 'border-l-green-500 bg-green-500/5';
      default: return 'border-l-gray-500 bg-gray-500/5';
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-2 border-white/20 border-t-white rounded-full mx-auto mb-4"></div>
            <p className="text-gray-300 text-lg">Loading admin dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Header */}
        <div className="sticky top-16 z-40 bg-black/90 backdrop-blur-md border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Shield className="w-6 h-6 text-red-400" />
                  Admin Dashboard
                </h1>
                <p className="text-gray-400 text-sm">System overview and monitoring</p>
              </div>
              
              <div className="flex items-center gap-3">
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20"
                  data-filter="time-range"
                >
                  <option value="1h">Last Hour</option>
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card bg-gradient-to-br from-blue-600/20 to-blue-800/20 border-blue-600/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Users</p>
                  <p className="text-2xl font-bold text-blue-400">{stats?.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +{stats?.weeklyGrowth}% this week
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </div>

            <div className="card bg-gradient-to-br from-green-600/20 to-green-800/20 border-green-600/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Online Now</p>
                  <p className="text-2xl font-bold text-green-400">{stats?.onlineUsers}</p>
                  <p className="text-xs text-gray-400">
                    {stats?.activeUsers} active today
                  </p>
                </div>
                <Activity className="w-8 h-8 text-green-400" />
              </div>
            </div>

            <div className="card bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border-yellow-600/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Open Tickets</p>
                  <p className="text-2xl font-bold text-yellow-400">{stats?.openTickets}</p>
                  <p className="text-xs text-gray-400">Support queue</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-400" />
              </div>
            </div>

            <div className="card bg-gradient-to-br from-red-600/20 to-red-800/20 border-red-600/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Flagged Content</p>
                  <p className="text-2xl font-bold text-red-400">{stats?.flaggedContent}</p>
                  <p className="text-xs text-gray-400">Needs review</p>
                </div>
                <Flag className="w-8 h-8 text-red-400" />
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="card">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Server className="w-5 h-5 text-uec-accent" />
                System Status
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Server Uptime</span>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400 font-semibold">{stats?.serverUptime}%</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Active Clients</span>
                  <span className="text-white font-semibold">{stats?.activeClients}/5</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Daily Logins</span>
                  <span className="text-white font-semibold">{stats?.dailyLogins}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Total Messages</span>
                  <span className="text-white font-semibold">{stats?.totalMessages.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-uec-accent" />
                Quick Actions
              </h2>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium">
                  <Users className="w-5 h-5 mx-auto mb-1" />
                  Manage Users
                </button>
                <button className="p-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-sm font-medium">
                  <Flag className="w-5 h-5 mx-auto mb-1" />
                  Review Reports
                </button>
                <button className="p-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors text-sm font-medium">
                  <AlertTriangle className="w-5 h-5 mx-auto mb-1" />
                  Support Tickets
                </button>
                <button className="p-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-sm font-medium">
                  <Globe className="w-5 h-5 mx-auto mb-1" />
                  System Settings
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Activity className="w-5 h-5 text-uec-accent" />
                Recent Activity
              </h2>
              <button className="text-sm text-gray-400 hover:text-white transition-colors">
                View All
              </button>
            </div>
            
            <div className="space-y-3">
              {activity.map((log) => (
                <div 
                  key={log.id} 
                  className={`
                    flex items-center gap-4 p-4 rounded-lg border-l-4 transition-colors hover:bg-gray-800/50
                    ${getSeverityColor(log.severity)}
                  `}
                  data-activity={log.id}
                >
                  <div className="flex-shrink-0">
                    {getActivityIcon(log.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{log.action}</p>
                    <p className="text-xs text-gray-400">by {log.user}</p>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <span className="text-xs text-gray-500">{formatTime(log.timestamp)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
