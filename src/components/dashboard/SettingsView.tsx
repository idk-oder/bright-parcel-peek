import { Settings, Sun, Moon, Globe, Bell, Mail, MessageSquare } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Language } from "@/data/translations";
import { useState } from "react";

interface SettingsViewProps {
  onClose: () => void;
}

const SettingsView = ({ onClose }: SettingsViewProps) => {
  const { isDarkMode, toggleDarkMode, language, setLanguage, t } = useApp();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  const languages: { code: Language; name: string; nativeName: string }[] = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "hi", name: "Hindi", nativeName: "हिंदी" },
    { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  ];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <div className="bg-card rounded-xl border border-border shadow-xl w-full max-w-md mx-4 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">{t("settings")}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-secondary hover:bg-accent flex items-center justify-center transition-colors"
          >
            ×
          </button>
        </div>

        {/* Settings Content */}
        <div className="p-4 space-y-6 max-h-[500px] overflow-y-auto">
          {/* Appearance */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Sun className="w-4 h-4" />
              {t("appearance")}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => isDarkMode && toggleDarkMode()}
                className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                  !isDarkMode
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Sun className={`w-6 h-6 ${!isDarkMode ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-sm font-medium ${!isDarkMode ? "text-primary" : "text-muted-foreground"}`}>
                  {t("light_mode")}
                </span>
              </button>
              <button
                onClick={() => !isDarkMode && toggleDarkMode()}
                className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                  isDarkMode
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Moon className={`w-6 h-6 ${isDarkMode ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-sm font-medium ${isDarkMode ? "text-primary" : "text-muted-foreground"}`}>
                  {t("dark_mode")}
                </span>
              </button>
            </div>
          </div>

          {/* Language */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              {t("language")}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-1 ${
                    language === lang.code
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <span
                    className={`text-sm font-medium ${
                      language === lang.code ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {lang.nativeName}
                  </span>
                  <span className="text-xs text-muted-foreground">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Notification Settings */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Bell className="w-4 h-4" />
              {t("notification_settings")}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{t("push_notifications")}</span>
                </div>
                <button
                  onClick={() => setPushEnabled(!pushEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    pushEnabled ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow absolute top-0.5 transition-transform ${
                      pushEnabled ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{t("email_notifications")}</span>
                </div>
                <button
                  onClick={() => setEmailEnabled(!emailEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    emailEnabled ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow absolute top-0.5 transition-transform ${
                      emailEnabled ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{t("sms_notifications")}</span>
                </div>
                <button
                  onClick={() => setSmsEnabled(!smsEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    smsEnabled ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow absolute top-0.5 transition-transform ${
                      smsEnabled ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
