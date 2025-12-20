import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { TrackingData, getTrackingData, getAllTrackingIds } from "@/data/trackingData";
import { Language, getTranslation } from "@/data/translations";

interface AppContextType {
  // Tracking
  trackingId: string;
  setTrackingId: (id: string) => void;
  trackingData: TrackingData | null;
  searchTracking: (id: string) => void;
  allTrackingIds: string[];
  
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  
  // Language
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  
  // Notifications
  notifications: Notification[];
  hasUnreadNotifications: boolean;
  markAllNotificationsRead: () => void;
}

interface Notification {
  id: string;
  type: "delay" | "arrival" | "info";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [trackingId, setTrackingId] = useState("");
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  const allTrackingIds = getAllTrackingIds();
  
  // Translation helper
  const t = (key: string): string => getTranslation(language, key);
  
  // Search for tracking data
  const searchTracking = (id: string) => {
    const trimmedId = id.trim().toUpperCase();
    setTrackingId(trimmedId);
    const data = getTrackingData(trimmedId);
    setTrackingData(data);
    
    // Update notifications based on tracking data
    if (data) {
      const newNotifications: Notification[] = [];
      
      if (data.delayHours > 0) {
        newNotifications.push({
          id: `delay-${data.id}`,
          type: "delay",
          title: data.delayReason === "traffic" ? t("traffic_delay_expected") : t("weather_delay_expected"),
          message: `${data.delayHours} hours delay expected for ${data.id}`,
          timestamp: "Just now",
          read: false,
        });
      }
      
      newNotifications.push({
        id: `arrival-${data.id}`,
        type: "arrival",
        title: t("parcel_reached"),
        message: `Package is at ${data.currentLocation.city}, ${data.currentLocation.state}`,
        timestamp: "1 hour ago",
        read: false,
      });
      
      setNotifications(newNotifications);
    } else {
      setNotifications([]);
    }
  };
  
  // Dark mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };
  
  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  
  // Mark all notifications as read
  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };
  
  const hasUnreadNotifications = notifications.some((n) => !n.read);
  
  return (
    <AppContext.Provider
      value={{
        trackingId,
        setTrackingId,
        trackingData,
        searchTracking,
        allTrackingIds,
        isDarkMode,
        toggleDarkMode,
        language,
        setLanguage,
        t,
        notifications,
        hasUnreadNotifications,
        markAllNotificationsRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
