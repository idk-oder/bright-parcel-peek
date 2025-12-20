import { useState } from "react";
import { AppProvider, useApp } from "@/context/AppContext";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DeliveryProgress from "@/components/dashboard/DeliveryProgress";
import DeliveryPrediction from "@/components/dashboard/DeliveryPrediction";
import CurrentLocation from "@/components/dashboard/CurrentLocation";
import RecentActivity from "@/components/dashboard/RecentActivity";
import BottomNavigation from "@/components/dashboard/BottomNavigation";
import LiveLocationView from "@/components/dashboard/LiveLocationView";
import DeliveryProgressView from "@/components/dashboard/DeliveryProgressView";
import AIPredictionView from "@/components/dashboard/AIPredictionView";

const DashboardContent = () => {
  const [activeTab, setActiveTab] = useState("home");
  const { trackingData, t } = useApp();

  const renderContent = () => {
    if (!trackingData) {
      return (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
            <span className="text-4xl">📦</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{t("no_data")}</h2>
          <p className="text-muted-foreground">{t("enter_valid_id")}</p>
          <p className="text-sm text-muted-foreground/60 mt-4">
            Try: EE123456789IN, EE987654321IN, EE555888999IN, EE111222333IN
          </p>
        </div>
      );
    }

    switch (activeTab) {
      case "location":
        return (
          <>
            <div className="mb-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground">{t("live_location")}</h2>
              <p className="text-muted-foreground mt-1">{t("track_your_parcel")}</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <LiveLocationView />
            </div>
          </>
        );
      
      case "progress":
        return (
          <>
            <div className="mb-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground">{t("delivery_progress")}</h2>
              <p className="text-muted-foreground mt-1">{t("detailed_timeline")}</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <DeliveryProgressView />
            </div>
          </>
        );
      
      case "prediction":
        return (
          <>
            <div className="mb-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground">{t("ai_prediction")}</h2>
              <p className="text-muted-foreground mt-1">{t("ai_powered")}</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <AIPredictionView />
            </div>
          </>
        );
      
      case "home":
      default:
        return (
          <>
            <div className="mb-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground">{t("dashboard_overview")}</h2>
              <p className="text-muted-foreground mt-1">{t("track_your_parcel")}</p>
            </div>
            
            <div className="mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <DeliveryProgress />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                <CurrentLocation />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                <DeliveryPrediction />
              </div>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
              <RecentActivity />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <DashboardHeader />
      <main className="max-w-6xl mx-auto px-4 py-8">
        {renderContent()}
      </main>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

const Index = () => {
  return (
    <AppProvider>
      <DashboardContent />
    </AppProvider>
  );
};

export default Index;
