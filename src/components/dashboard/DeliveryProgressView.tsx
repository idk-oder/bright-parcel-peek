import { Check, Timer, Package, PackageCheck, CloudRain, Calendar, Plus, ArrowRight, Clock } from "lucide-react";

interface TimelineItem {
  id: number;
  title: string;
  location: string;
  date: string;
  time: string;
  icon: React.ReactNode;
  status: "completed" | "active" | "pending";
}

const timelineItems: TimelineItem[] = [
  {
    id: 1,
    title: "Package Collected",
    location: "Hyderabad GPO, Telangana",
    date: "Dec 18, 2025",
    time: "09:32 AM",
    icon: <Check className="w-5 h-5" />,
    status: "completed",
  },
  {
    id: 2,
    title: "Departed Origin Facility",
    location: "Hyderabad Processing Center",
    date: "Dec 18, 2025",
    time: "02:45 PM",
    icon: <Check className="w-5 h-5" />,
    status: "completed",
  },
  {
    id: 3,
    title: "In Transit",
    location: "Hyderabad → Vijayawada Route",
    date: "Dec 19, 2025",
    time: "08:00 AM",
    icon: <Check className="w-5 h-5" />,
    status: "completed",
  },
  {
    id: 4,
    title: "Arrived at Vijayawada Hub",
    location: "Vijayawada Processing Center, AP",
    date: "Dec 19, 2025",
    time: "02:15 PM",
    icon: <Timer className="w-5 h-5" />,
    status: "active",
  },
  {
    id: 5,
    title: "Out for Delivery",
    location: "Guntur Delivery Office, AP",
    date: "Dec 22, 2025",
    time: "Est. 09:00 AM",
    icon: <Package className="w-5 h-5" />,
    status: "pending",
  },
  {
    id: 6,
    title: "Delivered",
    location: "Guntur, Andhra Pradesh",
    date: "Dec 22, 2025",
    time: "Est. by EOD",
    icon: <PackageCheck className="w-5 h-5" />,
    status: "pending",
  },
];

const DeliveryProgressView = () => {
  return (
    <div className="space-y-6">
      {/* Delivery Calculation Summary */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Delivery Calculation</h3>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-4">
          {/* Original Delivery */}
          <div className="bg-secondary rounded-lg p-4 text-center min-w-[180px]">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Original Delivery</span>
            </div>
            <div className="text-xl font-bold text-foreground">21 Dec 2025</div>
          </div>
          
          {/* Plus Sign */}
          <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
            <Plus className="w-5 h-5 text-warning" />
          </div>
          
          {/* Weather Delay */}
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-center min-w-[180px]">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CloudRain className="w-4 h-4 text-destructive" />
              <span className="text-xs text-destructive">Delay due to Weather</span>
            </div>
            <div className="text-xl font-bold text-destructive">24 Hrs</div>
          </div>
          
          {/* Equals Sign */}
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
          </div>
          
          {/* Final Delivery */}
          <div className="bg-primary rounded-lg p-4 text-center min-w-[180px] shadow-elevated">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-primary-foreground" />
              <span className="text-xs text-primary-foreground/80">Final Delivery</span>
            </div>
            <div className="text-xl font-bold text-primary-foreground">22 Dec 2025</div>
          </div>
        </div>
        
        {/* Weather Notice */}
        <div className="mt-4 bg-destructive/5 border border-destructive/10 rounded-lg p-3 flex items-center gap-3">
          <CloudRain className="w-5 h-5 text-destructive flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            Heavy thunderstorms are affecting the Vijayawada-Guntur route. Delivery has been rescheduled for safety.
          </p>
        </div>
      </div>

      {/* Detailed Timeline */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-6">Detailed Tracking Timeline</h3>
        
        <div className="space-y-0">
          {timelineItems.map((item, index) => (
            <div key={item.id} className="relative animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
              {/* Timeline Line */}
              {index !== timelineItems.length - 1 && (
                <div className={`absolute left-6 top-14 w-0.5 h-[calc(100%-0.5rem)] ${
                  item.status === "completed" ? "bg-primary" : "bg-border"
                }`} />
              )}
              
              <div className="flex items-start gap-4 py-4">
                {/* Icon */}
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 relative z-10
                  ${item.status === "completed" 
                    ? "bg-primary text-primary-foreground" 
                    : item.status === "active"
                      ? "bg-tracking-red-light border-2 border-primary text-primary"
                      : "bg-secondary text-inactive border border-border"
                  }
                `}>
                  {item.status === "active" && (
                    <div className="absolute w-12 h-12 rounded-full bg-primary/20 animate-pulse-ring" />
                  )}
                  {item.icon}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <p className={`text-sm font-semibold ${
                        item.status === "pending" ? "text-muted-foreground" : "text-foreground"
                      }`}>
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.location}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-xs ${
                        item.status === "active" 
                          ? "bg-primary/10 text-primary px-2 py-0.5 rounded font-medium" 
                          : item.status === "pending"
                            ? "text-inactive"
                            : "text-muted-foreground"
                      }`}>
                        {item.date}
                      </span>
                      <span className={`text-xs ${
                        item.status === "pending" ? "text-inactive" : "text-muted-foreground"
                      }`}>
                        {item.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryProgressView;
