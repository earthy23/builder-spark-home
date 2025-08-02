import { useState, useEffect } from "react";
import {
  Play,
  Info,
  Star,
  Clock,
  Users,
  ChevronDown,
  ExternalLink,
  Settings,
  Gamepad2,
  Download,
  Globe,
  Activity,
  Zap,
} from "lucide-react";
import Layout from "@/components/Layout";

interface EaglercraftClient {
  id: string;
  name: string;
  displayName: string;
  description: string;
  version: string;
  playerCount: number;
  featured: boolean;
  lastPlayed?: string;
  status: "online" | "maintenance" | "offline";
  category: "classic" | "modded" | "creative" | "beta";
}

// Mock data - this would come from scanning /client/ directory
const mockClients: EaglercraftClient[] = [
  {
    id: "1.5.2",
    name: "1.5.2",
    displayName: "Eaglercraft 1.5.2",
    description:
      "Classic Minecraft experience with the original Alpha/Beta feel. Perfect for nostalgic gameplay.",
    version: "1.5.2",
    playerCount: 127,
    featured: true,
    lastPlayed: "2024-01-15T10:30:00Z",
    status: "online",
    category: "classic",
  },
  {
    id: "vanilla",
    name: "vanilla",
    displayName: "Vanilla Eaglercraft",
    description:
      "Pure vanilla Minecraft experience without any modifications. The authentic way to play.",
    version: "1.8.8",
    playerCount: 89,
    featured: true,
    status: "online",
    category: "classic",
  },
  {
    id: "1.8.8-optifine",
    name: "1.8.8-optifine",
    displayName: "Eaglercraft 1.8.8 + OptiFine",
    description:
      "Enhanced graphics and performance with OptiFine. Includes shaders support and better FPS.",
    version: "1.8.8",
    playerCount: 156,
    featured: false,
    lastPlayed: "2024-01-14T15:45:00Z",
    status: "online",
    category: "modded",
  },
  {
    id: "beta-1.7.3",
    name: "beta-1.7.3",
    displayName: "Beta 1.7.3",
    description:
      "Experience Minecraft as it was in the early days. Includes the nostalgic terrain generator.",
    version: "β1.7.3",
    playerCount: 34,
    featured: false,
    status: "online",
    category: "beta",
  },
  {
    id: "creative-mode",
    name: "creative-mode",
    displayName: "Creative Mode",
    description:
      "Unlimited blocks and instant building. Perfect for creating massive structures and projects.",
    version: "1.8.8",
    playerCount: 78,
    featured: false,
    status: "online",
    category: "creative",
  },
];

export default function Dashboard() {
  const [clients, setClients] = useState<EaglercraftClient[]>([]);
  const [selectedClient, setSelectedClient] =
    useState<EaglercraftClient | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading clients from /client/ directory
    const loadClients = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setClients(mockClients);
      setSelectedClient(mockClients[0]); // Select first client by default
      setLoading(false);
    };

    loadClients();
  }, []);

  const handleLaunchClient = (client: EaglercraftClient) => {
    setCurrentlyPlaying(client.id);
    // Open client in new tab
    window.open(`/client/${client.name}/index.html`, "_blank");

    // Simulate launching
    setTimeout(() => {
      setCurrentlyPlaying(null);
    }, 3000);
  };

  const formatLastPlayed = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "maintenance":
        return "bg-yellow-500";
      case "offline":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "classic":
        return <Globe className="w-4 h-4" />;
      case "modded":
        return <Zap className="w-4 h-4" />;
      case "creative":
        return <Settings className="w-4 h-4" />;
      case "beta":
        return <Activity className="w-4 h-4" />;
      default:
        return <Gamepad2 className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-2 border-white/20 border-t-white rounded-full mx-auto mb-4"></div>
            <p className="text-gray-300 text-lg">
              Loading your game dashboard...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen">
        {/* App Header */}
        <div className="sticky top-16 z-40 bg-black/90 backdrop-blur-md border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Gamepad2 className="w-6 h-6 text-uec-accent" />
                  Game Launcher
                </h1>
                <p className="text-gray-400 text-sm">
                  Choose and launch your favorite Eaglercraft client
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>
                    {clients.reduce(
                      (sum, client) => sum + client.playerCount,
                      0,
                    )}{" "}
                    total players online
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Quick Launch Section */}
          <div className="mb-8">
            <div className="card bg-gradient-to-r from-gray-900 to-black border-gray-700 p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Client Selection */}
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Play className="w-6 h-6 text-uec-accent" />
                    Quick Launch
                  </h2>

                  {/* Dropdown Selector */}
                  <div className="relative mb-6">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-between hover:bg-gray-700 transition-colors"
                      data-dropdown="client-selector"
                    >
                      {selectedClient ? (
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${getStatusColor(selectedClient.status)}`}
                          ></div>
                          <div className="text-left">
                            <div className="font-semibold">
                              {selectedClient.displayName}
                            </div>
                            <div className="text-sm text-gray-400">
                              v{selectedClient.version} •{" "}
                              {selectedClient.playerCount} online
                            </div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">
                          Select a client...
                        </span>
                      )}
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl z-50 max-h-80 overflow-y-auto">
                        {clients.map((client) => (
                          <button
                            key={client.id}
                            onClick={() => {
                              setSelectedClient(client);
                              setDropdownOpen(false);
                            }}
                            className="w-full p-4 text-left hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
                            data-client-option={client.id}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-3 h-3 rounded-full ${getStatusColor(client.status)}`}
                              ></div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold">
                                    {client.displayName}
                                  </span>
                                  {client.featured && (
                                    <Star className="w-4 h-4 text-uec-accent" />
                                  )}
                                  {getCategoryIcon(client.category)}
                                </div>
                                <div className="text-sm text-gray-400">
                                  v{client.version} • {client.playerCount}{" "}
                                  players
                                  {client.lastPlayed &&
                                    ` • Last played ${formatLastPlayed(client.lastPlayed)}`}
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Launch Button */}
                  {selectedClient && (
                    <div className="space-y-4">
                      <button
                        onClick={() => handleLaunchClient(selectedClient)}
                        disabled={currentlyPlaying === selectedClient.id}
                        className="w-full button-primary py-4 text-lg font-semibold flex items-center justify-center gap-3 disabled:opacity-50"
                        data-action="launch-selected"
                        data-client-id={selectedClient.id}
                      >
                        {currentlyPlaying === selectedClient.id ? (
                          <>
                            <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></div>
                            Launching...
                          </>
                        ) : (
                          <>
                            <ExternalLink className="w-5 h-5" />
                            Launch {selectedClient.displayName}
                          </>
                        )}
                      </button>

                      <div className="flex gap-3">
                        <button className="flex-1 button-secondary py-3 flex items-center justify-center gap-2">
                          <Info className="w-4 h-4" />
                          Client Info
                        </button>
                        <button className="flex-1 button-secondary py-3 flex items-center justify-center gap-2">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Selected Client Details */}
                {selectedClient && (
                  <div className="lg:pl-8">
                    <div className="card bg-black/50 border-gray-700">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`w-4 h-4 rounded-full ${getStatusColor(selectedClient.status)}`}
                        ></div>
                        <h3 className="text-xl font-semibold">
                          {selectedClient.displayName}
                        </h3>
                        {selectedClient.featured && (
                          <Star className="w-5 h-5 text-uec-accent" />
                        )}
                      </div>

                      <p className="text-gray-300 mb-4">
                        {selectedClient.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Version:</span>
                          <div className="font-semibold">
                            {selectedClient.version}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-400">Players Online:</span>
                          <div className="font-semibold text-green-400">
                            {selectedClient.playerCount}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-400">Status:</span>
                          <div className="font-semibold capitalize">
                            {selectedClient.status}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-400">Category:</span>
                          <div className="font-semibold capitalize flex items-center gap-1">
                            {getCategoryIcon(selectedClient.category)}
                            {selectedClient.category}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Featured Clients Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-uec-accent" />
              Featured Clients
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clients
                .filter((client) => client.featured)
                .map((client) => (
                  <div
                    key={client.id}
                    className="card hover:scale-[1.02] transition-all duration-200 cursor-pointer"
                    onClick={() => setSelectedClient(client)}
                    data-featured-client={client.id}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-3 h-3 rounded-full ${getStatusColor(client.status)}`}
                      ></div>
                      <Star className="w-5 h-5 text-uec-accent" />
                    </div>

                    <h3 className="text-lg font-semibold mb-2">
                      {client.displayName}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {client.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <span>v{client.version}</span>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{client.playerCount}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLaunchClient(client);
                      }}
                      className="w-full button-primary py-2 text-sm flex items-center justify-center gap-2"
                      data-action="quick-launch"
                      data-client-id={client.id}
                    >
                      <Play className="w-4 h-4" />
                      Quick Launch
                    </button>
                  </div>
                ))}
            </div>
          </div>

          {/* All Clients Table */}
          <div>
            <h2 className="text-2xl font-bold mb-6">All Available Clients</h2>

            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800 border-b border-gray-700">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold">
                        Client
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Version
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Players
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Last Played
                      </th>
                      <th className="text-right py-3 px-4 font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client) => (
                      <tr
                        key={client.id}
                        className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                        data-client-row={client.id}
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            {getCategoryIcon(client.category)}
                            <div>
                              <div className="font-semibold flex items-center gap-2">
                                {client.displayName}
                                {client.featured && (
                                  <Star className="w-4 h-4 text-uec-accent" />
                                )}
                              </div>
                              <div className="text-sm text-gray-400 capitalize">
                                {client.category}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-300">
                          {client.version}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1 text-green-400">
                            <Users className="w-4 h-4" />
                            <span>{client.playerCount}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${getStatusColor(client.status)}`}
                            ></div>
                            <span className="capitalize text-sm">
                              {client.status}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-400 text-sm">
                          {client.lastPlayed
                            ? formatLastPlayed(client.lastPlayed)
                            : "Never"}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2 justify-end">
                            <button
                              onClick={() => handleLaunchClient(client)}
                              className="button-primary px-3 py-1 text-sm flex items-center gap-1"
                              data-action="table-launch"
                              data-client-id={client.id}
                            >
                              <Play className="w-3 h-3" />
                              Launch
                            </button>
                            <button className="button-secondary px-2 py-1">
                              <Info className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
