import { useApp } from "@/context/AppContext";
import { AlertTriangle, CloudRain, Truck, Clock, TrendingUp, Gauge } from "lucide-react";

const AIPredictionView = () => {
  const { trackingData, t } = useApp();

  if (!trackingData) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 shadow-card text-center">
        <Gauge className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
        <p className="text-muted-foreground">{t("no_data")}</p>
        <p className="text-sm text-muted-foreground/60 mt-1">{t("enter_valid_id")}</p>
      </div>
    );
  }

  const delayPercent = trackingData.delayHours > 0 
    ? Math.min((trackingData.delayHours / 72) * 100, 100) 
    : 0;
  
  const riskLevel = delayPercent > 50 ? "high" : delayPercent > 25 ? "medium" : "low";
  const riskColor = riskLevel === "high" ? "destructive" : riskLevel === "medium" ? "warning" : "success";

  // Calculate gauge rotation (0 to 180 degrees)
  const gaugeRotation = (delayPercent / 100) * 180;

  return (
    <div className="space-y-6">
      {/* Circular Delay Meter */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">{t("delay_meter")}</h3>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{t("ai_powered")}</span>
          </div>
        </div>

        {/* Gauge */}
        <div className="flex flex-col items-center py-8">
          <div className="relative w-64 h-32 mb-6">
            {/* Background Arc */}
            <svg className="w-full h-full" viewBox="0 0 200 100">
              {/* Track */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="12"
                strokeLinecap="round"
              />
              {/* Progress Arc */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke={`hsl(var(--${riskColor}))`}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${(gaugeRotation / 180) * 251.2} 251.2`}
                className="transition-all duration-1000"
              />
              {/* Center Labels */}
              <text x="30" y="95" className="text-[10px] fill-muted-foreground">{t("low_risk")}</text>
              <text x="145" y="95" className="text-[10px] fill-muted-foreground">{t("high_risk")}</text>
            </svg>
            
            {/* Needle */}
            <div 
              className="absolute bottom-0 left-1/2 w-1 h-20 origin-bottom transition-transform duration-1000"
              style={{ 
                transform: `translateX(-50%) rotate(${gaugeRotation - 90}deg)`,
                background: `linear-gradient(to top, hsl(var(--foreground)), transparent)`
              }}
            />
            
            {/* Center Dot */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 rounded-full bg-foreground shadow-lg" />
          </div>

          {/* Delay Value */}
          <div className={`text-4xl font-bold text-${riskColor}`}>
            {trackingData.delayHours > 0 ? `+${trackingData.delayHours}h` : "On Time"}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {trackingData.delayReason === "traffic" ? t("traffic_delay_expected") : 
             trackingData.delayHours > 0 ? t("weather_delay_expected") : "No delays expected"}
          </p>
        </div>

        {/* Risk Indicator */}
        <div className="flex justify-center gap-4 mt-4">
          <div className={`px-4 py-2 rounded-full text-sm font-medium ${
            riskLevel === "low" ? "bg-success/10 text-success" : "bg-secondary text-muted-foreground"
          }`}>
            {t("low_risk")}
          </div>
          <div className={`px-4 py-2 rounded-full text-sm font-medium ${
            riskLevel === "medium" ? "bg-warning/10 text-warning" : "bg-secondary text-muted-foreground"
          }`}>
            {t("medium_risk")}
          </div>
          <div className={`px-4 py-2 rounded-full text-sm font-medium ${
            riskLevel === "high" ? "bg-destructive/10 text-destructive" : "bg-secondary text-muted-foreground"
          }`}>
            {t("high_risk")}
          </div>
        </div>
      </div>

      {/* Delay Alert (if delayed) */}
      {trackingData.delayHours > 0 && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
              {trackingData.delayReason === "traffic" ? (
                <Truck className="w-5 h-5 text-destructive" />
              ) : (
                <CloudRain className="w-5 h-5 text-destructive" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <span className="text-sm font-semibold text-destructive">
                  {trackingData.delayReason === "traffic" ? t("traffic_delay_expected") : t("weather_delay_expected")}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {trackingData.delayReason === "traffic" ? t("heavy_traffic") : t("heavy_thunderstorms")}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Delivery Dates */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Delivery Estimate</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{t("original_eta")}</span>
            </div>
            <span className={`text-sm font-medium ${
              trackingData.delayHours > 0 ? "text-foreground/60 line-through" : "text-foreground"
            }`}>
              {trackingData.originalDeliveryDate}
            </span>
          </div>
          
          {trackingData.delayHours > 0 && (
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                <span className="text-sm text-destructive">
                  {trackingData.delayReason === "traffic" ? t("delay_due_to_traffic") : t("delay_due_to_weather")}
                </span>
              </div>
              <span className="text-sm font-semibold text-destructive">+{trackingData.delayHours} hrs</span>
            </div>
          )}
          
          <div className="flex items-center justify-between py-3 bg-primary/5 -mx-6 px-6 rounded-lg">
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">{t("final_delivery")}</span>
            </div>
            <span className="text-lg font-bold text-primary">{trackingData.finalDeliveryDate}</span>
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
      </div>
    </div>
  );
};

export default AIPredictionView;
