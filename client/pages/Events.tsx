import { Calendar, Clock, Users, MapPin, Trophy, Gift } from "lucide-react";
import Layout from "@/components/Layout";

interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  type: "competition" | "community" | "tournament" | "special";
  participants: number;
  maxParticipants?: number;
  prize?: string;
  status: "upcoming" | "ongoing" | "ended";
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Monthly Building Competition",
    description:
      "Show off your creativity in our monthly building contest! Theme: Medieval Castles",
    startDate: "2024-01-20T00:00:00Z",
    endDate: "2024-01-27T23:59:59Z",
    type: "competition",
    participants: 42,
    maxParticipants: 100,
    prize: "VIP+ for 1 month + Custom Role",
    status: "upcoming",
  },
  {
    id: "2",
    title: "Community Game Night",
    description:
      "Join us for a fun community game night with mini-games and group activities!",
    startDate: "2024-01-18T20:00:00Z",
    endDate: "2024-01-18T22:00:00Z",
    type: "community",
    participants: 67,
    status: "ongoing",
  },
  {
    id: "3",
    title: "PvP Tournament",
    description:
      "1v1 PvP tournament with bracket elimination. Test your combat skills!",
    startDate: "2024-01-15T19:00:00Z",
    endDate: "2024-01-15T21:00:00Z",
    type: "tournament",
    participants: 24,
    maxParticipants: 32,
    prize: "$50 Gift Card + Champion Role",
    status: "ended",
  },
];

export default function Events() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-600/20 text-blue-400";
      case "ongoing":
        return "bg-green-600/20 text-green-400";
      case "ended":
        return "bg-gray-600/20 text-gray-400";
      default:
        return "bg-gray-600/20 text-gray-400";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "competition":
        return Trophy;
      case "tournament":
        return Trophy;
      case "community":
        return Users;
      case "special":
        return Gift;
      default:
        return Calendar;
    }
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
                  <Calendar className="w-6 h-6 text-uec-accent" />
                  Community Events
                </h1>
                <p className="text-gray-400 text-sm">
                  Join competitions, tournaments, and community activities
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Event Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card text-center">
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <div className="text-2xl font-bold text-white mb-1">12</div>
              <div className="text-gray-400">Active Competitions</div>
            </div>
            <div className="card text-center">
              <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <div className="text-2xl font-bold text-white mb-1">247</div>
              <div className="text-gray-400">Total Participants</div>
            </div>
            <div className="card text-center">
              <Gift className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <div className="text-2xl font-bold text-white mb-1">$500</div>
              <div className="text-gray-400">Prizes This Month</div>
            </div>
          </div>

          {/* Event Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button className="px-4 py-2 bg-white text-black rounded-lg font-medium">
              All Events
            </button>
            <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
              Competitions
            </button>
            <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
              Tournaments
            </button>
            <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
              Community
            </button>
            <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
              Special Events
            </button>
          </div>

          {/* Events List */}
          <div className="space-y-6">
            {mockEvents.map((event) => {
              const TypeIcon = getTypeIcon(event.type);
              return (
                <div
                  key={event.id}
                  className="card hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                      <TypeIcon className="w-8 h-8 text-uec-accent" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-white">
                              {event.title}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(event.status)}`}
                            >
                              {event.status.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-gray-300 mb-3">
                            {event.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {formatDate(event.startDate)} -{" "}
                                {formatDate(event.endDate)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{formatTime(event.startDate)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              <span>
                                {event.participants} participant
                                {event.participants !== 1 ? "s" : ""}
                                {event.maxParticipants &&
                                  ` / ${event.maxParticipants} max`}
                              </span>
                            </div>
                            {event.prize && (
                              <div className="flex items-center gap-2">
                                <Trophy className="w-4 h-4" />
                                <span>{event.prize}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          {event.status === "upcoming" && (
                            <button className="button-primary px-6 py-2">
                              Join Event
                            </button>
                          )}
                          {event.status === "ongoing" && (
                            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                              Join Now
                            </button>
                          )}
                          {event.status === "ended" && (
                            <button className="button-secondary px-6 py-2">
                              View Results
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Create Event CTA */}
          <div className="card bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-600/30 text-center mt-12">
            <h3 className="text-xl font-bold mb-2">Want to Host an Event?</h3>
            <p className="text-gray-300 mb-6">
              Contact our community team to organize your own tournament or
              competition!
            </p>
            <button className="button-primary px-8 py-3">Contact Staff</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
