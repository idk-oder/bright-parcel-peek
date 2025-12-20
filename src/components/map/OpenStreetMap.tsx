import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface MapProps {
  center?: [number, number]; // [lng, lat]
  zoom?: number;
  markers?: Array<{
    coords: [number, number];
    type: "origin" | "current" | "destination";
    label?: string;
  }>;
  route?: Array<[number, number]>;
  className?: string;
  compact?: boolean;
}

const OpenStreetMap = ({ 
  center = [78.9629, 20.5937], // Default: India center
  zoom = 5,
  markers = [],
  route = [],
  className = "",
  compact = false
}: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map with OpenStreetMap tiles (no API key required)
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: [
              "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
            ],
            tileSize: 256,
            attribution: "© OpenStreetMap contributors",
          },
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm",
          },
        ],
      },
      center: center,
      zoom: zoom,
      attributionControl: false,
    });

    // Add navigation controls
    if (!compact) {
      map.current.addControl(new maplibregl.NavigationControl(), "top-right");
    }

    map.current.on("load", () => {
      setIsLoaded(true);

      // Add route line if provided
      if (route.length > 1 && map.current) {
        map.current.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: route,
            },
          },
        });

        map.current.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#dc2626",
            "line-width": 4,
            "line-opacity": 0.8,
          },
        });
      }

      // Add markers
      markers.forEach((marker) => {
        if (!map.current) return;

        const el = document.createElement("div");
        el.className = "custom-marker";
        
        if (marker.type === "current") {
          el.innerHTML = `
            <div class="relative">
              <div class="absolute -inset-2 bg-red-500/30 rounded-full animate-ping"></div>
              <div class="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
            </div>
          `;
        } else if (marker.type === "origin") {
          el.innerHTML = `
            <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          `;
        } else {
          el.innerHTML = `
            <div class="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
            </div>
          `;
        }

        new maplibregl.Marker({ element: el })
          .setLngLat(marker.coords)
          .addTo(map.current!);
      });
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Update map when center changes
  useEffect(() => {
    if (map.current && isLoaded) {
      map.current.flyTo({ center, zoom, duration: 1500 });
    }
  }, [center, zoom, isLoaded]);

  return (
    <div className={`relative ${className}`}>
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      {!isLoaded && (
        <div className="absolute inset-0 bg-secondary flex items-center justify-center rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
};

export default OpenStreetMap;
