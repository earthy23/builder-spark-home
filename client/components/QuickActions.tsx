import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, MessageCircle, UserPlus, Phone, Users, X } from "lucide-react";

export default function QuickActions() {
  const [isOpen, setIsOpen] = useState(false);

  const quickActions = [
    {
      icon: MessageCircle,
      label: "New Chat",
      href: "/chat",
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      icon: UserPlus,
      label: "Add Friend",
      href: "/friends/requests",
      color: "bg-green-600 hover:bg-green-700"
    },
    {
      icon: Users,
      label: "Create Group",
      href: "/chat/create-group",
      color: "bg-purple-600 hover:bg-purple-700"
    },
    {
      icon: Phone,
      label: "Start Call",
      href: "/friends",
      color: "bg-orange-600 hover:bg-orange-700"
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Quick Action Items */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 space-y-3 animate-in slide-in-from-bottom duration-200">
          {quickActions.map((action, index) => (
            <Link
              key={action.label}
              to={action.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg transition-all duration-200
                ${action.color} text-white hover:scale-105 group
                animate-in slide-in-from-right
              `}
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setIsOpen(false)}
              data-quick-action={action.label.toLowerCase().replace(' ', '-')}
            >
              <action.icon className="w-5 h-5" />
              <span className="font-medium whitespace-nowrap">{action.label}</span>
            </Link>
          ))}
        </div>
      )}

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-14 h-14 rounded-full shadow-lg transition-all duration-300 
          flex items-center justify-center group
          ${isOpen 
            ? 'bg-red-600 hover:bg-red-700 rotate-45' 
            : 'bg-uec-accent hover:bg-yellow-600 hover:scale-110'
          }
        `}
        data-action="toggle-quick-actions"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Plus className="w-6 h-6 text-black" />
        )}
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 -z-10 bg-black/20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
