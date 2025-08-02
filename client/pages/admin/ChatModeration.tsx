import { useState, useEffect } from "react";
import { 
  MessageCircle, 
  Flag, 
  Eye, 
  Ban, 
  Check, 
  X, 
  AlertTriangle, 
  User, 
  Calendar,
  Clock,
  Shield,
  Search,
  Filter,
  ExternalLink,
  MoreVertical
} from "lucide-react";
import Layout from "@/components/Layout";

interface FlaggedMessage {
  id: string;
  messageId: string;
  content: string;
  sender: {
    id: string;
    username: string;
    displayName: string;
    rank: string;
  };
  reporter: {
    id: string;
    username: string;
    displayName: string;
  };
  reason: 'spam' | 'harassment' | 'inappropriate' | 'hate_speech' | 'other';
  context: string[];
  timestamp: string;
  reportedAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'critical';
  chatLocation: string;
}

interface ModerationAction {
  id: string;
  type: 'warning' | 'mute' | 'ban' | 'delete_message' | 'approve' | 'reject';
  targetUser?: string;
  moderator: string;
  reason: string;
  duration?: string;
  timestamp: string;
}

// Mock data
const mockFlaggedMessages: FlaggedMessage[] = [
  {
    id: "flag_1",
    messageId: "msg_123",
    content: "This is some inappropriate content that was reported",
    sender: {
      id: "user_1",
      username: "toxic_player",
      displayName: "Toxic Player",
      rank: "member"
    },
    reporter: {
      id: "user_2",
      username: "steve_builder",
      displayName: "Steve Builder"
    },
    reason: "harassment",
    context: [
      "Previous message: Hey everyone!",
      "Flagged message: This is some inappropriate content that was reported",
      "Next message: Sorry about that..."
    ],
    timestamp: "2024-01-15T10:30:00Z",
    reportedAt: "2024-01-15T10:35:00Z",
    status: "pending",
    priority: "high",
    chatLocation: "General Chat"
  },
  {
    id: "flag_2",
    messageId: "msg_124",
    content: "Spam message advertising external links",
    sender: {
      id: "user_3",
      username: "spammer",
      displayName: "Spammer",
      rank: "member"
    },
    reporter: {
      id: "user_4",
      username: "alex_crafter",
      displayName: "Alex Crafter"
    },
    reason: "spam",
    context: [
      "Previous message: Check this out",
      "Flagged message: Spam message advertising external links",
      "Next message: (user was muted)"
    ],
    timestamp: "2024-01-15T09:15:00Z",
    reportedAt: "2024-01-15T09:20:00Z",
    status: "approved",
    priority: "medium",
    chatLocation: "Build Squad Group"
  },
  {
    id: "flag_3",
    messageId: "msg_125",
    content: "Hate speech content that violates community guidelines",
    sender: {
      id: "user_5",
      username: "bad_actor",
      displayName: "Bad Actor",
      rank: "member"
    },
    reporter: {
      id: "user_6",
      username: "moderator",
      displayName: "Moderator"
    },
    reason: "hate_speech",
    context: [
      "Previous message: I don't like...",
      "Flagged message: Hate speech content that violates community guidelines",
      "Next message: (message deleted)"
    ],
    timestamp: "2024-01-15T08:45:00Z",
    reportedAt: "2024-01-15T08:46:00Z",
    status: "resolved",
    priority: "critical",
    chatLocation: "DM with user_7"
  }
];

const mockActions: ModerationAction[] = [
  {
    id: "action_1",
    type: "ban",
    targetUser: "toxic_player",
    moderator: "admin",
    reason: "Repeated harassment violations",
    duration: "24 hours",
    timestamp: "2024-01-15T10:40:00Z"
  },
  {
    id: "action_2",
    type: "delete_message",
    moderator: "moderator",
    reason: "Spam content removed",
    timestamp: "2024-01-15T09:25:00Z"
  }
];

export default function ChatModeration() {
  const [flaggedMessages, setFlaggedMessages] = useState<FlaggedMessage[]>([]);
  const [recentActions, setRecentActions] = useState<ModerationAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [selectedMessage, setSelectedMessage] = useState<FlaggedMessage | null>(null);

  useEffect(() => {
    // Simulate loading moderation data
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFlaggedMessages(mockFlaggedMessages);
      setRecentActions(mockActions);
      setLoading(false);
    };

    loadData();
  }, []);

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case 'hate_speech': return 'bg-red-600';
      case 'harassment': return 'bg-orange-600';
      case 'inappropriate': return 'bg-yellow-600';
      case 'spam': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 bg-red-500/10';
      case 'high': return 'text-orange-400 bg-orange-500/10';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10';
      case 'low': return 'text-green-400 bg-green-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-500/10';
      case 'approved': return 'text-red-400 bg-red-500/10';
      case 'rejected': return 'text-green-400 bg-green-500/10';
      case 'resolved': return 'text-blue-400 bg-blue-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleAction = (messageId: string, action: 'approve' | 'reject' | 'warn' | 'ban') => {
    setFlaggedMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { 
              ...msg, 
              status: action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'resolved'
            }
          : msg
      )
    );
  };

  const filteredMessages = flaggedMessages.filter(msg => {
    const matchesSearch = msg.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         msg.sender.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || msg.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || msg.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-2 border-white/20 border-t-white rounded-full mx-auto mb-4"></div>
            <p className="text-gray-300 text-lg">Loading moderation queue...</p>
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
                  <Flag className="w-6 h-6 text-red-400" />
                  Chat Moderation
                </h1>
                <p className="text-gray-400 text-sm">Review flagged content and moderate chat violations</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20 w-64"
                    data-search="messages"
                  />
                </div>
                
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20"
                  data-filter="status"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="resolved">Resolved</option>
                </select>

                <select 
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20"
                  data-filter="priority"
                >
                  <option value="all">All Priority</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card bg-yellow-600/10 border-yellow-600/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Pending Review</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    {flaggedMessages.filter(m => m.status === 'pending').length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-400" />
              </div>
            </div>

            <div className="card bg-red-600/10 border-red-600/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">High Priority</p>
                  <p className="text-2xl font-bold text-red-400">
                    {flaggedMessages.filter(m => m.priority === 'critical' || m.priority === 'high').length}
                  </p>
                </div>
                <Flag className="w-8 h-8 text-red-400" />
              </div>
            </div>

            <div className="card bg-blue-600/10 border-blue-600/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Resolved Today</p>
                  <p className="text-2xl font-bold text-blue-400">
                    {flaggedMessages.filter(m => m.status === 'resolved').length}
                  </p>
                </div>
                <Check className="w-8 h-8 text-blue-400" />
              </div>
            </div>

            <div className="card bg-green-600/10 border-green-600/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Actions Taken</p>
                  <p className="text-2xl font-bold text-green-400">{recentActions.length}</p>
                </div>
                <Shield className="w-8 h-8 text-green-400" />
              </div>
            </div>
          </div>

          {/* Flagged Messages */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Flagged Messages</h2>
              <span className="text-sm text-gray-400">
                {filteredMessages.length} messages found
              </span>
            </div>
            
            <div className="space-y-4">
              {filteredMessages.map((message) => (
                <div 
                  key={message.id} 
                  className="p-6 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800/70 transition-colors"
                  data-message={message.id}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(message.priority)}`}>
                          {message.priority.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                          {message.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="font-semibold">{message.sender.displayName}</span>
                          <span className="text-sm text-gray-400">@{message.sender.username}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getReasonColor(message.reason)}`}>
                            {message.reason.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-400">
                          in {message.chatLocation} • Reported by {message.reporter.displayName}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right text-sm text-gray-400">
                      <div>Sent: {formatTime(message.timestamp)}</div>
                      <div>Reported: {formatTime(message.reportedAt)}</div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-red-400 mb-2">Flagged Content:</h4>
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <p className="text-gray-300">"{message.content}"</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Message Context:</h4>
                    <div className="space-y-1">
                      {message.context.map((ctx, index) => (
                        <div 
                          key={index} 
                          className={`
                            p-2 rounded text-sm
                            ${ctx.includes('Flagged message:') 
                              ? 'bg-red-500/10 border border-red-500/30 text-red-300' 
                              : 'bg-gray-700/50 text-gray-400'
                            }
                          `}
                        >
                          {ctx}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {message.status === 'pending' && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAction(message.id, 'approve')}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                        data-action="approve-violation"
                        data-message-id={message.id}
                      >
                        <Ban className="w-4 h-4" />
                        Approve Violation
                      </button>
                      <button
                        onClick={() => handleAction(message.id, 'reject')}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                        data-action="reject-report"
                        data-message-id={message.id}
                      >
                        <Check className="w-4 h-4" />
                        Reject Report
                      </button>
                      <button
                        onClick={() => setSelectedMessage(message)}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                        data-action="view-details"
                        data-message-id={message.id}
                      >
                        <Eye className="w-4 h-4" />
                        Details
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {filteredMessages.length === 0 && (
              <div className="text-center py-12">
                <Flag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No flagged messages</h3>
                <p className="text-gray-400">
                  {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all' 
                    ? "No messages match your current filters" 
                    : "All clear! No content has been flagged for review."}
                </p>
              </div>
            )}
          </div>

          {/* Recent Actions */}
          <div className="card mt-8">
            <h2 className="text-xl font-bold mb-6">Recent Moderation Actions</h2>
            
            <div className="space-y-3">
              {recentActions.map((action) => (
                <div 
                  key={action.id} 
                  className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-lg"
                  data-action-log={action.id}
                >
                  <Shield className="w-5 h-5 text-blue-400" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {action.type.replace('_', ' ').toUpperCase()}: {action.reason}
                    </p>
                    <p className="text-xs text-gray-400">
                      by {action.moderator} • {formatTime(action.timestamp)}
                      {action.duration && ` • Duration: ${action.duration}`}
                    </p>
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
