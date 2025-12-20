import { useState, KeyboardEvent } from "react";
import { Search, MapPin, Brain, BarChart3, Home } from "lucide-react";
import { useApp } from "@/context/AppContext";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const { searchTracking, t, allTrackingIds } = useApp();
  const [searchValue, setSearchValue] = useState("");

  const navItems = [
    { id: "location", icon: <MapPin className="w-5 h-5" />, label: t("live_location") },
    { id: "prediction", icon: <Brain className="w-5 h-5" />, label: t("ai_prediction") },
    { id: "home", icon: <Home className="w-5 h-5" />, label: t("home") },
    { id: "progress", icon: <BarChart3 className="w-5 h-5" />, label: t("delivery_progress") },
  ];

  const handleSearch = () => {
    if (searchValue.trim()) {
      searchTracking(searchValue.trim());
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t("enter_tracking_id")}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-10 pr-4 py-3 text-sm bg-secondary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex gap-1 mt-1 flex-wrap">
              {allTrackingIds.slice(0, 2).map((id) => (
                <button
                  key={id}
                  onClick={() => { setSearchValue(id); searchTracking(id); }}
                  className="text-[10px] text-primary hover:underline"
                >
                  {id}
                </button>
              ))}
            </div>
          </div>
          
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium hidden lg:inline">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
