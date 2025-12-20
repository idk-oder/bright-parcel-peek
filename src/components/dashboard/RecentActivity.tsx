import { Package, Truck, Building2, Scan, CheckCircle2 } from "lucide-react";
import { useApp } from "@/context/AppContext";

const iconMap: Record<number, React.ReactNode> = {
  1: <Truck className="w-4 h-4" />,
  2: <Scan className="w-4 h-4" />,
  3: <Building2 className="w-4 h-4" />,
  4: <Truck className="w-4 h-4" />,
  5: <CheckCircle2 className="w-4 h-4" />,
};

const RecentActivity = () => {
  const { trackingData, t } = useApp();

  const activities = trackingData?.activities || [];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{t("recent_activity")}</h3>
        <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
          {activities.length} {t("updates")}
        </span>
      </div>
      
      {activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Package className="w-12 h-12 text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">{t("enter_tracking_id")}</p>
        </div>
      ) : (
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
                ${index === 0 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "bg-secondary text-muted-foreground"
                }
              `}>
                {index === 0 && (
                  <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                )}
                {iconMap[activity.id] || <Package className="w-4 h-4" />}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className={`text-sm ${index === 0 ? "font-semibold text-foreground" : "font-medium text-foreground/90"}`}>
                      {activity.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{activity.location}</p>
                  </div>
                  <span className={`
                    text-xs flex-shrink-0 px-2 py-0.5 rounded
                    ${index === 0 
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
      )}
    </div>
  );
};

export default RecentActivity;
