import { Check, Timer, Package, PackageCheck } from "lucide-react";
import { useApp } from "@/context/AppContext";

const DeliveryProgress = () => {
  const { trackingData, t } = useApp();

  // Determine step statuses based on tracking data
  const getStepStatus = (stepIndex: number): "completed" | "active" | "pending" => {
    if (!trackingData) return "pending";
    
    const statusOrder = ["collected", "in_transit", "out_for_delivery", "delivered"];
    const currentIndex = statusOrder.indexOf(trackingData.status);
    
    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "active";
    return "pending";
  };

  const steps = [
    {
      id: 1,
      label: t("collected"),
      date: trackingData ? `${trackingData.collectedDate} • ${trackingData.collectedTime}` : "—",
      icon: <Check className="w-5 h-5" />,
      status: getStepStatus(0),
    },
    {
      id: 2,
      label: t("in_transit"),
      date: trackingData?.activities[trackingData.activities.length - 2]?.date || "—",
      icon: <Timer className="w-5 h-5" />,
      status: getStepStatus(1),
    },
    {
      id: 3,
      label: t("out_for_delivery"),
      date: trackingData ? `Est. ${trackingData.finalDeliveryDate}` : "—",
      icon: <Package className="w-5 h-5" />,
      status: getStepStatus(2),
    },
    {
      id: 4,
      label: t("delivered"),
      date: trackingData ? `Est. ${trackingData.finalDeliveryDate}` : "—",
      icon: <PackageCheck className="w-5 h-5" />,
      status: getStepStatus(3),
    },
  ];

  // Calculate progress line width
  const getProgressWidth = () => {
    if (!trackingData) return "0%";
    const progressMap: Record<string, string> = {
      collected: "12.5%",
      in_transit: "37.5%",
      out_for_delivery: "62.5%",
      delivered: "100%",
    };
    return progressMap[trackingData.status] || "0%";
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <h3 className="text-lg font-semibold text-foreground mb-6">{t("delivery_progress")}</h3>
      
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-border" />
        <div 
          className="absolute top-6 left-0 h-0.5 bg-primary transition-all duration-500" 
          style={{ width: getProgressWidth() }}
        />
        
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center relative z-10" style={{ animationDelay: `${index * 100}ms` }}>
            {/* Step Circle */}
            <div
              className={`
                w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                ${step.status === "completed" 
                  ? "bg-primary text-primary-foreground shadow-elevated" 
                  : step.status === "active"
                    ? "bg-tracking-red-light border-2 border-primary text-primary"
                    : "bg-secondary text-inactive border border-border"
                }
              `}
            >
              {step.status === "active" && (
                <div className="absolute w-12 h-12 rounded-full bg-primary/20 animate-pulse-ring" />
              )}
              {step.icon}
            </div>
            
            {/* Label */}
            <span className={`
              mt-3 text-sm font-medium transition-colors text-center
              ${step.status === "pending" ? "text-muted-foreground" : "text-foreground"}
            `}>
              {step.label}
            </span>
            
            {/* Date */}
            <span className={`
              mt-1 text-xs text-center
              ${step.status === "pending" ? "text-inactive" : "text-muted-foreground"}
            `}>
              {step.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryProgress;
