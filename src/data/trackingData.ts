export interface TrackingLocation {
  city: string;
  state: string;
  coords: [number, number]; // [lng, lat]
}

export interface TrackingActivity {
  id: number;
  title: string;
  location: string;
  timestamp: string;
  date: string;
  time: string;
}

export interface TrackingData {
  id: string;
  origin: TrackingLocation;
  destination: TrackingLocation;
  currentLocation: TrackingLocation;
  route: TrackingLocation[];
  status: "collected" | "in_transit" | "out_for_delivery" | "delivered";
  originalDeliveryDate: string;
  delayHours: number;
  delayReason: string | null;
  finalDeliveryDate: string;
  distanceRemaining: number;
  totalDistance: number;
  progressPercent: number;
  confidence: number;
  activities: TrackingActivity[];
  collectedDate: string;
  collectedTime: string;
}

export const trackingDatabase: Record<string, TrackingData> = {
  // Delay-free examples (shown first)
  "EE444555666IN": {
    id: "EE444555666IN",
    origin: { city: "Kolkata", state: "West Bengal", coords: [88.3639, 22.5726] },
    destination: { city: "Bhubaneswar", state: "Odisha", coords: [85.8245, 20.2961] },
    currentLocation: { city: "Bhubaneswar", state: "Odisha", coords: [85.8245, 20.2961] },
    route: [
      { city: "Kolkata", state: "West Bengal", coords: [88.3639, 22.5726] },
      { city: "Bhubaneswar", state: "Odisha", coords: [85.8245, 20.2961] },
    ],
    status: "out_for_delivery",
    originalDeliveryDate: "Dec 20, 2025",
    delayHours: 0,
    delayReason: null,
    finalDeliveryDate: "Dec 20, 2025",
    distanceRemaining: 5,
    totalDistance: 440,
    progressPercent: 98,
    confidence: 99,
    collectedDate: "Dec 18, 2025",
    collectedTime: "08:00 AM",
    activities: [
      { id: 1, title: "Out for delivery", location: "Bhubaneswar Local Delivery Office, OD", timestamp: "1 hour ago", date: "Dec 20, 2025", time: "08:30 AM" },
      { id: 2, title: "Arrived at Bhubaneswar hub", location: "Bhubaneswar Central Hub, Odisha", timestamp: "Yesterday", date: "Dec 19, 2025", time: "06:00 PM" },
      { id: 3, title: "In transit", location: "NH 16, Odisha", timestamp: "Dec 19, 2025", date: "Dec 19, 2025", time: "10:00 AM" },
      { id: 4, title: "Package collected from sender", location: "Kolkata GPO, West Bengal", timestamp: "Dec 18, 2025", date: "Dec 18, 2025", time: "08:00 AM" },
    ],
  },
  "EE777888999IN": {
    id: "EE777888999IN",
    origin: { city: "Jaipur", state: "Rajasthan", coords: [75.7873, 26.9124] },
    destination: { city: "Ahmedabad", state: "Gujarat", coords: [72.5714, 23.0225] },
    currentLocation: { city: "Udaipur", state: "Rajasthan", coords: [73.7125, 24.5854] },
    route: [
      { city: "Jaipur", state: "Rajasthan", coords: [75.7873, 26.9124] },
      { city: "Udaipur", state: "Rajasthan", coords: [73.7125, 24.5854] },
      { city: "Ahmedabad", state: "Gujarat", coords: [72.5714, 23.0225] },
    ],
    status: "in_transit",
    originalDeliveryDate: "Dec 21, 2025",
    delayHours: 0,
    delayReason: null,
    finalDeliveryDate: "Dec 21, 2025",
    distanceRemaining: 260,
    totalDistance: 670,
    progressPercent: 61,
    confidence: 94,
    collectedDate: "Dec 18, 2025",
    collectedTime: "11:30 AM",
    activities: [
      { id: 1, title: "Departed Udaipur facility", location: "Udaipur Processing Center, RJ", timestamp: "2 hours ago", date: "Dec 19, 2025", time: "01:00 PM" },
      { id: 2, title: "Arrived at Udaipur", location: "Udaipur Hub, Rajasthan", timestamp: "Yesterday", date: "Dec 18, 2025", time: "08:00 PM" },
      { id: 3, title: "In transit", location: "NH 48, Rajasthan", timestamp: "Dec 18, 2025", date: "Dec 18, 2025", time: "02:00 PM" },
      { id: 4, title: "Package collected from sender", location: "Jaipur GPO, Rajasthan", timestamp: "Dec 18, 2025", date: "Dec 18, 2025", time: "11:30 AM" },
    ],
  },
  "EE123456789IN": {
    id: "EE123456789IN",
    origin: { city: "Hyderabad", state: "Telangana", coords: [78.4772, 17.4065] },
    destination: { city: "Guntur", state: "Andhra Pradesh", coords: [80.4365, 16.3067] },
    currentLocation: { city: "Vijayawada", state: "Andhra Pradesh", coords: [80.6480, 16.5062] },
    route: [
      { city: "Hyderabad", state: "Telangana", coords: [78.4772, 17.4065] },
      { city: "Vijayawada", state: "Andhra Pradesh", coords: [80.6480, 16.5062] },
      { city: "Guntur", state: "Andhra Pradesh", coords: [80.4365, 16.3067] },
    ],
    status: "in_transit",
    originalDeliveryDate: "Dec 21, 2025",
    delayHours: 24,
    delayReason: "traffic",
    finalDeliveryDate: "Dec 22, 2025",
    distanceRemaining: 72,
    totalDistance: 275,
    progressPercent: 65,
    confidence: 85,
    collectedDate: "Dec 18, 2025",
    collectedTime: "09:32 AM",
    activities: [
      { id: 1, title: "Package departed sorting facility", location: "Vijayawada Processing Center, AP", timestamp: "1 hour ago", date: "Dec 19, 2025", time: "02:15 PM" },
      { id: 2, title: "Package scanned at facility", location: "Vijayawada Processing Center, AP", timestamp: "3 hours ago", date: "Dec 19, 2025", time: "11:30 AM" },
      { id: 3, title: "Arrived at regional hub", location: "Vijayawada Hub, Andhra Pradesh", timestamp: "8 hours ago", date: "Dec 19, 2025", time: "08:00 AM" },
      { id: 4, title: "In transit to next facility", location: "En route from Hyderabad, Telangana", timestamp: "Yesterday, 4:32 PM", date: "Dec 18, 2025", time: "04:32 PM" },
      { id: 5, title: "Package collected from sender", location: "Hyderabad GPO, Telangana", timestamp: "Dec 18, 2025", date: "Dec 18, 2025", time: "09:32 AM" },
    ],
  },
  "EE987654321IN": {
    id: "EE987654321IN",
    origin: { city: "Delhi", state: "Delhi", coords: [77.2090, 28.6139] },
    destination: { city: "Hyderabad", state: "Telangana", coords: [78.4772, 17.4065] },
    currentLocation: { city: "Nagpur", state: "Maharashtra", coords: [79.0882, 21.1458] },
    route: [
      { city: "Delhi", state: "Delhi", coords: [77.2090, 28.6139] },
      { city: "Nagpur", state: "Maharashtra", coords: [79.0882, 21.1458] },
      { city: "Hyderabad", state: "Telangana", coords: [78.4772, 17.4065] },
    ],
    status: "in_transit",
    originalDeliveryDate: "Dec 23, 2025",
    delayHours: 0,
    delayReason: null,
    finalDeliveryDate: "Dec 23, 2025",
    distanceRemaining: 504,
    totalDistance: 1257,
    progressPercent: 60,
    confidence: 92,
    collectedDate: "Dec 17, 2025",
    collectedTime: "11:00 AM",
    activities: [
      { id: 1, title: "Package in transit", location: "National Highway 44, Maharashtra", timestamp: "30 mins ago", date: "Dec 19, 2025", time: "03:00 PM" },
      { id: 2, title: "Departed Nagpur hub", location: "Nagpur Sorting Facility, MH", timestamp: "4 hours ago", date: "Dec 19, 2025", time: "10:30 AM" },
      { id: 3, title: "Arrived at Nagpur", location: "Nagpur Hub, Maharashtra", timestamp: "Yesterday", date: "Dec 18, 2025", time: "08:00 PM" },
      { id: 4, title: "Package collected from sender", location: "Delhi GPO, Delhi", timestamp: "Dec 17, 2025", date: "Dec 17, 2025", time: "11:00 AM" },
    ],
  },
  "EE555888999IN": {
    id: "EE555888999IN",
    origin: { city: "Bangalore", state: "Karnataka", coords: [77.5946, 12.9716] },
    destination: { city: "Guntur", state: "Andhra Pradesh", coords: [80.4365, 16.3067] },
    currentLocation: { city: "Anantapur", state: "Andhra Pradesh", coords: [77.5937, 14.6819] },
    route: [
      { city: "Bangalore", state: "Karnataka", coords: [77.5946, 12.9716] },
      { city: "Anantapur", state: "Andhra Pradesh", coords: [77.5937, 14.6819] },
      { city: "Guntur", state: "Andhra Pradesh", coords: [80.4365, 16.3067] },
    ],
    status: "in_transit",
    originalDeliveryDate: "Dec 22, 2025",
    delayHours: 48,
    delayReason: "traffic",
    finalDeliveryDate: "Dec 24, 2025",
    distanceRemaining: 285,
    totalDistance: 465,
    progressPercent: 40,
    confidence: 78,
    collectedDate: "Dec 18, 2025",
    collectedTime: "02:00 PM",
    activities: [
      { id: 1, title: "Heavy traffic congestion reported", location: "NH 44, near Anantapur, AP", timestamp: "2 hours ago", date: "Dec 19, 2025", time: "01:30 PM" },
      { id: 2, title: "Departed Anantapur facility", location: "Anantapur Processing Center, AP", timestamp: "5 hours ago", date: "Dec 19, 2025", time: "10:00 AM" },
      { id: 3, title: "Arrived at Anantapur", location: "Anantapur Hub, Andhra Pradesh", timestamp: "Yesterday", date: "Dec 18, 2025", time: "10:00 PM" },
      { id: 4, title: "Package collected from sender", location: "Bangalore GPO, Karnataka", timestamp: "Dec 18, 2025", date: "Dec 18, 2025", time: "02:00 PM" },
    ],
  },
  "EE111222333IN": {
    id: "EE111222333IN",
    origin: { city: "Mumbai", state: "Maharashtra", coords: [72.8777, 19.0760] },
    destination: { city: "Chennai", state: "Tamil Nadu", coords: [80.2707, 13.0827] },
    currentLocation: { city: "Chennai", state: "Tamil Nadu", coords: [80.2707, 13.0827] },
    route: [
      { city: "Mumbai", state: "Maharashtra", coords: [72.8777, 19.0760] },
      { city: "Pune", state: "Maharashtra", coords: [73.8567, 18.5204] },
      { city: "Bangalore", state: "Karnataka", coords: [77.5946, 12.9716] },
      { city: "Chennai", state: "Tamil Nadu", coords: [80.2707, 13.0827] },
    ],
    status: "out_for_delivery",
    originalDeliveryDate: "Dec 20, 2025",
    delayHours: 0,
    delayReason: null,
    finalDeliveryDate: "Dec 20, 2025",
    distanceRemaining: 8,
    totalDistance: 1330,
    progressPercent: 99,
    confidence: 98,
    collectedDate: "Dec 15, 2025",
    collectedTime: "10:00 AM",
    activities: [
      { id: 1, title: "Out for delivery", location: "Chennai Local Delivery Office, TN", timestamp: "30 mins ago", date: "Dec 20, 2025", time: "09:00 AM" },
      { id: 2, title: "Arrived at Chennai hub", location: "Chennai Central Hub, Tamil Nadu", timestamp: "Yesterday", date: "Dec 19, 2025", time: "06:00 PM" },
      { id: 3, title: "Departed Bangalore", location: "Bangalore Sorting Center, KA", timestamp: "Dec 18, 2025", date: "Dec 18, 2025", time: "02:00 PM" },
      { id: 4, title: "Arrived at Bangalore", location: "Bangalore Hub, Karnataka", timestamp: "Dec 17, 2025", date: "Dec 17, 2025", time: "11:00 AM" },
      { id: 5, title: "Package collected from sender", location: "Mumbai GPO, Maharashtra", timestamp: "Dec 15, 2025", date: "Dec 15, 2025", time: "10:00 AM" },
    ],
  },
};

export const getTrackingData = (trackingId: string): TrackingData | null => {
  return trackingDatabase[trackingId] || null;
};

export const getAllTrackingIds = (): string[] => {
  return Object.keys(trackingDatabase);
};
