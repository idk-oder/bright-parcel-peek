import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

type ParcelMapProps = {
  from: [number, number]; // [lng, lat]
  to: [number, number];
};

const ParcelMap = ({ from, to }: ParcelMapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapRef.current,
      style: {
        version: 8,
        sources: {
          satellite: {
            type: "raster",
            tiles: [
              "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            ],
            tileSize: 256
          }
        },
        layers: [
          {
            id: "satellite",
            type: "raster",
            source: "satellite"
          }
        ]
      },
      center: from,
      zoom: 3
    });

    // markers
    new maplibregl.Marker({ color: "green" }).setLngLat(from).addTo(map);
    new maplibregl.Marker({ color: "red" }).setLngLat(to).addTo(map);

    // route line
    map.on("load", () => {
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [from, to]
          }
        }
      });

      map.addLayer({
        id: "route-line",
        type: "line",
        source: "route",
        paint: {
          "line-color": "#ef4444",
          "line-width": 4
        }
      });
    });

    return () => map.remove();
  }, [from, to]);

  return (
    <div
      ref={mapRef}
      className="w-full h-[400px] rounded-xl overflow-hidden"
    />
  );
};

export default ParcelMap;
