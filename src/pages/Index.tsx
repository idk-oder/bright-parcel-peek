import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DeliveryProgress from "@/components/dashboard/DeliveryProgress";
import DeliveryPrediction from "@/components/dashboard/DeliveryPrediction";
import CurrentLocation from "@/components/dashboard/CurrentLocation";
import RecentActivity from "@/components/dashboard/RecentActivity";
import BottomNavigation from "@/components/dashboard/BottomNavigation";
import LiveLocationView from "@/components/dashboard/LiveLocationView";
import DeliveryProgressView from "@/components/dashboard/DeliveryProgressView";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "location":
        return (
          <>
            <div className="mb-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground">Live Location</h2>
              <p className="text-muted-foreground mt-1">Real-time tracking of your parcel</p>
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
              <h2 className="text-2xl font-bold text-foreground">Delivery Progress</h2>
              <p className="text-muted-foreground mt-1">Detailed tracking timeline with delivery calculation</p>
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
              <h2 className="text-2xl font-bold text-foreground">Prediction Time</h2>
              <p className="text-muted-foreground mt-1">AI-powered delivery predictions</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <DeliveryPrediction />
            </div>
          </>
        );
      
      case "home":
      default:
        return (
          <>
            {/* Page Title */}
            <div className="mb-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-foreground">Dashboard Overview</h2>
              <p className="text-muted-foreground mt-1">Track your parcel in real-time with predictive insights</p>
            </div>
            
            {/* Delivery Progress */}
            <div className="mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <DeliveryProgress />
            </div>
            
            {/* Two Column Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                <DeliveryPrediction />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                <CurrentLocation />
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
              <RecentActivity />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <DashboardHeader />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {renderContent()}
      </main>
      
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
