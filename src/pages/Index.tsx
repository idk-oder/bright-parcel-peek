import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DeliveryProgress from "@/components/dashboard/DeliveryProgress";
import DeliveryPrediction from "@/components/dashboard/DeliveryPrediction";
import CurrentLocation from "@/components/dashboard/CurrentLocation";
import RecentActivity from "@/components/dashboard/RecentActivity";
import BottomNavigation from "@/components/dashboard/BottomNavigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <DashboardHeader />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
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
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Index;
