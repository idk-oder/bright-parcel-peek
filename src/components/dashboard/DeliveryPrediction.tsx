import { useEffect, useState } from "react";
import { getWeatherByCoords } from "@/services/weatherService";
import { AlertTriangle, CloudSnow, Clock, TrendingUp, CheckCircle, Car } from "lucide-react";
import { useApp } from "@/context/AppContext";

const DeliveryPrediction = () => {
  const { trackingData, t } = useApp();
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    if (trackingData?.currentLocation.coords) {
      const [lng, lat] = trackingData.currentLocation.coords;
      getWeatherByCoords(lat, lng)
        .then(setWeather)
        .catch(console.error);
    }
  }, [trackingData]);

  const hasDelay = trackingData && trackingData.delayHours > 0;
  const isTrafficDelay = trackingData?.delayReason === "traffic";

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{t("delivery_prediction")}</h3>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{t("ai_powered")}</span>
        </div>
      </div>
      
      {!trackingData ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Clock className="w-12 h-12 text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">{t("enter_tracking_id")}</p>
        </div>
      ) : hasDelay ? (
        <>
          {/* Alert Banner */}
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-5 animate-fade-in">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                {isTrafficDelay ? (
                  <Car className="w-5 h-5 text-destructive" />
                ) : (
                  <CloudSnow className="w-5 h-5 text-destructive" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  <span className="text-sm font-semibold text-destructive">
                    {isTrafficDelay ? t("traffic_delay_expected") : t("weather_delay_expected")}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {isTrafficDelay 
                    ? `Heavy traffic congestion affecting route. Expected delay: ${trackingData.delayHours} hours.`
                    : `Severe weather conditions affecting route. Expected delay: ${trackingData.delayHours} hours.`
                  }
                </p>
                {weather && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Current: {weather.condition} · {weather.temperature}°C
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* Prediction Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{t("original_eta")}</span>
              </div>
              <span className="text-sm font-medium text-foreground line-through opacity-60">
                {trackingData.originalDeliveryDate}
              </span>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">{t("updated_eta")}</span>
              </div>
              <span className="text-sm font-semibold text-primary">{trackingData.finalDeliveryDate}</span>
            </div>
            
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{t("confidence")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500" 
                    style={{ width: `${trackingData.confidence}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-foreground">{trackingData.confidence}%</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* No Delay Banner */}
          <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-5 animate-fade-in">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-success">{t("on_time")}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your package is on schedule with no expected delays.
                </p>
              </div>
            </div>
          </div>
          
          {/* Prediction Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-success" />
                <span className="text-sm text-muted-foreground">{t("expected_delivery")}</span>
              </div>
              <span className="text-sm font-semibold text-success">{trackingData.finalDeliveryDate}</span>
            </div>
            
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{t("confidence")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-success rounded-full transition-all duration-500" 
                    style={{ width: `${trackingData.confidence}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-foreground">{trackingData.confidence}%</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DeliveryPrediction;
