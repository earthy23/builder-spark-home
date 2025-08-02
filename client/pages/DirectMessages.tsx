import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { 
  MessageCircle, 
  Search, 
  Phone, 
  Video, 
  MoreVertical, 
  Send, 
  Smile,
  Paperclip,
  Users,
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Circle,
  Image as ImageIcon,
  Pin,
  Archive,
  Trash2
} from "lucide-react";
import Layout from "@/components/Layout";

interface User {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  rank: 'member' | 'vip' | 'vip++' | 'mod' | 'admin';
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
  edited?: boolean;
  replyTo?: string;
}

interface DirectConversation {
  id: string;
  participant: User;
  lastMessage?: Message;
  unreadCount: number;
  isPinned?: boolean;
  isArchived?: boolean;
  lastSeen: string;
  isTyping?: boolean;
}

interface VoiceCall {
  id: string;
  participantId: string;
  isActive: boolean;
  isMuted: boolean;
  duration: number;
}

// Mock data
const mockUsers: User[] = [
  {
    id: "1",
    username: "steve_builder",
    displayName: "Steve Builder",
    status: 'online',
    rank: 'vip'
  },
  {
    id: "2",
    username: "alex_crafter",
    displayName: "Alex Crafter",
    status: 'online',
    rank: 'vip++'
  },
  {
    id: "3",
    username: "redstone_master",
    displayName: "Redstone Master",
    status: 'away',
    rank: 'member'
  },
  {
    id: "4",
    username: "pixel_artist",
    displayName: "Pixel Artist",
    status: 'busy',
    rank: 'vip'
  },
  {
    id: "5",
    username: "builder_pro",
    displayName: "Builder Pro",
    status: 'offline',
    rank: 'member'
  }
];

const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "1",
    content: "Hey! Want to build something together?",
    timestamp: "2024-01-15T10:30:00Z",
    type: 'text'
  },
  {
    id: "2",
    senderId: "current",
    content: "Sure! I was thinking about making a castle",
    timestamp: "2024-01-15T10:31:00Z",
    type: 'text'
  },
  {
    id: "3",
    senderId: "1",
    content: "Perfect! I have some great ideas for the architecture",
    timestamp: "2024-01-15T10:32:00Z",
    type: 'text'
  },
  {
    id: "4",
    senderId: "current",
    content: "Let me hop on the creative server",
    timestamp: "2024-01-15T10:33:00Z",
    type: 'text'
  }
];

const mockConversations: DirectConversation[] = [
  {
    id: "dm_1",
    participant: mockUsers[0],
    lastMessage: mockMessages[3],
    unreadCount: 0,
    isPinned: true,
    lastSeen: "2024-01-15T10:33:00Z"
  },
  {
    id: "dm_2",
    participant: mockUsers[1],
    lastMessage: {
      id: "5",
      senderId: "2",
      content: "Check out this new building technique!",
      timestamp: "2024-01-15T09:15:00Z",
      type: 'text'
    },
    unreadCount: 2,
    lastSeen: "2024-01-15T09:15:00Z"
  },
  {
    id: "dm_3",
    participant: mockUsers[2],
    lastMessage: {
      id: "6",
      senderId: "current",
      content: "Thanks for the redstone help earlier",
      timestamp: "2024-01-15T08:45:00Z",
      type: 'text'
    },
    unreadCount: 0,
    lastSeen: "2024-01-15T08:45:00Z",
    isTyping: true
  },
  {
    id: "dm_4",
    participant: mockUsers[3],
    lastMessage: {
      id: "7",
      senderId: "4",
      content: "Love your latest pixel art!",
      timestamp: "2024-01-14T20:30:00Z",
      type: 'text'
    },
    unreadCount: 1,
    lastSeen: "2024-01-14T20:30:00Z"
  },
  {
    id: "dm_5",
    participant: mockUsers[4],
    lastMessage: {
      id: "8",
      senderId: "current",
      content: "See you online tomorrow!",
      timestamp: "2024-01-14T18:15:00Z",
      type: 'text'
    },
    unreadCount: 0,
    isArchived: true,
    lastSeen: "2024-01-14T18:15:00Z"
  }
];

export default function DirectMessages() {
  const { id } = useParams<{ id: string }>();
  const [conversations, setConversations] = useState<DirectConversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<DirectConversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [voiceCall, setVoiceCall] = useState<VoiceCall | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showArchived, setShowArchived] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading DM data
    const loadDMs = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setConversations(mockConversations);
      
      if (id) {
        const conversation = mockConversations.find(c => c.id === id);
        if (conversation) {
          setCurrentConversation(conversation);
          setMessages(mockMessages);
        }
      }
      
      setLoading(false);
    };

    loadDMs();
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatLastSeen = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'now';
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString();
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !currentConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: "current",
      content: newMessage,
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
    
    // Update conversation's last message
    setConversations(prev => 
      prev.map(conv => 
        conv.id === currentConversation.id 
          ? { ...conv, lastMessage: message, lastSeen: new Date().toISOString() }
          : conv
      )
    );
  };

  const startVoiceCall = () => {
    if (!currentConversation) return;
    
    const call: VoiceCall = {
      id: Date.now().toString(),
      participantId: currentConversation.participant.id,
      isActive: true,
      isMuted: false,
      duration: 0
    };
    
    setVoiceCall(call);
  };

  const endVoiceCall = () => {
    setVoiceCall(null);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const togglePin = (conversationId: string) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, isPinned: !conv.isPinned }
          : conv
      )
    );
  };

  const toggleArchive = (conversationId: string) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, isArchived: !conv.isArchived }
          : conv
      )
    );
  };

  const filteredConversations = conversations.filter(conv => {
    if (conv.isArchived && !showArchived) return false;
    
    const name = conv.participant.displayName;
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const pinnedConversations = filteredConversations.filter(c => c.isPinned && !c.isArchived);
  const regularConversations = filteredConversations.filter(c => !c.isPinned && !c.isArchived);
  const archivedConversations = filteredConversations.filter(c => c.isArchived);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-2 border-white/20 border-t-white rounded-full mx-auto mb-4"></div>
            <p className="text-gray-300 text-lg">Loading your messages...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="flex h-[calc(100vh-4rem)]">
          {/* DM Conversations Sidebar */}
          <div className="w-80 bg-gray-900/90 border-r border-gray-800 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-blue-400" />
                  Direct Messages
                </h2>
                <button 
                  onClick={() => setShowArchived(!showArchived)}
                  className={`p-2 rounded-md transition-colors ${
                    showArchived ? 'bg-blue-600 text-white' : 'hover:bg-gray-800 text-gray-400'
                  }`}
                  data-toggle="archived"
                >
                  <Archive className="w-4 h-4" />
                </button>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20 text-sm"
                  data-search="conversations"
                />
              </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              {/* Pinned Conversations */}
              {pinnedConversations.length > 0 && (
                <div className="p-3">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Pin className="w-3 h-3" />
                    Pinned
                  </h3>
                  {pinnedConversations.map((conversation) => (
                    <ConversationItem 
                      key={conversation.id} 
                      conversation={conversation} 
                      isActive={currentConversation?.id === conversation.id}
                      onTogglePin={togglePin}
                      onToggleArchive={toggleArchive}
                    />
                  ))}
                </div>
              )}

              {/* Regular Conversations */}
              {regularConversations.length > 0 && (
                <div className="p-3">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Messages
                  </h3>
                  {regularConversations.map((conversation) => (
                    <ConversationItem 
                      key={conversation.id} 
                      conversation={conversation} 
                      isActive={currentConversation?.id === conversation.id}
                      onTogglePin={togglePin}
                      onToggleArchive={toggleArchive}
                    />
                  ))}
                </div>
              )}

              {/* Archived Conversations */}
              {showArchived && archivedConversations.length > 0 && (
                <div className="p-3">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Archive className="w-3 h-3" />
                    Archived
                  </h3>
                  {archivedConversations.map((conversation) => (
                    <ConversationItem 
                      key={conversation.id} 
                      conversation={conversation} 
                      isActive={currentConversation?.id === conversation.id}
                      onTogglePin={togglePin}
                      onToggleArchive={toggleArchive}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {currentConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-800 bg-gray-900/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                          <MessageCircle className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-gray-900 ${getStatusColor(currentConversation.participant.status)}`}></div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold flex items-center gap-2">
                          {currentConversation.participant.displayName}
                          <span className={`text-xs ${getRankColor(currentConversation.participant.rank)}`}>
                            {currentConversation.participant.rank.toUpperCase()}
                          </span>
                        </h3>
                        <p className="text-sm text-gray-400">
                          @{currentConversation.participant.username} • {currentConversation.participant.status}
                          {currentConversation.isTyping && (
                            <span className="text-blue-400 ml-2 flex items-center gap-1">
                              <Circle className="w-2 h-2 animate-pulse" />
                              typing...
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={startVoiceCall}
                        className="p-2 hover:bg-gray-800 rounded-md transition-colors"
                        data-action="start-voice-call"
                      >
                        <Phone className="w-5 h-5" />
                      </button>
                      <button
                        className="p-2 hover:bg-gray-800 rounded-md transition-colors"
                        data-action="start-video-call"
                      >
                        <Video className="w-5 h-5" />
                      </button>
                      <button className="p-2 hover:bg-gray-800 rounded-md transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Voice Call UI */}
                {voiceCall && (
                  <div className="p-4 bg-green-600/20 border-b border-green-600/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <PhoneCall className="w-5 h-5 text-green-400" />
                        <div>
                          <div className="font-semibold text-green-400">Voice Call Active</div>
                          <div className="text-sm text-gray-400">
                            with {currentConversation.participant.displayName}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={toggleMute}
                          className={`p-2 rounded-md transition-colors ${
                            isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
                          }`}
                          data-action="toggle-mute"
                        >
                          {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={endVoiceCall}
                          className="p-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                          data-action="end-call"
                        >
                          <PhoneOff className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => {
                    const isOwnMessage = message.senderId === "current";
                    const sender = message.senderId === "current" 
                      ? { displayName: "You", rank: 'member' as const }
                      : currentConversation.participant;
                    
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
                          {!isOwnMessage && (
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-semibold">{sender.displayName}</span>
                              <span className="text-xs text-gray-500">
                                {formatTime(message.timestamp)}
                              </span>
                            </div>
                          )}
                          
                          <div
                            className={`
                              p-3 rounded-lg ${
                                isOwnMessage 
                                  ? 'bg-blue-600 text-white' 
                                  : 'bg-gray-800 text-white'
                              }
                            `}
                          >
                            <p>{message.content}</p>
                            {isOwnMessage && (
                              <div className="text-xs text-blue-200 mt-1 text-right">
                                {formatTime(message.timestamp)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-800">
                  <div className="flex items-center gap-3">
                    <button className="p-2 hover:bg-gray-800 rounded-md transition-colors">
                      <Paperclip className="w-5 h-5 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-800 rounded-md transition-colors">
                      <ImageIcon className="w-5 h-5 text-gray-400" />
                    </button>
                    
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder={`Message ${currentConversation.participant.displayName}...`}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20"
                        data-input="message"
                      />
                    </div>
                    
                    <button className="p-2 hover:bg-gray-800 rounded-md transition-colors">
                      <Smile className="w-5 h-5 text-gray-400" />
                    </button>
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="button-primary px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      data-action="send-message"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* No Chat Selected */
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Select a conversation</h3>
                  <p className="text-gray-400 mb-6">
                    Choose from your direct messages to start chatting
                  </p>
                  <Link 
                    to="/friends" 
                    className="button-primary px-6 py-3 flex items-center gap-2 mx-auto"
                  >
                    <Users className="w-4 h-4" />
                    Find Friends
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Helper component for conversation items
function ConversationItem({ 
  conversation, 
  isActive, 
  onTogglePin, 
  onToggleArchive 
}: {
  conversation: DirectConversation;
  isActive: boolean;
  onTogglePin: (id: string) => void;
  onToggleArchive: (id: string) => void;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const formatLastSeen = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'now';
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString();
  };

  return (
    <Link
      to={`/messages/${conversation.id}`}
      className={`
        block p-3 rounded-lg transition-colors border-l-2 mb-2 group
        ${isActive 
          ? 'bg-blue-600/20 border-l-blue-500' 
          : 'hover:bg-gray-800/50 border-l-transparent'
        }
      `}
      data-conversation={conversation.id}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-gray-400" />
          </div>
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-900 ${getStatusColor(conversation.participant.status)}`}></div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold truncate flex items-center gap-1">
              {conversation.isPinned && <Pin className="w-3 h-3 text-yellow-400" />}
              {conversation.participant.displayName}
            </h3>
            {conversation.lastMessage && (
              <span className="text-xs text-gray-500">
                {formatLastSeen(conversation.lastSeen)}
              </span>
            )}
          </div>
          
          {conversation.isTyping && (
            <div className="text-sm text-blue-400 flex items-center gap-1">
              <Circle className="w-2 h-2 animate-pulse" />
              <span>typing...</span>
            </div>
          )}
          
          {conversation.lastMessage && !conversation.isTyping && (
            <p className="text-sm text-gray-400 truncate">
              {conversation.lastMessage.senderId === "current" ? "You: " : ""}
              {conversation.lastMessage.content}
            </p>
          )}
          
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-500">
              @{conversation.participant.username}
            </span>
            {conversation.unreadCount > 0 && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                {conversation.unreadCount}
              </span>
            )}
          </div>
        </div>
        
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.preventDefault();
              onTogglePin(conversation.id);
            }}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
            data-action="toggle-pin"
          >
            <Pin className="w-3 h-3" />
          </button>
        </div>
      </div>
    </Link>
  );
}
