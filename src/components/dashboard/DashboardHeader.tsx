import { Bell, Settings, Package, User } from "lucide-react";

const DashboardHeader = () => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md">
              <Package className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground tracking-tight">ParcelTrack</h1>
              <p className="text-xs text-muted-foreground">Smart Delivery Intelligence</p>
            </div>
          </div>
          
          {/* Tracking Badge */}
          <div className="hidden md:flex items-center gap-2 bg-secondary px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Tracking:</span>
            <span className="text-sm font-semibold text-foreground">PKG-2024-789456123</span>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent flex items-center justify-center transition-colors relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
            </button>
            <button className="w-10 h-10 rounded-lg bg-secondary hover:bg-accent flex items-center justify-center transition-colors">
              <Settings className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center transition-colors">
              <User className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
