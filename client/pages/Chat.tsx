import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { 
  MessageCircle, 
  Search, 
  Plus, 
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
  Volume2,
  VolumeX,
  Crown,
  Circle,
  Settings,
  UserPlus,
  LogOut,
  Image as ImageIcon
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
  type: 'text' | 'image' | 'file' | 'system';
  edited?: boolean;
  replyTo?: string;
}

interface Conversation {
  id: string;
  type: 'dm' | 'group';
  name?: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  isTyping?: string[];
  createdAt: string;
  owner?: string;
}

interface VoiceCall {
  id: string;
  conversationId: string;
  participants: User[];
  isActive: boolean;
  isMuted: boolean;
  isSpeaking: { [userId: string]: boolean };
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
  }
];

const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "1",
    content: "Hey! Want to join me in the creative server?",
    timestamp: "2024-01-15T10:30:00Z",
    type: 'text'
  },
  {
    id: "2",
    senderId: "current",
    content: "Sure! I'll be there in a few minutes",
    timestamp: "2024-01-15T10:31:00Z",
    type: 'text'
  },
  {
    id: "3",
    senderId: "1",
    content: "Awesome! I'm building a huge castle right now",
    timestamp: "2024-01-15T10:32:00Z",
    type: 'text'
  }
];

const mockConversations: Conversation[] = [
  {
    id: "dm_1",
    type: 'dm',
    participants: [mockUsers[0]],
    lastMessage: mockMessages[2],
    unreadCount: 0,
    createdAt: "2024-01-10T00:00:00Z"
  },
  {
    id: "dm_2",
    type: 'dm',
    participants: [mockUsers[1]],
    lastMessage: {
      id: "4",
      senderId: "2",
      content: "Did you see the new update?",
      timestamp: "2024-01-15T09:15:00Z",
      type: 'text'
    },
    unreadCount: 2,
    createdAt: "2024-01-08T00:00:00Z"
  },
  {
    id: "group_1",
    type: 'group',
    name: "Build Squad",
    participants: mockUsers,
    lastMessage: {
      id: "5",
      senderId: "3",
      content: "Anyone want to work on the mega project tonight?",
      timestamp: "2024-01-15T08:45:00Z",
      type: 'text'
    },
    unreadCount: 1,
    createdAt: "2024-01-05T00:00:00Z",
    owner: "current",
    isTyping: ["1"]
  }
];

export default function Chat() {
  const { id } = useParams<{ id: string }>();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [voiceCall, setVoiceCall] = useState<VoiceCall | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading chat data
    const loadChats = async () => {
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

    loadChats();
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
          ? { ...conv, lastMessage: message }
          : conv
      )
    );
  };

  const startVoiceCall = () => {
    if (!currentConversation) return;
    
    const call: VoiceCall = {
      id: Date.now().toString(),
      conversationId: currentConversation.id,
      participants: currentConversation.participants.filter(p => p.status === 'online'),
      isActive: true,
      isMuted: false,
      isSpeaking: {}
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

  const filteredConversations = conversations.filter(conv => {
    const name = conv.type === 'dm' 
      ? conv.participants[0]?.displayName 
      : conv.name;
    return name?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-2 border-white/20 border-t-white rounded-full mx-auto mb-4"></div>
            <p className="text-gray-300 text-lg">Loading your chats...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen">
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Conversations Sidebar */}
          <div className="w-80 bg-gray-900/90 border-r border-gray-800 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-uec-accent" />
                  Messages
                </h2>
                <Link 
                  to="/chat/create-group" 
                  className="p-2 hover:bg-gray-800 rounded-md transition-colors"
                  data-action="create-group"
                >
                  <Plus className="w-5 h-5" />
                </Link>
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
              {filteredConversations.map((conversation) => {
                const participant = conversation.participants[0];
                const isActive = currentConversation?.id === conversation.id;
                
                return (
                  <Link
                    key={conversation.id}
                    to={`/chat/${conversation.id}`}
                    className={`
                      block p-4 hover:bg-gray-800/50 transition-colors border-r-2
                      ${isActive ? 'bg-gray-800 border-white' : 'border-transparent'}
                    `}
                    data-conversation={conversation.id}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        {conversation.type === 'group' ? (
                          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-gray-400" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                            <MessageCircle className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                        {conversation.type === 'dm' && participant && (
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-900 ${getStatusColor(participant.status)}`}></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold truncate">
                            {conversation.type === 'dm' 
                              ? participant?.displayName 
                              : conversation.name}
                          </h3>
                          {conversation.lastMessage && (
                            <span className="text-xs text-gray-500">
                              {formatLastSeen(conversation.lastMessage.timestamp)}
                            </span>
                          )}
                        </div>
                        
                        {conversation.isTyping && conversation.isTyping.length > 0 && (
                          <div className="text-sm text-uec-accent flex items-center gap-1">
                            <Circle className="w-2 h-2 animate-pulse" />
                            <span>typing...</span>
                          </div>
                        )}
                        
                        {conversation.lastMessage && !conversation.isTyping?.length && (
                          <p className="text-sm text-gray-400 truncate">
                            {conversation.lastMessage.content}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between mt-1">
                          {conversation.type === 'group' && (
                            <span className="text-xs text-gray-500">
                              {conversation.participants.length} members
                            </span>
                          )}
                          {conversation.unreadCount > 0 && (
                            <span className="bg-uec-accent text-black text-xs px-2 py-1 rounded-full font-semibold">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
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
                        {currentConversation.type === 'group' ? (
                          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-gray-400" />
                          </div>
                        ) : (
                          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                            <MessageCircle className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                        {currentConversation.type === 'dm' && currentConversation.participants[0] && (
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-gray-900 ${getStatusColor(currentConversation.participants[0].status)}`}></div>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="font-semibold">
                          {currentConversation.type === 'dm' 
                            ? currentConversation.participants[0]?.displayName 
                            : currentConversation.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {currentConversation.type === 'dm' 
                            ? `@${currentConversation.participants[0]?.username} • ${currentConversation.participants[0]?.status}`
                            : `${currentConversation.participants.length} members`}
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
                            {voiceCall.participants.length} participant(s)
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
                      : mockUsers.find(u => u.id === message.senderId);
                    
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
                          {!isOwnMessage && (
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-semibold">{sender?.displayName}</span>
                              {sender?.rank && sender.rank !== 'member' && (
                                <span className={`text-xs ${getRankColor(sender.rank)}`}>
                                  {sender.rank.toUpperCase()}
                                </span>
                              )}
                              <span className="text-xs text-gray-500">
                                {formatTime(message.timestamp)}
                              </span>
                            </div>
                          )}
                          
                          <div
                            className={`
                              p-3 rounded-lg ${
                                isOwnMessage 
                                  ? 'bg-white text-black' 
                                  : 'bg-gray-800 text-white'
                              }
                            `}
                          >
                            <p>{message.content}</p>
                            {isOwnMessage && (
                              <div className="text-xs text-gray-600 mt-1 text-right">
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
                        placeholder="Type a message..."
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
                    Choose from your existing conversations or start a new one
                  </p>
                  <Link 
                    to="/chat/create-group" 
                    className="button-primary px-6 py-3 flex items-center gap-2 mx-auto"
                  >
                    <Plus className="w-4 h-4" />
                    Start New Chat
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
