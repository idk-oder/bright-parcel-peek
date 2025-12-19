import { Package, Truck, Building2, Scan, CheckCircle2 } from "lucide-react";

interface ActivityItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  location: string;
  timestamp: string;
  isLatest?: boolean;
}

const activities: ActivityItem[] = [
  {
    id: 1,
    icon: <Truck className="w-4 h-4" />,
    title: "Package departed sorting facility",
    location: "Vijayawada Processing Center, AP",
    timestamp: "1 hour ago",
    isLatest: true,
  },
  {
    id: 2,
    icon: <Scan className="w-4 h-4" />,
    title: "Package scanned at facility",
    location: "Vijayawada Processing Center, AP",
    timestamp: "3 hours ago",
  },
  {
    id: 3,
    icon: <Building2 className="w-4 h-4" />,
    title: "Arrived at regional hub",
    location: "Vijayawada Hub, Andhra Pradesh",
    timestamp: "8 hours ago",
  },
  {
    id: 4,
    icon: <Truck className="w-4 h-4" />,
    title: "In transit to next facility",
    location: "En route from Hyderabad, Telangana",
    timestamp: "Yesterday, 4:32 PM",
  },
  {
    id: 5,
    icon: <CheckCircle2 className="w-4 h-4" />,
    title: "Package collected from sender",
    location: "Hyderabad GPO, Telangana",
    timestamp: "Dec 18, 2025 • 09:32 AM",
  },
];

const RecentActivity = () => {
  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
          {activities.length} updates
        </span>
      </div>
      
      <div className="space-y-1">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="flex items-start gap-4 py-4 relative animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Timeline */}
            {index !== activities.length - 1 && (
              <div className="absolute left-5 top-14 w-0.5 h-[calc(100%-1.5rem)] bg-border" />
            )}
            
            {/* Icon */}
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 relative z-10
              ${activity.isLatest 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "bg-secondary text-muted-foreground"
              }
            `}>
              {activity.isLatest && (
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
              )}
              {activity.icon}
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className={`text-sm ${activity.isLatest ? "font-semibold text-foreground" : "font-medium text-foreground/90"}`}>
                    {activity.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{activity.location}</p>
                </div>
                <span className={`
                  text-xs flex-shrink-0 px-2 py-0.5 rounded
                  ${activity.isLatest 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-muted-foreground"
                  }
                `}>
                  {activity.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
