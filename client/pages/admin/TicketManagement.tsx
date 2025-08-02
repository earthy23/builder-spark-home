import { useState, useEffect } from "react";
import { 
  LifeBuoy, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  MessageCircle,
  User,
  Calendar,
  Tag,
  Send,
  Paperclip,
  Eye,
  MoreVertical,
  ArrowRight
} from "lucide-react";
import AdminLayout from "@/components/AdminLayout";

interface Ticket {
  id: string;
  subject: string;
  description: string;
  category: 'technical' | 'billing' | 'abuse' | 'feature' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'waiting_response' | 'resolved' | 'closed';
  user: {
    id: string;
    username: string;
    displayName: string;
    email: string;
  };
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  responses: TicketResponse[];
  tags: string[];
}

interface TicketResponse {
  id: string;
  content: string;
  author: {
    id: string;
    username: string;
    displayName: string;
    isStaff: boolean;
  };
  timestamp: string;
  attachments?: string[];
}

// Mock data
const mockTickets: Ticket[] = [
  {
    id: "ticket_1",
    subject: "Cannot connect to server",
    description: "I keep getting disconnected from the game server. The error message says 'Connection timeout'. This has been happening for the past 2 days.",
    category: "technical",
    priority: "high",
    status: "open",
    user: {
      id: "user_1",
      username: "steve_builder",
      displayName: "Steve Builder",
      email: "steve@example.com"
    },
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    responses: [],
    tags: ["connection", "timeout"]
  },
  {
    id: "ticket_2",
    subject: "VIP rank not working",
    description: "I purchased VIP rank yesterday but I still don't have access to VIP features. My username is alex_crafter and I have the receipt.",
    category: "billing",
    priority: "medium",
    status: "in_progress",
    user: {
      id: "user_2",
      username: "alex_crafter",
      displayName: "Alex Crafter",
      email: "alex@example.com"
    },
    assignedTo: "support_agent_1",
    createdAt: "2024-01-14T15:20:00Z",
    updatedAt: "2024-01-15T09:15:00Z",
    responses: [
      {
        id: "resp_1",
        content: "Hi Alex, thank you for contacting us. I can see your VIP purchase in our system. I'm escalating this to our billing team to resolve the issue with your rank.",
        author: {
          id: "support_1",
          username: "support_agent_1",
          displayName: "Support Agent",
          isStaff: true
        },
        timestamp: "2024-01-15T09:15:00Z"
      }
    ],
    tags: ["vip", "billing", "rank"]
  },
  {
    id: "ticket_3",
    subject: "Report player harassment",
    description: "Player 'toxic_player' has been harassing me and other players in chat. They use inappropriate language and won't stop even after warnings.",
    category: "abuse",
    priority: "high",
    status: "resolved",
    user: {
      id: "user_3",
      username: "peaceful_player",
      displayName: "Peaceful Player",
      email: "peaceful@example.com"
    },
    assignedTo: "moderator_1",
    createdAt: "2024-01-13T20:45:00Z",
    updatedAt: "2024-01-14T12:30:00Z",
    responses: [
      {
        id: "resp_2",
        content: "Thank you for reporting this. We have reviewed the chat logs and taken appropriate action against the reported player. They have been banned for 7 days.",
        author: {
          id: "mod_1",
          username: "moderator_1",
          displayName: "Moderator",
          isStaff: true
        },
        timestamp: "2024-01-14T12:30:00Z"
      }
    ],
    tags: ["harassment", "chat", "resolved"]
  }
];

export default function TicketManagement() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [newResponse, setNewResponse] = useState("");

  useEffect(() => {
    // Simulate loading ticket data
    const loadTickets = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTickets(mockTickets);
      setLoading(false);
    };

    loadTickets();
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'high': return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/10 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-blue-400 bg-blue-500/10';
      case 'in_progress': return 'text-yellow-400 bg-yellow-500/10';
      case 'waiting_response': return 'text-purple-400 bg-purple-500/10';
      case 'resolved': return 'text-green-400 bg-green-500/10';
      case 'closed': return 'text-gray-400 bg-gray-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertCircle className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'waiting_response': return <MessageCircle className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'closed': return <XCircle className="w-4 h-4" />;
      default: return <LifeBuoy className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'bg-blue-600';
      case 'billing': return 'bg-green-600';
      case 'abuse': return 'bg-red-600';
      case 'feature': return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    setTickets(prev => 
      prev.map(ticket => 
        ticket.id === ticketId 
          ? { ...ticket, status: newStatus as any, updatedAt: new Date().toISOString() }
          : ticket
      )
    );
    
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket(prev => prev ? { ...prev, status: newStatus as any } : null);
    }
  };

  const handleSendResponse = () => {
    if (!newResponse.trim() || !selectedTicket) return;

    const response: TicketResponse = {
      id: Date.now().toString(),
      content: newResponse,
      author: {
        id: "admin",
        username: "admin",
        displayName: "Admin",
        isStaff: true
      },
      timestamp: new Date().toISOString()
    };

    const updatedTicket = {
      ...selectedTicket,
      responses: [...selectedTicket.responses, response],
      updatedAt: new Date().toISOString(),
      status: 'waiting_response' as const
    };

    setTickets(prev => 
      prev.map(ticket => 
        ticket.id === selectedTicket.id ? updatedTicket : ticket
      )
    );

    setSelectedTicket(updatedTicket);
    setNewResponse("");
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || ticket.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-2 border-white/20 border-t-white rounded-full mx-auto mb-4"></div>
            <p className="text-gray-300 text-lg">Loading support tickets...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen">
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Tickets Sidebar */}
          <div className="w-96 bg-gray-900/90 border-r border-gray-800 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <LifeBuoy className="w-5 h-5 text-blue-400" />
                  Support Tickets
                </h2>
              </div>
              
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tickets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20 text-sm"
                    data-search="tickets"
                  />
                </div>
                
                <div className="flex gap-2">
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="flex-1 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
                    data-filter="status"
                  >
                    <option value="all">All Status</option>
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="waiting_response">Waiting</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                  
                  <select 
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="flex-1 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
                    data-filter="category"
                  >
                    <option value="all">All Categories</option>
                    <option value="technical">Technical</option>
                    <option value="billing">Billing</option>
                    <option value="abuse">Abuse</option>
                    <option value="feature">Feature</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tickets List */}
            <div className="flex-1 overflow-y-auto">
              {filteredTickets.map((ticket) => {
                const isSelected = selectedTicket?.id === ticket.id;
                
                return (
                  <div
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket)}
                    className={`
                      p-4 border-b border-gray-800 cursor-pointer transition-colors hover:bg-gray-800/50
                      ${isSelected ? 'bg-gray-800 border-r-2 border-r-blue-500' : ''}
                    `}
                    data-ticket={ticket.id}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-sm line-clamp-2">{ticket.subject}</h3>
                      <span className={`px-1 py-0.5 rounded text-xs ${getCategoryColor(ticket.category)}`}>
                        {ticket.category.toUpperCase()}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-400 line-clamp-2 mb-3">{ticket.description}</p>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(ticket.status)}`}>
                        {getStatusIcon(ticket.status)}
                        {ticket.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 border rounded text-xs ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{ticket.user.displayName}</span>
                      <span>{formatTime(ticket.updatedAt)}</span>
                    </div>
                    
                    {ticket.responses.length > 0 && (
                      <div className="mt-2 text-xs text-blue-400">
                        {ticket.responses.length} response{ticket.responses.length !== 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ticket Detail */}
          <div className="flex-1 flex flex-col">
            {selectedTicket ? (
              <>
                {/* Ticket Header */}
                <div className="p-6 border-b border-gray-800 bg-gray-900/50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h1 className="text-2xl font-bold mb-2">{selectedTicket.subject}</h1>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {selectedTicket.user.displayName} (@{selectedTicket.user.username})
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatTime(selectedTicket.createdAt)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <select 
                        value={selectedTicket.status}
                        onChange={(e) => handleStatusChange(selectedTicket.id, e.target.value)}
                        className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20"
                        data-status="change"
                      >
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="waiting_response">Waiting Response</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                      <button className="p-2 hover:bg-gray-800 rounded-md transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(selectedTicket.status)}`}>
                      {getStatusIcon(selectedTicket.status)}
                      {selectedTicket.status.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 border rounded text-sm ${getPriorityColor(selectedTicket.priority)}`}>
                      {selectedTicket.priority.toUpperCase()} PRIORITY
                    </span>
                    <span className={`px-2 py-1 rounded text-sm text-white ${getCategoryColor(selectedTicket.category)}`}>
                      {selectedTicket.category.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Original Message */}
                  <div className="p-4 bg-gray-800/30 border border-gray-700 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold">{selectedTicket.user.displayName}</div>
                        <div className="text-sm text-gray-400">{formatTime(selectedTicket.createdAt)}</div>
                      </div>
                    </div>
                    <p className="text-gray-300">{selectedTicket.description}</p>
                  </div>

                  {/* Responses */}
                  {selectedTicket.responses.map((response) => (
                    <div 
                      key={response.id} 
                      className={`
                        p-4 border rounded-lg
                        ${response.author.isStaff 
                          ? 'bg-green-500/10 border-green-500/30 ml-8' 
                          : 'bg-gray-800/30 border-gray-700 mr-8'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          response.author.isStaff ? 'bg-green-600' : 'bg-blue-600'
                        }`}>
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold flex items-center gap-2">
                            {response.author.displayName}
                            {response.author.isStaff && (
                              <span className="px-2 py-0.5 bg-green-600 text-white text-xs rounded">STAFF</span>
                            )}
                          </div>
                          <div className="text-sm text-gray-400">{formatTime(response.timestamp)}</div>
                        </div>
                      </div>
                      <p className="text-gray-300">{response.content}</p>
                    </div>
                  ))}
                </div>

                {/* Reply Box */}
                <div className="p-6 border-t border-gray-800">
                  <div className="flex items-end gap-3">
                    <div className="flex-1">
                      <textarea
                        value={newResponse}
                        onChange={(e) => setNewResponse(e.target.value)}
                        placeholder="Type your response..."
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
                        data-input="response"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className="p-3 hover:bg-gray-800 rounded-lg transition-colors">
                        <Paperclip className="w-5 h-5 text-gray-400" />
                      </button>
                      <button
                        onClick={handleSendResponse}
                        disabled={!newResponse.trim()}
                        className="p-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                        data-action="send-response"
                      >
                        <Send className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* No Ticket Selected */
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <LifeBuoy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Select a ticket</h3>
                  <p className="text-gray-400">
                    Choose a support ticket from the list to view details and respond
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
