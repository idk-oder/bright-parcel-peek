import { MapPin, Navigation, Truck } from "lucide-react";
import { useApp } from "@/context/AppContext";
import OpenStreetMap from "@/components/map/OpenStreetMap";

const CurrentLocation = () => {
  const { trackingData, t } = useApp();

  // Default values when no tracking data
  const currentCity = trackingData?.currentLocation.city || "—";
  const currentState = trackingData?.currentLocation.state || "";
  const origin = trackingData?.origin.city || "Origin";
  const destination = trackingData?.destination.city || "Destination";
  
  // Map props
  const mapCenter: [number, number] = trackingData?.currentLocation.coords || [78.9629, 20.5937];
  const markers = trackingData ? [
    { coords: trackingData.origin.coords, type: "origin" as const, label: trackingData.origin.city },
    { coords: trackingData.currentLocation.coords, type: "current" as const, label: trackingData.currentLocation.city },
    { coords: trackingData.destination.coords, type: "destination" as const, label: trackingData.destination.city },
  ] : [];
  const route = trackingData?.route.map(r => r.coords) || [];

  return (
    <div className="bg-card rounded-lg border border-border shadow-card h-full overflow-hidden">
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">{t("current_location")}</h3>
          <button className="flex items-center gap-1.5 text-xs text-primary bg-tracking-red-light px-2.5 py-1.5 rounded-full hover:bg-primary/20 transition-colors">
            <Navigation className="w-3.5 h-3.5" />
            <span>{t("track_live")}</span>
          </button>
        </div>
        
        {/* Location Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Truck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {trackingData ? `Near ${currentCity}, ${currentState}` : t("enter_tracking_id")}
            </p>
            <p className="text-xs text-muted-foreground">
              {trackingData ? t("last_updated") + ": 2 minutes ago" : "—"}
            </p>
          </div>
        </div>
      </div>
      
      {/* Real Map */}
      <div className="relative h-48">
        {trackingData ? (
          <OpenStreetMap
            center={mapCenter}
            zoom={7}
            markers={markers}
            route={route}
            className="h-48"
            compact
          />
        ) : (
          <div className="h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">{t("enter_tracking_id")}</p>
            </div>
          </div>
        )}
        
        {/* Map Labels */}
        {trackingData && (
          <div className="absolute bottom-3 left-3 bg-card/90 backdrop-blur-sm px-2 py-1 rounded text-xs text-muted-foreground z-10">
            {origin} → {currentCity} → {destination}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentLocation;
