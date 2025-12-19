import { MapPin, Navigation, Truck, RefreshCw } from "lucide-react";

const LiveLocationView = () => {
  return (
    <div className="bg-card rounded-lg border border-border shadow-card overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Truck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Live Vehicle Location</p>
            <p className="text-xs text-muted-foreground">Near Vijayawada, Andhra Pradesh</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Updated: Just now</span>
          <button className="w-8 h-8 rounded-lg bg-secondary hover:bg-accent flex items-center justify-center transition-colors">
            <RefreshCw className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Full-width Map */}
      <div className="relative h-[500px] bg-gradient-to-br from-secondary to-muted">
        {/* Map Grid Pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />

        {/* Road/Region Shapes */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
          {/* Region Outlines */}
          <ellipse cx="150" cy="200" rx="100" ry="80" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1" />
          <ellipse cx="450" cy="280" rx="120" ry="90" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1" />
          <ellipse cx="700" cy="350" rx="90" ry="70" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1" />
          
          {/* Route Path - Full */}
          <path
            d="M 150 200 Q 250 180, 350 220 Q 450 260, 550 290 Q 650 320, 700 350"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="12 6"
            className="opacity-40"
          />
          
          {/* Completed Route */}
          <path
            d="M 150 200 Q 250 180, 350 220 Q 400 240, 450 260"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="4"
            strokeLinecap="round"
          />
          
          {/* Origin Marker - Hyderabad */}
          <circle cx="150" cy="200" r="12" fill="hsl(var(--success))" />
          <circle cx="150" cy="200" r="20" fill="hsl(var(--success))" fillOpacity="0.2" />
          <text x="150" y="170" textAnchor="middle" className="fill-foreground text-xs font-semibold">Hyderabad</text>
          
          {/* Vijayawada Label */}
          <text x="450" y="320" textAnchor="middle" className="fill-muted-foreground text-xs">Vijayawada</text>
          
          {/* Destination Marker - Guntur */}
          <circle cx="700" cy="350" r="12" fill="hsl(var(--primary))" />
          <circle cx="700" cy="350" r="20" fill="hsl(var(--primary))" fillOpacity="0.2" />
          <text x="700" y="320" textAnchor="middle" className="fill-foreground text-xs font-semibold">Guntur</text>
        </svg>

        {/* Current Location Pin - Near Vijayawada */}
        <div className="absolute" style={{ left: '56%', top: '52%', transform: 'translate(-50%, -100%)' }}>
          <div className="relative">
            <div className="absolute -inset-3 bg-primary/20 rounded-full animate-ping" />
            <div className="absolute -inset-6 bg-primary/10 rounded-full animate-pulse" />
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-elevated">
              <MapPin className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-10 border-l-transparent border-r-transparent border-t-primary" />
          </div>
        </div>

        {/* Info Cards */}
        <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-4 shadow-elevated border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Navigation className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Route Progress</span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span className="text-muted-foreground">Hyderabad</span>
              <span className="text-success font-medium ml-auto">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-muted-foreground">Vijayawada</span>
              <span className="text-primary font-medium ml-auto">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-inactive" />
              <span className="text-muted-foreground">Guntur</span>
              <span className="text-muted-foreground ml-auto">Pending</span>
            </div>
          </div>
        </div>

        {/* Distance Info */}
        <div className="absolute bottom-4 right-4 bg-card/95 backdrop-blur-sm rounded-lg p-4 shadow-elevated border border-border">
          <div className="text-xs text-muted-foreground mb-1">Distance Remaining</div>
          <div className="text-2xl font-bold text-foreground">72 km</div>
          <div className="text-xs text-primary mt-1">Est. arrival: 22 Dec 2025</div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-elevated border border-border">
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-8 h-1 bg-primary rounded" />
              <span className="text-muted-foreground">Completed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-8 h-1 bg-primary/40 rounded" style={{ backgroundImage: 'repeating-linear-gradient(90deg, hsl(var(--primary)) 0 6px, transparent 6px 12px)' }} />
              <span className="text-muted-foreground">Remaining</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveLocationView;
