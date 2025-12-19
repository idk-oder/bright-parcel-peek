import { useEffect, useState } from "react";
import { getWeatherByCoords } from "@/services/weatherService";
import { AlertTriangle, CloudSnow, Clock, TrendingUp } from "lucide-react";

const DeliveryPrediction = () => {
  const [weather, setWeather] = useState<any>(null);
      useEffect(() => {
      getWeatherByCoords(16.5062, 80.6480) // Vijayawada
        .then(setWeather)
       .catch(console.error);
   }, []);


  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Delivery Prediction</h3>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>AI Powered</span>
        </div>
      </div>
      
      {/* Alert Banner */}
      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-5 animate-fade-in">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
            <CloudSnow className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <span className="text-sm font-semibold text-destructive">Weather-Based Delay Expected</span>
            </div>
              {weather && (
    <div className="p-4 rounded-lg bg-red-50 border border-red-200">
      <p className="font-semibold text-red-600">
        Weather Alert: {weather.condition}
      </p>
      <p className="text-sm text-muted-foreground">
        {weather.description} · {weather.temperature}°C
      </p>
    </div>
     )}

          </div>
        </div>
      </div>
      
      {/* Prediction Details */}
      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b border-border">
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Original ETA</span>
          </div>
          <span className="text-sm font-medium text-foreground line-through opacity-60">Dec 21, 2025</span>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-border">
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Updated ETA</span>
          </div>
          <span className="text-sm font-semibold text-primary">Dec 22, 2025</span>
        </div>
        
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Confidence</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
              <div className="w-[85%] h-full bg-primary rounded-full" />
            </div>
            <span className="text-sm font-medium text-foreground">85%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPrediction;
