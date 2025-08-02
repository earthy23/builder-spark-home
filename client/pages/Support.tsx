import { useState } from "react";
import { 
  LifeBuoy, 
  MessageCircle, 
  Mail, 
  Phone, 
  Send,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search
} from "lucide-react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  createdAt: string;
  updatedAt: string;
}

const mockTickets: Ticket[] = [
  {
    id: 'T001',
    title: 'Cannot launch Eaglercraft 1.8.8',
    description: 'Getting a white screen when trying to launch the game',
    status: 'in-progress',
    priority: 'high',
    category: 'Technical Issue',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T14:20:00Z'
  },
  {
    id: 'T002',
    title: 'Friend request not working',
    description: 'Unable to send friend requests to other users',
    status: 'resolved',
    priority: 'medium',
    category: 'Social Features',
    createdAt: '2024-01-14T16:45:00Z',
    updatedAt: '2024-01-15T09:15:00Z'
  }
];

export default function Support() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    category: 'Technical Issue',
    priority: 'medium'
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-blue-400 bg-blue-400/10';
      case 'in-progress': return 'text-yellow-400 bg-yellow-400/10';
      case 'resolved': return 'text-green-400 bg-green-400/10';
      case 'closed': return 'text-gray-400 bg-gray-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-400 bg-red-400/10';
      case 'high': return 'text-orange-400 bg-orange-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'low': return 'text-green-400 bg-green-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting ticket:', newTicket);
    // Reset form
    setNewTicket({
      title: '',
      description: '',
      category: 'Technical Issue',
      priority: 'medium'
    });
    setActiveTab('tickets');
  };

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Header */}
        <div className="sticky top-16 z-40 bg-black/90 backdrop-blur-md border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <LifeBuoy className="w-6 h-6 text-uec-accent" />
                  Support Center
                </h1>
                <p className="text-gray-400 text-sm">Get help and submit support tickets</p>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('create')}
                  className="button-primary px-4 py-2 flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  New Ticket
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'tickets', label: 'My Tickets' },
              { id: 'create', label: 'Submit Ticket' },
              { id: 'faq', label: 'FAQ' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-black'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Quick Help Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card text-center">
                  <MessageCircle className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
                  <p className="text-gray-400 mb-4">Get instant help from our support team</p>
                  <button className="button-primary w-full">Start Chat</button>
                </div>

                <div className="card text-center">
                  <Mail className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Email Support</h3>
                  <p className="text-gray-400 mb-4">Send us an email for detailed assistance</p>
                  <button className="button-secondary w-full">Send Email</button>
                </div>

                <div className="card text-center">
                  <FileText className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Knowledge Base</h3>
                  <p className="text-gray-400 mb-4">Browse articles and tutorials</p>
                  <button className="button-secondary w-full">Browse Articles</button>
                </div>
              </div>

              {/* Common Issues */}
              <div className="card">
                <h2 className="text-xl font-bold mb-6">Common Issues</h2>
                <div className="space-y-4">
                  {[
                    { title: 'Game won\'t load', description: 'Troubleshoot loading issues with game clients' },
                    { title: 'Friend requests not working', description: 'Fix problems with the friends system' },
                    { title: 'Account login problems', description: 'Resolve authentication and login issues' },
                    { title: 'Chat not working', description: 'Fix messaging and chat functionality' }
                  ].map((issue, index) => (
                    <div key={index} className="p-4 border border-gray-700 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer">
                      <h3 className="font-semibold text-white mb-1">{issue.title}</h3>
                      <p className="text-gray-400 text-sm">{issue.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* My Tickets Tab */}
          {activeTab === 'tickets' && (
            <div className="space-y-6">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">My Support Tickets</h2>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search tickets..."
                        className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {mockTickets.map((ticket) => (
                      <div key={ticket.id} className="card hover:bg-gray-800/50 transition-colors cursor-pointer">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-white">{ticket.title}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                                {ticket.status.replace('-', ' ').toUpperCase()}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                                {ticket.priority.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-gray-400 mb-3">{ticket.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>ID: {ticket.id}</span>
                              <span>Category: {ticket.category}</span>
                              <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                              <span>Updated: {new Date(ticket.updatedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {ticket.status === 'open' && <Clock className="w-5 h-5 text-blue-400" />}
                            {ticket.status === 'in-progress' && <AlertTriangle className="w-5 h-5 text-yellow-400" />}
                            {ticket.status === 'resolved' && <CheckCircle className="w-5 h-5 text-green-400" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="card text-center py-12">
                  <LifeBuoy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Please log in to view your tickets</h3>
                  <p className="text-gray-400">You need to be logged in to access your support tickets.</p>
                </div>
              )}
            </div>
          )}

          {/* Create Ticket Tab */}
          {activeTab === 'create' && (
            <div className="max-w-2xl">
              <div className="card">
                <h2 className="text-xl font-bold mb-6">Submit a Support Ticket</h2>
                
                {isAuthenticated ? (
                  <form onSubmit={handleSubmitTicket} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={newTicket.title}
                        onChange={(e) => setNewTicket(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Brief description of your issue"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Category
                        </label>
                        <select
                          value={newTicket.category}
                          onChange={(e) => setNewTicket(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Technical Issue">Technical Issue</option>
                          <option value="Account Problem">Account Problem</option>
                          <option value="Social Features">Social Features</option>
                          <option value="Billing">Billing</option>
                          <option value="Feature Request">Feature Request</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Priority
                        </label>
                        <select
                          value={newTicket.priority}
                          onChange={(e) => setNewTicket(prev => ({ ...prev, priority: e.target.value }))}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        value={newTicket.description}
                        onChange={(e) => setNewTicket(prev => ({ ...prev, description: e.target.value }))}
                        rows={6}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Please provide detailed information about your issue, including any error messages and steps to reproduce the problem."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="button-primary px-6 py-3 flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Submit Ticket
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-12">
                    <LifeBuoy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Please log in to submit a ticket</h3>
                    <p className="text-gray-400">You need to be logged in to submit support tickets.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div className="card">
              <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {[
                  {
                    question: "How do I launch a game?",
                    answer: "Go to the Dashboard, select your preferred client from the dropdown, and click 'Launch'. The game will open in a new tab."
                  },
                  {
                    question: "Why can't I add friends?",
                    answer: "Make sure you're logged in and have the correct username. Friend requests may take a moment to appear."
                  },
                  {
                    question: "How do I change my password?",
                    answer: "Go to Profile Settings > Account & Security and use the Change Password section."
                  },
                  {
                    question: "What are the different user roles?",
                    answer: "Member (default), VIP (premium), VIP+ (premium plus), Moderator (chat moderation), and Admin (full access)."
                  }
                ].map((faq, index) => (
                  <div key={index} className="border-b border-gray-700 pb-4 last:border-b-0">
                    <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
