import { useState, useEffect } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  Ban, 
  UserCheck, 
  Crown, 
  Settings, 
  Eye, 
  Mail,
  Calendar,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  Edit,
  Key
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  rank: 'member' | 'vip' | 'vip++' | 'mod' | 'admin';
  status: 'active' | 'banned' | 'suspended' | 'warned';
  joinDate: string;
  lastSeen: string;
  totalMessages: number;
  reports: number;
  currentGame?: string;
  ipAddress?: string;
  flags: string[];
}

interface BanAction {
  id: string;
  userId: string;
  moderator: string;
  reason: string;
  duration: string;
  timestamp: string;
  active: boolean;
}

// Mock data
const mockUsers: User[] = [
  {
    id: "1",
    username: "steve_builder",
    displayName: "Steve Builder",
    email: "steve@example.com",
    rank: "vip",
    status: "active",
    joinDate: "2023-06-15T00:00:00Z",
    lastSeen: "2024-01-15T10:30:00Z",
    totalMessages: 1247,
    reports: 0,
    currentGame: "Eaglercraft 1.8.8 + OptiFine",
    ipAddress: "192.168.1.100",
    flags: []
  },
  {
    id: "2",
    username: "alex_crafter",
    displayName: "Alex Crafter",
    email: "alex@example.com",
    rank: "vip++",
    status: "active",
    joinDate: "2023-08-22T00:00:00Z",
    lastSeen: "2024-01-15T09:15:00Z",
    totalMessages: 2156,
    reports: 1,
    currentGame: "Vanilla Eaglercraft",
    ipAddress: "192.168.1.101",
    flags: ["trusted"]
  },
  {
    id: "3",
    username: "toxic_player",
    displayName: "Toxic Player",
    email: "toxic@example.com",
    rank: "member",
    status: "banned",
    joinDate: "2023-12-01T00:00:00Z",
    lastSeen: "2024-01-15T08:45:00Z",
    totalMessages: 89,
    reports: 5,
    ipAddress: "192.168.1.102",
    flags: ["multiple_reports", "harassment"]
  },
  {
    id: "4",
    username: "new_player",
    displayName: "New Player",
    email: "new@example.com",
    rank: "member",
    status: "active",
    joinDate: "2024-01-10T00:00:00Z",
    lastSeen: "2024-01-15T07:30:00Z",
    totalMessages: 23,
    reports: 0,
    ipAddress: "192.168.1.103",
    flags: ["new_account"]
  }
];

const mockBans: BanAction[] = [
  {
    id: "ban_1",
    userId: "3",
    moderator: "admin",
    reason: "Repeated harassment and toxic behavior",
    duration: "7 days",
    timestamp: "2024-01-15T10:00:00Z",
    active: true
  }
];

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [bans, setBans] = useState<BanAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [rankFilter, setRankFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showBanModal, setShowBanModal] = useState(false);

  useEffect(() => {
    // Simulate loading user data
    const loadUsers = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsers(mockUsers);
      setBans(mockBans);
      setLoading(false);
    };

    loadUsers();
  }, []);

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'admin': return 'text-red-400 bg-red-500/10';
      case 'mod': return 'text-blue-400 bg-blue-500/10';
      case 'vip++': return 'text-purple-400 bg-purple-500/10';
      case 'vip': return 'text-yellow-400 bg-yellow-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/10';
      case 'banned': return 'text-red-400 bg-red-500/10';
      case 'suspended': return 'text-orange-400 bg-orange-500/10';
      case 'warned': return 'text-yellow-400 bg-yellow-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'banned': return <XCircle className="w-4 h-4" />;
      case 'suspended': return <Clock className="w-4 h-4" />;
      case 'warned': return <AlertTriangle className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatLastSeen = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const handleUserAction = (userId: string, action: 'ban' | 'warn' | 'promote' | 'demote' | 'unban') => {
    setUsers(prev => 
      prev.map(user => {
        if (user.id === userId) {
          switch (action) {
            case 'ban':
              return { ...user, status: 'banned' as const };
            case 'warn':
              return { ...user, status: 'warned' as const };
            case 'unban':
              return { ...user, status: 'active' as const };
            default:
              return user;
          }
        }
        return user;
      })
    );
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRank = rankFilter === 'all' || user.rank === rankFilter;
    return matchesSearch && matchesStatus && matchesRank;
  });

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-2 border-white/20 border-t-white rounded-full mx-auto mb-4"></div>
            <p className="text-gray-300 text-lg">Loading user management...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen">
        {/* Header */}
        <div className="sticky top-16 z-40 bg-black/90 backdrop-blur-md border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Users className="w-6 h-6 text-blue-400" />
                  User Management
                </h1>
                <p className="text-gray-400 text-sm">Manage user accounts, roles, and permissions</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20 w-64"
                    data-search="users"
                  />
                </div>
                
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20"
                  data-filter="status"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="banned">Banned</option>
                  <option value="suspended">Suspended</option>
                  <option value="warned">Warned</option>
                </select>

                <select 
                  value={rankFilter}
                  onChange={(e) => setRankFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20"
                  data-filter="rank"
                >
                  <option value="all">All Ranks</option>
                  <option value="admin">Admin</option>
                  <option value="mod">Moderator</option>
                  <option value="vip++">VIP++</option>
                  <option value="vip">VIP</option>
                  <option value="member">Member</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card bg-blue-600/10 border-blue-600/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Users</p>
                  <p className="text-2xl font-bold text-blue-400">{users.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </div>

            <div className="card bg-green-600/10 border-green-600/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Users</p>
                  <p className="text-2xl font-bold text-green-400">
                    {users.filter(u => u.status === 'active').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </div>

            <div className="card bg-red-600/10 border-red-600/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Banned Users</p>
                  <p className="text-2xl font-bold text-red-400">
                    {users.filter(u => u.status === 'banned').length}
                  </p>
                </div>
                <Ban className="w-8 h-8 text-red-400" />
              </div>
            </div>

            <div className="card bg-yellow-600/10 border-yellow-600/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Reports</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    {users.reduce((sum, u) => sum + u.reports, 0)}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-400" />
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Users</h2>
              <span className="text-sm text-gray-400">
                {filteredUsers.length} users found
              </span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800 border-b border-gray-700">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold">User</th>
                    <th className="text-left py-3 px-4 font-semibold">Rank</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 font-semibold">Activity</th>
                    <th className="text-left py-3 px-4 font-semibold">Reports</th>
                    <th className="text-left py-3 px-4 font-semibold">Joined</th>
                    <th className="text-right py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr 
                      key={user.id} 
                      className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                      data-user={user.id}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-gray-400" />
                          </div>
                          <div>
                            <div className="font-semibold">{user.displayName}</div>
                            <div className="text-sm text-gray-400">@{user.username}</div>
                            {user.flags.length > 0 && (
                              <div className="flex gap-1 mt-1">
                                {user.flags.map(flag => (
                                  <span 
                                    key={flag} 
                                    className="px-1 py-0.5 text-xs bg-orange-600 rounded"
                                  >
                                    {flag.replace('_', ' ')}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRankColor(user.rank)}`}>
                          {user.rank.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(user.status)}`}>
                          {getStatusIcon(user.status)}
                          {user.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          <div>Last seen: {formatLastSeen(user.lastSeen)}</div>
                          <div className="text-gray-400">{user.totalMessages} messages</div>
                          {user.currentGame && (
                            <div className="text-green-400 text-xs">Playing {user.currentGame}</div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`
                          text-sm font-semibold
                          ${user.reports > 3 ? 'text-red-400' : user.reports > 0 ? 'text-yellow-400' : 'text-green-400'}
                        `}>
                          {user.reports}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-400 text-sm">
                        {formatDate(user.joinDate)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 justify-end">
                          <button 
                            onClick={() => setSelectedUser(user)}
                            className="p-1 hover:bg-gray-700 rounded transition-colors"
                            data-action="view-user"
                            data-user-id={user.id}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            className="p-1 hover:bg-gray-700 rounded transition-colors"
                            data-action="edit-user"
                            data-user-id={user.id}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          {user.status === 'active' ? (
                            <button 
                              onClick={() => handleUserAction(user.id, 'ban')}
                              className="p-1 hover:bg-red-700 rounded transition-colors text-red-400"
                              data-action="ban-user"
                              data-user-id={user.id}
                            >
                              <Ban className="w-4 h-4" />
                            </button>
                          ) : user.status === 'banned' ? (
                            <button 
                              onClick={() => handleUserAction(user.id, 'unban')}
                              className="p-1 hover:bg-green-700 rounded transition-colors text-green-400"
                              data-action="unban-user"
                              data-user-id={user.id}
                            >
                              <UserCheck className="w-4 h-4" />
                            </button>
                          ) : null}
                          <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No users found</h3>
                <p className="text-gray-400">
                  {searchTerm || statusFilter !== 'all' || rankFilter !== 'all' 
                    ? "No users match your current filters" 
                    : "No users registered yet."}
                </p>
              </div>
            )}
          </div>

          {/* Recent Bans */}
          {bans.length > 0 && (
            <div className="card mt-8">
              <h2 className="text-xl font-bold mb-6">Recent Bans</h2>
              
              <div className="space-y-3">
                {bans.map((ban) => {
                  const user = users.find(u => u.id === ban.userId);
                  return (
                    <div 
                      key={ban.id} 
                      className="flex items-center gap-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
                      data-ban={ban.id}
                    >
                      <Ban className="w-5 h-5 text-red-400" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {user?.displayName || 'Unknown User'} banned for {ban.duration}
                        </p>
                        <p className="text-xs text-gray-400">
                          Reason: {ban.reason} • by {ban.moderator} • {formatDate(ban.timestamp)}
                        </p>
                      </div>
                      {ban.active && (
                        <span className="px-2 py-1 bg-red-600 text-white text-xs rounded">
                          ACTIVE
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
