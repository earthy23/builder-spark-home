import { useState, useEffect } from "react";
import { ExternalLink, Play, Info, Star, Clock, Users } from "lucide-react";
import Layout from "@/components/Layout";

interface EaglercraftClient {
  name: string;
  displayName: string;
  description: string;
  version: string;
  playerCount: number;
  featured: boolean;
  lastPlayed?: string;
}

// Mock data - this would come from scanning /client/ directory
const mockClients: EaglercraftClient[] = [
  {
    name: "1.5.2",
    displayName: "Eaglercraft 1.5.2",
    description: "Classic Minecraft experience with the original Alpha/Beta feel. Perfect for nostalgic gameplay.",
    version: "1.5.2",
    playerCount: 127,
    featured: true,
    lastPlayed: "2024-01-15T10:30:00Z"
  },
  {
    name: "vanilla",
    displayName: "Vanilla Eaglercraft",
    description: "Pure vanilla Minecraft experience without any modifications. The authentic way to play.",
    version: "1.8.8",
    playerCount: 89,
    featured: true,
  },
  {
    name: "1.8.8-optifine",
    displayName: "Eaglercraft 1.8.8 + OptiFine",
    description: "Enhanced graphics and performance with OptiFine. Includes shaders support and better FPS.",
    version: "1.8.8",
    playerCount: 156,
    featured: false,
    lastPlayed: "2024-01-14T15:45:00Z"
  },
  {
    name: "beta-1.7.3",
    displayName: "Beta 1.7.3",
    description: "Experience Minecraft as it was in the early days. Includes the nostalgic terrain generator.",
    version: "β1.7.3",
    playerCount: 34,
    featured: false,
  },
  {
    name: "creative-mode",
    displayName: "Creative Mode",
    description: "Unlimited blocks and instant building. Perfect for creating massive structures and projects.",
    version: "1.8.8",
    playerCount: 78,
    featured: false,
  }
];

export default function Dashboard() {
  const [clients, setClients] = useState<EaglercraftClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'name' | 'players' | 'recent'>('players');

  useEffect(() => {
    // Simulate loading clients from /client/ directory
    const loadClients = async () => {
      setLoading(true);
      // In real implementation, this would scan the /client/ directory
      await new Promise(resolve => setTimeout(resolve, 1000));
      setClients(mockClients);
      setLoading(false);
    };

    loadClients();
  }, []);

  const sortedClients = [...clients].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.displayName.localeCompare(b.displayName);
      case 'players':
        return b.playerCount - a.playerCount;
      case 'recent':
        if (!a.lastPlayed && !b.lastPlayed) return 0;
        if (!a.lastPlayed) return 1;
        if (!b.lastPlayed) return -1;
        return new Date(b.lastPlayed).getTime() - new Date(a.lastPlayed).getTime();
      default:
        return 0;
    }
  });

  const featuredClients = sortedClients.filter(client => client.featured);
  const otherClients = sortedClients.filter(client => !client.featured);

  const handleLaunchClient = (clientName: string) => {
    // Open client in new tab
    window.open(`/client/${clientName}/index.html`, '_blank');
  };

  const formatLastPlayed = (dateString: string) => {
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

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Header */}
        <div className="section py-8 border-b border-gray-800" data-ui-section="dashboard-header">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Game Launcher</h1>
                <p className="text-gray-300">Choose your Eaglercraft client and start playing instantly</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20"
                  data-sort="clients"
                >
                  <option value="players">Most Players</option>
                  <option value="name">A-Z</option>
                  <option value="recent">Recently Played</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="section py-20 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-white/20 border-t-white rounded-full mx-auto mb-4"></div>
            <p className="text-gray-300">Scanning available clients...</p>
          </div>
        )}

        {/* Featured Clients */}
        {!loading && featuredClients.length > 0 && (
          <section className="section py-8" data-ui-section="featured-clients">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-6 h-6 text-uec-accent" />
                <h2 className="text-2xl font-bold">Featured Clients</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featuredClients.map((client) => (
                  <div key={client.name} className="card hover:scale-[1.02] transition-transform duration-200" data-client={client.name}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{client.displayName}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>v{client.version}</span>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{client.playerCount} online</span>
                          </div>
                          {client.lastPlayed && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{formatLastPlayed(client.lastPlayed)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <Star className="w-5 h-5 text-uec-accent" />
                    </div>
                    
                    <p className="text-gray-300 mb-6">{client.description}</p>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleLaunchClient(client.name)}
                        className="button-primary flex items-center gap-2 flex-1 justify-center"
                        data-action="launch"
                        data-client-name={client.name}
                      >
                        <Play className="w-4 h-4" />
                        Launch Game
                      </button>
                      <button
                        className="button-secondary flex items-center gap-2 px-4"
                        data-action="info"
                        data-client-name={client.name}
                      >
                        <Info className="w-4 h-4" />
                        Info
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Clients */}
        {!loading && (
          <section className="section py-8" data-ui-section="all-clients">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">All Clients</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherClients.map((client) => (
                  <div key={client.name} className="card hover:scale-[1.02] transition-transform duration-200" data-client={client.name}>
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">{client.displayName}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                        <span>v{client.version}</span>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{client.playerCount}</span>
                        </div>
                      </div>
                      {client.lastPlayed && (
                        <div className="flex items-center gap-1 text-sm text-gray-400 mb-3">
                          <Clock className="w-4 h-4" />
                          <span>Last played {formatLastPlayed(client.lastPlayed)}</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{client.description}</p>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleLaunchClient(client.name)}
                        className="button-primary flex items-center gap-2 flex-1 justify-center text-sm"
                        data-action="launch"
                        data-client-name={client.name}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Launch
                      </button>
                      <button
                        className="button-secondary px-3"
                        data-action="info"
                        data-client-name={client.name}
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Empty State */}
        {!loading && clients.length === 0 && (
          <div className="section py-20 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Clients Found</h3>
              <p className="text-gray-400 mb-6">
                No Eaglercraft clients were found in the /client/ directory. Contact an administrator to add game clients.
              </p>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <section className="section py-8 bg-black/30 border-t border-gray-800" data-ui-section="quick-actions">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="/downloads"
                className="card hover:scale-[1.02] transition-transform duration-200 text-center"
                data-action="downloads"
              >
                <ExternalLink className="w-8 h-8 text-uec-accent mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Download Clients</h3>
                <p className="text-sm text-gray-400">Get offline versions</p>
              </a>
              
              <a
                href="/store"
                className="card hover:scale-[1.02] transition-transform duration-200 text-center"
                data-action="store"
              >
                <Star className="w-8 h-8 text-uec-accent mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Upgrade Rank</h3>
                <p className="text-sm text-gray-400">Get premium benefits</p>
              </a>
              
              <a
                href="/support"
                className="card hover:scale-[1.02] transition-transform duration-200 text-center"
                data-action="support"
              >
                <Info className="w-8 h-8 text-uec-accent mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Need Help?</h3>
                <p className="text-sm text-gray-400">Contact support</p>
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
