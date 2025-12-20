import { User, Camera, Mail, Phone, MapPin, Edit2, Save, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useState, useRef } from "react";

interface ProfileViewProps {
  onClose: () => void;
}

const ProfileView = ({ onClose }: ProfileViewProps) => {
  const { t } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [profile, setProfile] = useState({
    name: "Rahul Sharma",
    phone: "+91 98765 43210",
    email: "rahul.sharma@email.com",
    address: "123 MG Road, Hyderabad, Telangana 500001",
  });
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <div className="bg-card rounded-xl border border-border shadow-xl w-full max-w-md mx-4 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">{t("profile")}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-secondary hover:bg-accent flex items-center justify-center transition-colors"
          >
            ×
          </button>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          {/* Profile Photo */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover shadow-lg border-2 border-primary/20"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-3xl font-bold text-primary-foreground shadow-lg">
                  {profile.name.charAt(0)}
                </div>
              )}
              <button 
                onClick={triggerFileInput}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors"
                title="Upload photo"
              >
                <Camera className="w-4 h-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <p className="mt-3 text-lg font-semibold text-foreground">{profile.name}</p>
            <p className="text-xs text-muted-foreground mt-1">Click camera icon to upload photo</p>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="mt-2 flex items-center gap-1.5 text-sm text-primary hover:underline"
              >
                <Edit2 className="w-3.5 h-3.5" />
                {t("edit_profile")}
              </button>
            )}
          </div>

          {/* Profile Fields */}
          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1.5">
                <User className="w-3.5 h-3.5" />
                {t("name")}
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                  className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              ) : (
                <p className="text-sm text-foreground bg-secondary/50 px-3 py-2.5 rounded-lg">
                  {profile.name}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1.5">
                <Phone className="w-3.5 h-3.5" />
                {t("phone")}
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editedProfile.phone}
                  onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                  className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              ) : (
                <p className="text-sm text-foreground bg-secondary/50 px-3 py-2.5 rounded-lg">
                  {profile.phone}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1.5">
                <Mail className="w-3.5 h-3.5" />
                {t("email")}
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                  className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              ) : (
                <p className="text-sm text-foreground bg-secondary/50 px-3 py-2.5 rounded-lg">
                  {profile.email}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {t("address")}
              </label>
              {isEditing ? (
                <textarea
                  value={editedProfile.address}
                  onChange={(e) => setEditedProfile({ ...editedProfile, address: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              ) : (
                <p className="text-sm text-foreground bg-secondary/50 px-3 py-2.5 rounded-lg">
                  {profile.address}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCancel}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-secondary text-foreground rounded-lg hover:bg-accent transition-colors text-sm font-medium"
              >
                <X className="w-4 h-4" />
                {t("cancel")}
              </button>
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                <Save className="w-4 h-4" />
                {t("save_changes")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
