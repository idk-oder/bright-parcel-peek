import { Check, Timer, Package, PackageCheck, CloudRain, Calendar, Plus, ArrowRight, Clock, Car } from "lucide-react";
import { useApp } from "@/context/AppContext";

interface TimelineItem {
  id: number;
  title: string;
  location: string;
  date: string;
  time: string;
  icon: React.ReactNode;
  status: "completed" | "active" | "pending";
}

const DeliveryProgressView = () => {
  const { trackingData, t } = useApp();

  // Generate timeline items from tracking data
  const getTimelineItems = (): TimelineItem[] => {
    if (!trackingData) return [];

    const activities = trackingData.activities;
    const items: TimelineItem[] = activities.map((activity, index) => {
      const isFirst = index === 0;
      const isLast = index === activities.length - 1;
      
      let status: "completed" | "active" | "pending" = "completed";
      if (isFirst) status = "active";
      
      return {
        id: activity.id,
        title: activity.title,
        location: activity.location,
        date: activity.date,
        time: activity.time,
        icon: isLast ? <Check className="w-5 h-5" /> : 
              isFirst ? <Timer className="w-5 h-5" /> : 
              <Check className="w-5 h-5" />,
        status,
      };
    });

    // Add pending delivery steps
    if (trackingData.status !== "delivered") {
      items.unshift({
        id: 0,
        title: t("out_for_delivery"),
        location: `${trackingData.destination.city} Delivery Office, ${trackingData.destination.state}`,
        date: trackingData.finalDeliveryDate,
        time: "Est. 09:00 AM",
        icon: <Package className="w-5 h-5" />,
        status: "pending",
      });
      
      items.unshift({
        id: -1,
        title: t("delivered"),
        location: `${trackingData.destination.city}, ${trackingData.destination.state}`,
        date: trackingData.finalDeliveryDate,
        time: "Est. by EOD",
        icon: <PackageCheck className="w-5 h-5" />,
        status: "pending",
      });
    }

    return items;
  };

  const timelineItems = getTimelineItems();
  const hasDelay = trackingData && trackingData.delayHours > 0;
  const isTrafficDelay = trackingData?.delayReason === "traffic";

  if (!trackingData) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 shadow-card">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Package className="w-16 h-16 text-muted-foreground mb-4" />
          <p className="text-lg font-medium text-muted-foreground">{t("enter_tracking_id")}</p>
          <p className="text-sm text-muted-foreground mt-1">Search for a tracking ID to view delivery progress</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Delivery Calculation Summary */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">{t("delivery_calculation")}</h3>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-4">
          {/* Original Delivery */}
          <div className="bg-secondary rounded-lg p-4 text-center min-w-[180px]">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{t("original_delivery")}</span>
            </div>
            <div className="text-xl font-bold text-foreground">{trackingData.originalDeliveryDate}</div>
          </div>
          
          {hasDelay ? (
            <>
              {/* Plus Sign */}
              <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                <Plus className="w-5 h-5 text-warning" />
              </div>
              
              {/* Delay */}
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-center min-w-[180px]">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {isTrafficDelay ? (
                    <Car className="w-4 h-4 text-destructive" />
                  ) : (
                    <CloudRain className="w-4 h-4 text-destructive" />
                  )}
                  <span className="text-xs text-destructive">
                    {isTrafficDelay ? t("delay_traffic") : t("delay_weather")}
                  </span>
                </div>
                <div className="text-xl font-bold text-destructive">{trackingData.delayHours} Hrs</div>
              </div>
              
              {/* Equals Sign */}
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </div>
              
              {/* Final Delivery */}
              <div className="bg-primary rounded-lg p-4 text-center min-w-[180px] shadow-elevated">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-primary-foreground" />
                  <span className="text-xs text-primary-foreground/80">{t("final_delivery")}</span>
                </div>
                <div className="text-xl font-bold text-primary-foreground">{trackingData.finalDeliveryDate}</div>
              </div>
            </>
          ) : (
            <>
              {/* Equals Sign */}
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-success" />
              </div>
              
              {/* On Time Delivery */}
              <div className="bg-success rounded-lg p-4 text-center min-w-[180px] shadow-elevated">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Check className="w-4 h-4 text-white" />
                  <span className="text-xs text-white/80">{t("on_time")}</span>
                </div>
                <div className="text-xl font-bold text-white">{trackingData.finalDeliveryDate}</div>
              </div>
            </>
          )}
        </div>
        
        {/* Delay Notice */}
        {hasDelay && (
          <div className="mt-4 bg-destructive/5 border border-destructive/10 rounded-lg p-3 flex items-center gap-3">
            {isTrafficDelay ? (
              <Car className="w-5 h-5 text-destructive flex-shrink-0" />
            ) : (
              <CloudRain className="w-5 h-5 text-destructive flex-shrink-0" />
            )}
            <p className="text-sm text-muted-foreground">
              {isTrafficDelay 
                ? `Heavy traffic congestion is affecting the ${trackingData.currentLocation.city}-${trackingData.destination.city} route. Delivery has been rescheduled.`
                : `Severe weather conditions are affecting the ${trackingData.currentLocation.city}-${trackingData.destination.city} route. Delivery has been rescheduled for safety.`
              }
            </p>
          </div>
        )}
      </div>

      {/* Detailed Timeline */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-6">{t("detailed_timeline")}</h3>
        
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
