import { useState } from "react";
import { Bell, X, MessageCircle, UserPlus, Phone, Crown, CheckCircle } from "lucide-react";

interface Notification {
  id: string;
  type: 'message' | 'friend_request' | 'call' | 'achievement' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionable?: boolean;
  from?: {
    username: string;
    displayName: string;
  };
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: 'message',
    title: "New message",
    message: "Steve Builder sent you a message",
    timestamp: "2024-01-15T10:30:00Z",
    read: false,
    from: { username: "steve_builder", displayName: "Steve Builder" }
  },
  {
    id: "2",
    type: 'friend_request',
    title: "Friend request",
    message: "Alex Crafter wants to be your friend",
    timestamp: "2024-01-15T09:15:00Z",
    read: false,
    actionable: true,
    from: { username: "alex_crafter", displayName: "Alex Crafter" }
  },
  {
    id: "3",
    type: 'call',
    title: "Missed call",
    message: "You missed a call from Build Squad group",
    timestamp: "2024-01-15T08:45:00Z",
    read: true
  },
  {
    id: "4",
    type: 'achievement',
    title: "Achievement unlocked!",
    message: "You've been active for 30 days straight",
    timestamp: "2024-01-15T00:00:00Z",
    read: true
  }
];

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message': return <MessageCircle className="w-5 h-5 text-blue-400" />;
      case 'friend_request': return <UserPlus className="w-5 h-5 text-green-400" />;
      case 'call': return <Phone className="w-5 h-5 text-yellow-400" />;
      case 'achievement': return <Crown className="w-5 h-5 text-purple-400" />;
      default: return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20"
        onClick={onClose}
      />
      
      {/* Notification Panel */}
      <div className="absolute top-16 right-4 w-96 max-h-[80vh] bg-gray-900 border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-800 bg-gray-800">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <Bell className="w-5 h-5 text-uec-accent" />
              Notifications
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                  data-action="mark-all-read"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
                data-action="close-notifications"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No notifications</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`
                  p-4 border-b border-gray-800 hover:bg-gray-800/50 transition-colors cursor-pointer
                  ${!notification.read ? 'bg-blue-600/10 border-l-4 border-l-blue-500' : ''}
                `}
                onClick={() => markAsRead(notification.id)}
                data-notification={notification.id}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <span className="text-xs text-gray-500">
                        {formatTimeAgo(notification.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-300">{notification.message}</p>
                    
                    {notification.actionable && (
                      <div className="flex gap-2 mt-3">
                        <button 
                          className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors"
                          data-action="accept"
                          data-notification-id={notification.id}
                        >
                          Accept
                        </button>
                        <button 
                          className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-colors"
                          data-action="decline"
                          data-notification-id={notification.id}
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification.id);
                    }}
                    className="p-1 hover:bg-gray-700 rounded transition-colors opacity-0 group-hover:opacity-100"
                    data-action="delete-notification"
                    data-notification-id={notification.id}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
