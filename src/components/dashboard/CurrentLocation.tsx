import { MapPin, Navigation, Truck } from "lucide-react";

const CurrentLocation = () => {
  return (
    <div className="bg-card rounded-lg border border-border shadow-card h-full overflow-hidden">
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Current Location</h3>
          <button className="flex items-center gap-1.5 text-xs text-primary bg-tracking-blue-light px-2.5 py-1.5 rounded-full hover:bg-primary/20 transition-colors">
            <Navigation className="w-3.5 h-3.5" />
            <span>Track Live</span>
          </button>
        </div>
        
        {/* Location Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Truck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Distribution Center, Chicago</p>
            <p className="text-xs text-muted-foreground">Last updated: 2 minutes ago</p>
          </div>
        </div>
      </div>
      
      {/* Mock Map */}
      <div className="relative h-48 bg-gradient-to-br from-secondary to-muted">
        {/* Map Grid Pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
        
        {/* Mock Route */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet">
          {/* Route Path */}
          <path
            d="M 50 150 Q 100 100, 150 120 T 250 80 T 350 60"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="8 4"
            className="opacity-60"
          />
          {/* Completed Route */}
          <path
            d="M 50 150 Q 100 100, 150 120 T 200 100"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            strokeLinecap="round"
          />
          
          {/* Origin Marker */}
          <circle cx="50" cy="150" r="6" fill="hsl(var(--success))" />
          <circle cx="50" cy="150" r="10" fill="hsl(var(--success))" fillOpacity="0.3" />
          
          {/* Destination Marker */}
          <circle cx="350" cy="60" r="6" fill="hsl(var(--destructive))" />
          <circle cx="350" cy="60" r="10" fill="hsl(var(--destructive))" fillOpacity="0.3" />
        </svg>
        
        {/* Current Location Pin */}
        <div className="absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -100%)' }}>
          <div className="relative">
            <div className="absolute -inset-2 bg-primary/20 rounded-full animate-ping" />
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <MapPin className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-primary" />
          </div>
        </div>
        
        {/* Map Labels */}
        <div className="absolute bottom-3 left-3 bg-card/90 backdrop-blur-sm px-2 py-1 rounded text-xs text-muted-foreground">
          New York → Chicago → Denver
        </div>
      </div>
    </div>
  );
};

export default CurrentLocation;
