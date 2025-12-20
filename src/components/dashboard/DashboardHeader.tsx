import { useState } from "react";
import { Bell, Settings, User } from "lucide-react";
import { useApp } from "@/context/AppContext";
import NotificationsView from "./NotificationsView";
import SettingsView from "./SettingsView";
import ProfileView from "./ProfileView";

const DashboardHeader = () => {
  const { trackingId, hasUnreadNotifications, t } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md overflow-hidden border border-border">
                <img src="/india-post.png" alt="India Post Logo" className="w-12 h-12 object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground tracking-tight">{t("india_post")}</h1>
                <p className="text-xs text-muted-foreground">{t("smart_parcel_tracking")}</p>
              </div>
            </div>
            
            {trackingId && (
              <div className="hidden md:flex items-center gap-2 bg-secondary px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">{t("tracking")}:</span>
                <span className="text-sm font-semibold text-foreground">{trackingId}</span>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowNotifications(true)}
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent flex items-center justify-center transition-colors relative"
              >
                <Bell className="w-5 h-5 text-muted-foreground" />
                {hasUnreadNotifications && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
                )}
              </button>
              <button 
                onClick={() => setShowSettings(true)}
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent flex items-center justify-center transition-colors"
              >
                <Settings className="w-5 h-5 text-muted-foreground" />
              </button>
              <button 
                onClick={() => setShowProfile(true)}
                className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center transition-colors"
              >
                <User className="w-5 h-5 text-primary-foreground" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {showNotifications && <NotificationsView onClose={() => setShowNotifications(false)} />}
      {showSettings && <SettingsView onClose={() => setShowSettings(false)} />}
      {showProfile && <ProfileView onClose={() => setShowProfile(false)} />}
    </>
  );
};

export default DashboardHeader;
