import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import PageHeader from "../../components/layout/PageHeader";
import ChartCard from "../../components/charts/ChartCard";
import StatusBadge from "../../components/common/Badge";
import { waypoints, routeCoordinates, waypointIndexes } from "../../data/roadCaptainData";
import { 
  Navigation, 
  Clock, 
  MapPin, 
  CloudSun, 
  ChevronRight, 
  Fuel,
  Plus,
  Minus,
  Maximize2,
  Minimize2,
  Compass
} from "lucide-react";
import { cn } from "../../utils/utils";

// Custom markers using L.divIcon to avoid asset resolution issues in Vite
const createStartIcon = () => L.divIcon({
  html: `<div class="relative flex items-center justify-center w-8 h-8">
           <div class="absolute w-6 h-6 rounded-full bg-blue-500/30"></div>
           <div class="w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white shadow-md"></div>
         </div>`,
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -10]
});

const createWaypointIcon = () => L.divIcon({
  html: `<div class="relative flex items-center justify-center w-8 h-8">
           <div class="absolute w-5 h-5 rounded-full bg-amber-500/20"></div>
           <div class="w-3 h-3 rounded-full bg-amber-500 border-2 border-white shadow-md"></div>
         </div>`,
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -10]
});

const createDestinationIcon = () => L.divIcon({
  html: `<div class="relative flex items-center justify-center w-8 h-8">
           <div class="absolute w-8 h-8 rounded-full bg-emerald-500/20 animate-ping"></div>
           <div class="w-4 h-4 rounded-full bg-emerald-600 border-2 border-white shadow-md"></div>
         </div>`,
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -10]
});

const createLiveIcon = () => L.divIcon({
  html: `<div class="relative flex items-center justify-center w-12 h-12">
           <div class="absolute w-10 h-10 rounded-full bg-emerald-500/20 animate-ping" style="animation-duration: 2s;"></div>
           <div class="absolute w-8 h-8 rounded-full bg-emerald-500/40"></div>
           <div class="relative w-6 h-6 rounded-full bg-emerald-600 border border-white shadow-lg flex items-center justify-center text-white">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3 transform -rotate-45"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
           </div>
         </div>`,
  className: '',
  iconSize: [48, 48],
  iconAnchor: [24, 24],
  popupAnchor: [0, -15]
});

export default function TodaysRoute() {
<<<<<<< HEAD
  const routeStops = [];
=======
  const [currentPosIndex, setCurrentPosIndex] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(62);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCentered, setIsCentered] = useState(true);

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const polylineRef = useRef(null);

  const routeStops = [
    { name: "HP Petrol Station", dist: "38 km", type: "Fuel" },
    { name: "Food Plaza Lonavala", dist: "96 km", type: "Rest" },
    { name: "BPCL Station Pimpri", dist: "128 km", type: "Fuel" },
  ];
>>>>>>> 90419a56f07a1c3e5e8232fb608c5213f033379b

  // 1. Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Leaflet Map
    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: true
    });
    mapRef.current = map;

    // Add drag and zoom event listeners to break auto-centering on user interaction
    map.on("dragstart", () => setIsCentered(false));
    map.on("zoomstart", () => setIsCentered(false));

    // Add Tile Layer (CartoDB Positron - Premium Minimalist Light Style)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);

    // Add Route Polyline
    const polyline = L.polyline(routeCoordinates, {
      color: '#059669', // Road Captain Emerald Green
      weight: 4,
      opacity: 0.8,
      dashArray: '3, 6'
    }).addTo(map);
    polylineRef.current = polyline;

    // Fit Route Bounds
    map.fitBounds(polyline.getBounds(), { padding: [40, 40] });

    // Add Waypoint/Start/End Markers
    // Start (Mumbai Central)
    const startMarker = L.marker(routeCoordinates[0], { icon: createStartIcon() }).addTo(map);
    startMarker.bindPopup(`
      <div class="p-2 font-sans">
        <h4 class="font-bold text-sm text-neutral-textMain font-headings">Mumbai Central</h4>
        <p class="text-xs text-neutral-textMuted mt-0.5">Start Point</p>
        <p class="text-xs text-success font-semibold mt-1">Departed: 06:00 AM</p>
      </div>
    `);

    // Destination (Pune Hub)
    const destMarker = L.marker(routeCoordinates[routeCoordinates.length - 1], { icon: createDestinationIcon() }).addTo(map);
    destMarker.bindPopup(`
      <div class="p-2 font-sans">
        <h4 class="font-bold text-sm text-neutral-textMain font-headings">Pune Hub</h4>
        <p class="text-xs text-neutral-textMuted mt-0.5">Destination</p>
        <p class="text-xs text-primary font-semibold mt-1">ETA: 11:30 AM</p>
      </div>
    `);

    // Waypoints
    const waypointDetails = [
      { name: "Panvel Toll Plaza", dist: "35 km", eta: "06:45 AM" },
      { name: "Khalapur Toll Plaza", dist: "62 km", eta: "07:30 AM" },
      { name: "Lonavala Waypoint", dist: "96 km", eta: "08:30 AM" },
      { name: "Pimpri-Chinchwad Stop", dist: "125 km", eta: "09:45 AM" }
    ];

    [5, 7, 10, 15].forEach((idx, i) => {
      const details = waypointDetails[i];
      const wpMarker = L.marker(routeCoordinates[idx], { icon: createWaypointIcon() }).addTo(map);
      wpMarker.bindPopup(`
        <div class="p-2 font-sans">
          <h4 class="font-bold text-sm text-neutral-textMain font-headings">${details.name}</h4>
          <p class="text-xs text-neutral-textMuted mt-0.5">Distance: ${details.dist}</p>
          <p class="text-xs text-amber-600 font-semibold mt-1">ETA: ${details.eta}</p>
        </div>
      `);
    });

    // Add Live Driver Marker
    const driverMarker = L.marker(routeCoordinates[0], { icon: createLiveIcon() }).addTo(map);
    driverMarker.bindPopup(`
      <div class="p-2 font-sans min-w-[150px]">
        <h4 class="font-bold text-sm text-neutral-textMain font-headings">MH-12-RT-2244</h4>
        <p class="text-xs text-neutral-textMuted mt-0.5">Driver: Vikram Singh</p>
        <p class="text-xs text-emerald-600 font-semibold mt-1">Live Tracking Active</p>
      </div>
    `).openPopup();
    markerRef.current = driverMarker;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // 2. Simulate Driver Movement
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setCurrentPosIndex((prevIndex) => {
        if (prevIndex >= routeCoordinates.length - 1) {
          return 0; // Reset to start
        }
        return prevIndex + 1;
      });
    }, 4000); // 4 seconds per step for readable movement

    return () => clearInterval(moveInterval);
  }, []);

  // 3. Update Driver Marker Position on Index Change
  useEffect(() => {
    if (markerRef.current && routeCoordinates[currentPosIndex]) {
      const newPos = routeCoordinates[currentPosIndex];
      markerRef.current.setLatLng(newPos);

      // Find upcoming target
      const upcomingWaypoints = [
        { name: "Panvel Toll", idx: 5 },
        { name: "Khalapur", idx: 7 },
        { name: "Lonavala", idx: 10 },
        { name: "Pimpri-Chinchwad", idx: 15 },
        { name: "Pune", idx: 18 }
      ];

      let nextStop = upcomingWaypoints[upcomingWaypoints.length - 1];
      for (const wp of upcomingWaypoints) {
        if (currentPosIndex < wp.idx) {
          nextStop = wp;
          break;
        }
      }

      markerRef.current.setPopupContent(`
        <div class="p-2 font-sans min-w-[160px]">
          <h4 class="font-bold text-sm text-neutral-textMain font-headings">MH-12-RT-2244</h4>
          <p class="text-[11px] text-neutral-textMuted mt-0.5">Driver: Vikram Singh</p>
          <p class="text-[11px] text-primary font-semibold mt-1">Next Stop: ${nextStop.name}</p>
          <div class="flex items-center gap-1 mt-1.5 text-[11px] text-emerald-600 font-bold">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Speed: ${currentSpeed} km/h
          </div>
        </div>
      `);

      // Auto-center if active
      if (isCentered && mapRef.current) {
        mapRef.current.panTo(newPos);
      }
    }
  }, [currentPosIndex, isCentered, currentSpeed]);

  // 4. Simulate Speed Fluctuations
  useEffect(() => {
    const speedInterval = setInterval(() => {
      setCurrentSpeed((prev) => {
        const delta = Math.floor(Math.random() * 9) - 4; // -4 to +4
        const nextSpeed = prev + delta;
        return Math.max(55, Math.min(78, nextSpeed));
      });
    }, 2500);

    return () => clearInterval(speedInterval);
  }, []);

  // 5. Invalidate map size on fullscreen toggle
  useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current.invalidateSize();
        // re-fit bounds if we exit fullscreen to keep view tidy
        if (!isFullscreen && polylineRef.current) {
          mapRef.current.fitBounds(polylineRef.current.getBounds(), { padding: [40, 40] });
        }
      }, 300);
    }
  }, [isFullscreen]);

  // Custom Controls
  const zoomIn = () => {
    if (mapRef.current) mapRef.current.zoomIn();
  };

  const zoomOut = () => {
    if (mapRef.current) mapRef.current.zoomOut();
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const centerOnLocation = () => {
    setIsCentered(true);
    if (mapRef.current && routeCoordinates[currentPosIndex]) {
      mapRef.current.flyTo(routeCoordinates[currentPosIndex], 13);
    }
  };

  // Dynamic status of waypoints list based on animation index
  const dynamicWaypoints = waypoints.map((wp, i) => {
    const wpIndex = waypointIndexes[i];
    let status = wp.status;
    
    if (currentPosIndex > wpIndex) {
      status = i === 5 ? "Destination" : (i === 0 ? "Departed" : "Passed");
    } else if (currentPosIndex === wpIndex) {
      status = i === 5 ? "Destination" : "Active";
    } else {
      status = i === 5 ? "Destination" : "Upcoming";
    }
    
    return { ...wp, status };
  });

  // Calculate elapsed progress percentage
  const progressPercent = Math.min(100, Math.round((currentPosIndex / (routeCoordinates.length - 1)) * 100));
  const remainingDist = Math.max(0, 148 - Math.round((currentPosIndex / (routeCoordinates.length - 1)) * 148));

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <PageHeader title="Today's Route" subtitle="Mumbai → Pune — 148 km" />

      {/* Top Status Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Distance", value: "148 km", icon: MapPin, color: "primary" },
          { label: "Est. Time", value: "5h 30m", icon: Clock, color: "warning" },
          { label: "Traffic", value: <StatusBadge status="Moderate" variant="warning" />, icon: Navigation, color: "info" },
          { label: "Weather", value: <StatusBadge status="Clear" variant="success" />, icon: CloudSun, color: "success" },
        ].map((s, i) => (
          <motion.div 
            key={s.label} 
            initial={{ opacity: 0, y: 12 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: i * 0.03, duration: 0.35 }}
            className="bg-white border border-neutral-border rounded-xl p-4 shadow-soft-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[9px] font-semibold text-neutral-textMuted uppercase">{s.label}</p>
                <p className="text-sm font-bold font-headings text-neutral-textMain mt-1">{s.value}</p>
              </div>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                s.color === "primary" ? "bg-primary/10 text-primary" : s.color === "warning" ? "bg-warning-light text-warning" : s.color === "info" ? "bg-blue-50 text-blue-600" : "bg-success/10 text-success"
              }`}>
                <s.icon className="w-4 h-4" strokeWidth={1.8} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Route Overview / Interactive Map Card */}
        <ChartCard 
          title="Route Overview" 
          delay={0} 
          className="lg:col-span-2 flex flex-col"
        >
          {/* Mumbai -> Pune horizontal status bar */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-sm font-semibold text-neutral-textMain font-headings">Mumbai</span>
            </div>
            <div className="flex-1 h-1.5 bg-neutral-border/60 rounded-full relative overflow-hidden">
              <div 
                className="absolute h-full bg-gradient-to-r from-primary via-warning to-success transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-primary shadow-sm transition-all duration-500" 
                style={{ left: `calc(${progressPercent}% - 7px)` }}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-neutral-textMain font-headings">Pune</span>
              <div className="w-3 h-3 rounded-full bg-success" />
            </div>
          </div>

          {/* Quick Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="p-3 rounded-xl bg-slate-50/80 border border-neutral-border/40">
              <p className="text-[10px] text-neutral-textMuted uppercase font-semibold">Remaining</p>
              <p className="text-sm font-bold text-neutral-textMain mt-0.5">{remainingDist} km</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50/80 border border-neutral-border/40">
              <p className="text-[10px] text-neutral-textMuted uppercase font-semibold">ETA</p>
              <p className="text-sm font-bold text-neutral-textMain mt-0.5 font-headings">11:30 AM</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50/80 border border-neutral-border/40">
              <p className="text-[10px] text-neutral-textMuted uppercase font-semibold">Live Speed</p>
              <p className="text-sm font-bold text-amber-600 mt-0.5">{currentSpeed} km/h</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50/80 border border-neutral-border/40">
              <p className="text-[10px] text-neutral-textMuted uppercase font-semibold">Condition</p>
              <p className="text-sm font-bold text-success mt-0.5">Expressway Ok</p>
            </div>
          </div>

          {/* Map Container Element */}
          <div 
            className={cn(
              "transition-all duration-300 overflow-hidden bg-slate-50",
              isFullscreen 
                ? "fixed inset-0 z-[9999] h-screen w-screen bg-white" 
                : "relative h-[380px] w-full rounded-xl border border-neutral-border shadow-inner"
            )}
          >
            {/* The Actual Leaflet Map */}
            <div 
              ref={mapContainerRef} 
              className="h-full w-full"
            />

            {/* Premium Overlay 1: Live Telemetry HUD */}
            <div className="absolute top-4 left-4 z-[1000] bg-white/95 backdrop-blur-md border border-neutral-border/70 rounded-xl p-3.5 shadow-soft-md max-w-[210px] pointer-events-auto">
              <div className="flex items-center gap-1.5 mb-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-neutral-textMain uppercase tracking-wider font-headings">Telemetry</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-[10px] text-neutral-textMuted font-semibold">Speed</p>
                  <p className="text-sm font-extrabold text-neutral-textMain font-headings">{currentSpeed} <span className="text-[10px] font-medium">km/h</span></p>
                </div>
                <div className="flex items-baseline justify-between gap-4 pt-1.5 border-t border-neutral-border/40">
                  <p className="text-[10px] text-neutral-textMuted font-semibold">Progress</p>
                  <p className="text-xs font-bold text-neutral-textMain">{progressPercent}%</p>
                </div>
                <div className="flex items-baseline justify-between gap-4 pt-1.5 border-t border-neutral-border/40">
                  <p className="text-[10px] text-neutral-textMuted font-semibold">Remaining</p>
                  <p className="text-xs font-bold text-emerald-600">{remainingDist} km</p>
                </div>
              </div>
            </div>

            {/* Premium Overlay 2: Custom Floating Controls */}
            <div className="absolute bottom-4 right-4 z-[1000] flex flex-col gap-1.5 pointer-events-auto">
              <button 
                onClick={zoomIn} 
                title="Zoom In"
                className="w-9 h-9 rounded-lg bg-white border border-neutral-border/80 shadow-soft-md hover:bg-neutral-light flex items-center justify-center text-neutral-textMain transition-all active:scale-95 animate-fade-in"
              >
                <Plus className="w-4 h-4" strokeWidth={2.5} />
              </button>
              <button 
                onClick={zoomOut} 
                title="Zoom Out"
                className="w-9 h-9 rounded-lg bg-white border border-neutral-border/80 shadow-soft-md hover:bg-neutral-light flex items-center justify-center text-neutral-textMain transition-all active:scale-95 animate-fade-in"
              >
                <Minus className="w-4 h-4" strokeWidth={2.5} />
              </button>
              <button 
                onClick={toggleFullscreen} 
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Map"}
                className="w-9 h-9 rounded-lg bg-white border border-neutral-border/80 shadow-soft-md hover:bg-neutral-light flex items-center justify-center text-neutral-textMain transition-all active:scale-95 animate-fade-in"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button 
                onClick={centerOnLocation} 
                title="Center on Live Position"
                className={cn(
                  "w-9 h-9 rounded-lg border shadow-soft-md flex items-center justify-center transition-all active:scale-95 animate-fade-in",
                  isCentered 
                    ? "bg-emerald-50 border-emerald-200 text-emerald-600" 
                    : "bg-white border-neutral-border/80 text-neutral-textMain hover:bg-neutral-light"
                )}
              >
                <Compass className={cn("w-4 h-4", isCentered && "animate-spin")} style={{ animationDuration: "6s" }} />
              </button>
            </div>
          </div>
        </ChartCard>

        {/* Sidebar Info Columns */}
        <div className="space-y-6">
          {/* Waypoints List */}
          <ChartCard title="Waypoints" delay={0.05}>
            <div className="space-y-0">
              {dynamicWaypoints.map((wp, i) => (
                <div key={wp.name} className="flex items-start gap-3 py-2.5 border-b border-neutral-border/50 last:border-0 font-sans">
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      "w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                      wp.status === "Departed" || wp.status === "Passed" 
                        ? "bg-primary border-primary" 
                        : wp.status === "Active" 
                          ? "bg-emerald-500 border-emerald-500 ring-4 ring-emerald-100 animate-pulse"
                          : wp.status === "Destination" 
                            ? "bg-success border-success" 
                            : "bg-white border-neutral-border"
                    )} />
                    {i < waypoints.length - 1 && <div className="w-0.5 h-6 bg-neutral-border mt-1" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-neutral-textMain font-headings">{wp.name}</p>
                    <p className="text-[11px] text-neutral-textMuted mt-0.5">{wp.dist} — {wp.eta}</p>
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full font-headings",
                    wp.status === "Passed" || wp.status === "Departed" 
                      ? "bg-primary-light text-primary" 
                      : wp.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : wp.status === "Destination" 
                          ? "bg-success-light text-success" 
                          : "bg-accent-light text-neutral-textMuted"
                  )}>{wp.status}</span>
                </div>
              ))}
            </div>
          </ChartCard>

          {/* Recommended Stops */}
          <ChartCard title="Recommended Stops" delay={0.1}>
            <div className="space-y-2">
              {routeStops.map((stop) => (
                <div key={stop.name} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-neutral-border/30 font-sans">
                  {stop.type === "Fuel" ? <Fuel className="w-4 h-4 text-primary flex-shrink-0" /> : <Clock className="w-4 h-4 text-warning flex-shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-textMain truncate font-headings">{stop.name}</p>
                    <p className="text-[11px] text-neutral-textMuted mt-0.5">{stop.dist}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-textMuted flex-shrink-0" />
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>
    </motion.div>
  );
}
