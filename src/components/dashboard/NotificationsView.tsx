import { Bell, Check } from "lucide-react";
import { useApp } from "@/context/AppContext";

interface NotificationsViewProps {
  onClose: () => void;
}

const NotificationsView = ({ onClose }: NotificationsViewProps) => {
  const { notifications, markAllNotificationsRead, t } = useApp();

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <div className="bg-card rounded-xl border border-border shadow-xl w-full max-w-md mx-4 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">{t("notifications")}</h2>
          </div>
          <div className="flex items-center gap-2">
            {notifications.length > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-xs text-primary hover:underline"
              >
                {t("mark_all_read")}
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-secondary hover:bg-accent flex items-center justify-center transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">{t("no_notifications")}</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-secondary/50 transition-colors ${
                    !notification.read ? "bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        notification.type === "delay"
                          ? "bg-destructive/10"
                          : notification.type === "arrival"
                          ? "bg-success/10"
                          : "bg-primary/10"
                      }`}
                    >
                      {notification.type === "delay" ? (
                        <span className="text-destructive text-lg">⚠️</span>
                      ) : notification.type === "arrival" ? (
                        <Check className="w-5 h-5 text-success" />
                      ) : (
                        <Bell className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-foreground">
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground/60 mt-1">
                        {notification.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsView;
