import { Search, MapPin, Clock, BarChart3, Home, Package } from "lucide-react";
import { useState } from "react";

interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const navItems: NavItem[] = [
  { id: "location", icon: <MapPin className="w-5 h-5" />, label: "Live Location" },
  { id: "prediction", icon: <Clock className="w-5 h-5" />, label: "Prediction Time" },
  { id: "home", icon: <Home className="w-5 h-5" />, label: "Home", active: true },
  { id: "progress", icon: <BarChart3 className="w-5 h-5" />, label: "Delivery Progress" },
];

const BottomNavigation = () => {
  const [trackingId, setTrackingId] = useState("PKG-2024-789456123");
  const [activeItem, setActiveItem] = useState("home");

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Search Field */}
          <div className="flex-1 max-w-xs">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Enter Tracking ID..."
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>
          
          {/* Navigation Items */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200
                  ${activeItem === item.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }
                `}
              >
                {item.icon}
                <span className={`text-sm font-medium hidden sm:inline ${activeItem === item.id ? "" : ""}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
