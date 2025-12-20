import { MapPin, Navigation, Truck, RefreshCw } from "lucide-react";
import { useApp } from "@/context/AppContext";
import OpenStreetMap from "@/components/map/OpenStreetMap";

const LiveLocationView = () => {
  const { trackingData, t } = useApp();

  // Default values when no tracking data
  const currentCity = trackingData?.currentLocation.city || "—";
  const currentState = trackingData?.currentLocation.state || "";
  const distanceRemaining = trackingData?.distanceRemaining || 0;
  const finalDeliveryDate = trackingData?.finalDeliveryDate || "—";
  
  // Calculate route progress from activities
  const routeProgress = trackingData?.route.map((loc, index) => {
    const statusOrder = ["collected", "in_transit", "out_for_delivery", "delivered"];
    const currentStatusIndex = statusOrder.indexOf(trackingData.status);
    
    // Determine if this route point is completed
    if (index === 0) return "completed";
    if (index === trackingData.route.length - 1) {
      return trackingData.status === "delivered" ? "completed" : "pending";
    }
    
    // Middle points
    const progressPercent = trackingData.progressPercent;
    const totalPoints = trackingData.route.length;
    const pointThreshold = (index / (totalPoints - 1)) * 100;
    
    if (progressPercent >= pointThreshold) return "completed";
    if (progressPercent >= pointThreshold - 20) return "in_progress";
    return "pending";
  }) || [];

  // Map props
  const mapCenter: [number, number] = trackingData?.currentLocation.coords || [78.9629, 20.5937];
  const markers = trackingData ? [
    { coords: trackingData.origin.coords, type: "origin" as const, label: trackingData.origin.city },
    { coords: trackingData.currentLocation.coords, type: "current" as const, label: trackingData.currentLocation.city },
    { coords: trackingData.destination.coords, type: "destination" as const, label: trackingData.destination.city },
  ] : [];
  const route = trackingData?.route.map(r => r.coords) || [];

  return (
    <div className="bg-card rounded-lg border border-border shadow-card overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Truck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{t("live_location")}</p>
            <p className="text-xs text-muted-foreground">
              {trackingData ? `Near ${currentCity}, ${currentState}` : t("enter_tracking_id")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{t("last_updated")}: Just now</span>
          <button className="w-8 h-8 rounded-lg bg-secondary hover:bg-accent flex items-center justify-center transition-colors">
            <RefreshCw className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Full-width Map */}
      <div className="relative h-[500px]">
        {trackingData ? (
          <OpenStreetMap
            center={mapCenter}
            zoom={6}
            markers={markers}
            route={route}
            className="h-[500px]"
          />
        ) : (
          <div className="h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-lg font-medium text-muted-foreground">{t("enter_tracking_id")}</p>
              <p className="text-sm text-muted-foreground mt-1">Search for a tracking ID to view live location</p>
            </div>
          </div>
        )}

        {/* Info Cards - Only show when tracking data exists */}
        {trackingData && (
          <>
            <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-4 shadow-elevated border border-border z-10">
              <div className="flex items-center gap-2 mb-2">
                <Navigation className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">{t("route_progress")}</span>
              </div>
              <div className="space-y-1 text-xs">
                {trackingData.route.map((loc, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      routeProgress[index] === "completed" ? "bg-success" :
                      routeProgress[index] === "in_progress" ? "bg-primary animate-pulse" :
                      "bg-inactive"
                    }`} />
                    <span className="text-muted-foreground">{loc.city}</span>
                    <span className={`ml-auto font-medium ${
                      routeProgress[index] === "completed" ? "text-success" :
                      routeProgress[index] === "in_progress" ? "text-primary" :
                      "text-muted-foreground"
                    }`}>
                      {routeProgress[index] === "completed" ? t("completed") :
                       routeProgress[index] === "in_progress" ? t("in_progress") :
                       t("pending")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Distance Info */}
            <div className="absolute bottom-4 right-4 bg-card/95 backdrop-blur-sm rounded-lg p-4 shadow-elevated border border-border z-10">
              <div className="text-xs text-muted-foreground mb-1">{t("distance_remaining")}</div>
              <div className="text-2xl font-bold text-foreground">{distanceRemaining} km</div>
              <div className="text-xs text-primary mt-1">Est. arrival: {finalDeliveryDate}</div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-elevated border border-border z-10">
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-8 h-1 bg-primary rounded" />
                  <span className="text-muted-foreground">{t("route")}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-muted-foreground">{t("origin")}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-red-600 rounded-full" />
                  <span className="text-muted-foreground">{t("current")}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LiveLocationView;
