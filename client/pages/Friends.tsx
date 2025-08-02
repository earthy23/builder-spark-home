import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Users, 
  UserPlus, 
  Search, 
  MoreVertical, 
  MessageCircle, 
  Phone, 
  UserX, 
  Crown,
  Gamepad2,
  Clock,
  Filter,
  Grid,
  List,
  Settings
} from "lucide-react";
import Layout from "@/components/Layout";

interface Friend {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  lastSeen: string;
  currentGame?: string;
  rank: 'member' | 'vip' | 'vip++' | 'mod' | 'admin';
  mutualFriends: number;
  friendSince: string;
}

interface FriendRequest {
  id: string;
  from: Friend;
  timestamp: string;
  message?: string;
}

// Mock data
const mockFriends: Friend[] = [
  {
    id: "1",
    username: "steve_builder",
    displayName: "Steve Builder",
    status: 'online',
    lastSeen: "2024-01-15T10:30:00Z",
    currentGame: "Eaglercraft 1.8.8 + OptiFine",
    rank: 'vip',
    mutualFriends: 3,
    friendSince: "2023-06-15T00:00:00Z"
  },
  {
    id: "2",
    username: "alex_crafter",
    displayName: "Alex Crafter",
    status: 'online',
    lastSeen: "2024-01-15T09:15:00Z",
    currentGame: "Vanilla Eaglercraft",
    rank: 'vip++',
    mutualFriends: 7,
    friendSince: "2023-08-22T00:00:00Z"
  },
  {
    id: "3",
    username: "redstone_master",
    displayName: "Redstone Master",
    status: 'away',
    lastSeen: "2024-01-15T08:45:00Z",
    rank: 'member',
    mutualFriends: 1,
    friendSince: "2023-12-01T00:00:00Z"
  },
  {
    id: "4",
    username: "pixel_artist",
    displayName: "Pixel Artist",
    status: 'busy',
    lastSeen: "2024-01-15T07:30:00Z",
    currentGame: "Creative Mode",
    rank: 'vip',
    mutualFriends: 5,
    friendSince: "2023-05-10T00:00:00Z"
  },
  {
    id: "5",
    username: "block_explorer",
    displayName: "Block Explorer",
    status: 'offline',
    lastSeen: "2024-01-14T22:15:00Z",
    rank: 'member',
    mutualFriends: 2,
    friendSince: "2023-09-18T00:00:00Z"
  }
];

const mockFriendRequests: FriendRequest[] = [
  {
    id: "req1",
    from: {
      id: "new1",
      username: "new_player",
      displayName: "New Player",
      status: 'online',
      lastSeen: "2024-01-15T10:00:00Z",
      rank: 'member',
      mutualFriends: 1,
      friendSince: ""
    },
    timestamp: "2024-01-15T09:30:00Z",
    message: "Hey! I saw you in the server. Want to be friends?"
  },
  {
    id: "req2",
    from: {
      id: "new2",
      username: "builder_pro",
      displayName: "Builder Pro",
      status: 'online',
      lastSeen: "2024-01-15T09:45:00Z",
      rank: 'vip',
      mutualFriends: 3,
      friendSince: ""
    },
    timestamp: "2024-01-15T08:15:00Z"
  }
];

export default function Friends() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading friends data
    const loadFriends = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFriends(mockFriends);
      setFriendRequests(mockFriendRequests);
      setLoading(false);
    };

    loadFriends();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'admin': return 'text-red-400';
      case 'mod': return 'text-blue-400';
      case 'vip++': return 'text-purple-400';
      case 'vip': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getRankIcon = (rank: string) => {
    if (rank === 'admin' || rank === 'mod') return <Crown className="w-4 h-4" />;
    return null;
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 30) return `${diffDays}d ago`;
    return `${diffMonths}mo ago`;
  };

  const filteredFriends = friends.filter(friend => {
    const matchesSearch = friend.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         friend.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || friend.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const onlineFriends = friends.filter(f => f.status === 'online').length;
  const totalFriends = friends.length;

  const handleAcceptFriend = (requestId: string) => {
    const request = friendRequests.find(r => r.id === requestId);
    if (request) {
      setFriends(prev => [...prev, { ...request.from, friendSince: new Date().toISOString() }]);
      setFriendRequests(prev => prev.filter(r => r.id !== requestId));
    }
  };

  const handleDeclineFriend = (requestId: string) => {
    setFriendRequests(prev => prev.filter(r => r.id !== requestId));
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-2 border-white/20 border-t-white rounded-full mx-auto mb-4"></div>
            <p className="text-gray-300 text-lg">Loading your friends...</p>
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
                  <Users className="w-6 h-6 text-uec-accent" />
                  Friends ({onlineFriends}/{totalFriends} online)
                </h1>
                <p className="text-gray-400 text-sm">Manage your friends and see who's playing</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search friends..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20 w-64"
                    data-search="friends"
                  />
                </div>
                
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20"
                  data-filter="status"
                >
                  <option value="all">All Status</option>
                  <option value="online">Online</option>
                  <option value="away">Away</option>
                  <option value="busy">Busy</option>
                  <option value="offline">Offline</option>
                </select>
                
                <div className="flex items-center bg-gray-800 rounded-md border border-gray-700">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
                    data-view="grid"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
                    data-view="list"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Friend Requests */}
          {friendRequests.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-uec-accent" />
                Friend Requests ({friendRequests.length})
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {friendRequests.map((request) => (
                  <div key={request.id} className="card border-yellow-600/30 bg-yellow-600/5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-gray-400" />
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${getStatusColor(request.from.status)}`}></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{request.from.displayName}</span>
                          {getRankIcon(request.from.rank)}
                          <span className={`text-xs ${getRankColor(request.from.rank)}`}>{request.from.rank.toUpperCase()}</span>
                        </div>
                        <div className="text-sm text-gray-400">@{request.from.username}</div>
                        <div className="text-xs text-gray-500">{request.from.mutualFriends} mutual friends</div>
                      </div>
                    </div>
                    
                    {request.message && (
                      <p className="text-sm text-gray-300 mb-3 italic">"{request.message}"</p>
                    )}
                    
                    <div className="text-xs text-gray-500 mb-3">
                      {formatTimeAgo(request.timestamp)}
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAcceptFriend(request.id)}
                        className="flex-1 button-primary py-2 text-sm"
                        data-action="accept-friend"
                        data-request-id={request.id}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleDeclineFriend(request.id)}
                        className="flex-1 button-secondary py-2 text-sm"
                        data-action="decline-friend"
                        data-request-id={request.id}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Friends List */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Your Friends</h2>
              <Link 
                to="/friends/requests" 
                className="button-secondary px-4 py-2 text-sm flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Add Friends
              </Link>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredFriends.map((friend) => (
                  <div key={friend.id} className="card hover:scale-[1.02] transition-all duration-200">
                    <div className="text-center">
                      <div className="relative inline-block mb-4">
                        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto">
                          <Users className="w-8 h-8 text-gray-400" />
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-gray-800 ${getStatusColor(friend.status)}`}></div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <span className="font-semibold">{friend.displayName}</span>
                          {getRankIcon(friend.rank)}
                        </div>
                        <div className="text-sm text-gray-400">@{friend.username}</div>
                        <div className={`text-xs ${getRankColor(friend.rank)}`}>{friend.rank.toUpperCase()}</div>
                      </div>
                      
                      {friend.currentGame && friend.status === 'online' && (
                        <div className="mb-3 p-2 bg-green-600/20 rounded-md">
                          <div className="flex items-center justify-center gap-1 text-green-400 text-xs">
                            <Gamepad2 className="w-3 h-3" />
                            <span>Playing {friend.currentGame}</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="text-xs text-gray-500 mb-4">
                        <div>Friends since {formatTimeAgo(friend.friendSince)}</div>
                        <div>{friend.mutualFriends} mutual friends</div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Link
                          to={`/chat/${friend.id}`}
                          className="flex-1 button-primary py-2 text-sm flex items-center justify-center gap-1"
                          data-action="message"
                          data-friend-id={friend.id}
                        >
                          <MessageCircle className="w-3 h-3" />
                          Message
                        </Link>
                        <button
                          className="button-secondary px-3 py-2"
                          data-action="voice-call"
                          data-friend-id={friend.id}
                        >
                          <Phone className="w-3 h-3" />
                        </button>
                        <button className="button-secondary px-3 py-2">
                          <MoreVertical className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-800 border-b border-gray-700">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold">Friend</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 font-semibold">Current Game</th>
                        <th className="text-left py-3 px-4 font-semibold">Friends Since</th>
                        <th className="text-right py-3 px-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFriends.map((friend) => (
                        <tr 
                          key={friend.id} 
                          className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                                  <Users className="w-5 h-5 text-gray-400" />
                                </div>
                                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-gray-800 ${getStatusColor(friend.status)}`}></div>
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold">{friend.displayName}</span>
                                  {getRankIcon(friend.rank)}
                                  <span className={`text-xs ${getRankColor(friend.rank)}`}>{friend.rank.toUpperCase()}</span>
                                </div>
                                <div className="text-sm text-gray-400">@{friend.username}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${getStatusColor(friend.status)}`}></div>
                              <span className="capitalize text-sm">{friend.status}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            {friend.currentGame ? (
                              <div className="flex items-center gap-1 text-green-400 text-sm">
                                <Gamepad2 className="w-4 h-4" />
                                <span>{friend.currentGame}</span>
                              </div>
                            ) : (
                              <span className="text-gray-500 text-sm">Not playing</span>
                            )}
                          </td>
                          <td className="py-4 px-4 text-gray-400 text-sm">
                            {formatTimeAgo(friend.friendSince)}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2 justify-end">
                              <Link
                                to={`/chat/${friend.id}`}
                                className="button-primary px-3 py-1 text-sm flex items-center gap-1"
                              >
                                <MessageCircle className="w-3 h-3" />
                                Message
                              </Link>
                              <button className="button-secondary px-2 py-1">
                                <Phone className="w-3 h-3" />
                              </button>
                              <button className="button-secondary px-2 py-1">
                                <MoreVertical className="w-3 h-3" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {filteredFriends.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No friends found</h3>
                <p className="text-gray-400 mb-6">
                  {searchTerm ? "Try adjusting your search or filters" : "Start building your friend network!"}
                </p>
                <Link to="/friends/requests" className="button-primary px-6 py-3">
                  Add Friends
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
