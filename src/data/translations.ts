export type Language = "en" | "hi" | "te";

// Additional translation keys for dynamic data

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    "india_post": "India Post",
    "smart_parcel_tracking": "Smart Parcel Tracking",
    "tracking": "Tracking",
    
    // Navigation
    "home": "Home",
    "live_location": "Live Location",
    "ai_prediction": "AI Prediction",
    "delivery_progress": "Delivery Progress",
    "enter_tracking_id": "Enter Tracking ID",
    
    // Dashboard
    "dashboard_overview": "Dashboard Overview",
    "track_your_parcel": "Track your parcel in real-time with predictive insights",
    "delivery_prediction": "Delivery Prediction",
    "current_location": "Current Location",
    "recent_activity": "Recent Activity",
    "updates": "updates",
    
    // Delivery Progress
    "collected": "Collected",
    "in_transit": "In Transit",
    "out_for_delivery": "Out for Delivery",
    "delivered": "Delivered",
    
    // Prediction
    "ai_powered": "AI Powered",
    "weather_delay_expected": "Weather-Based Delay Expected",
    "traffic_delay_expected": "Traffic-Based Delay Expected",
    "original_eta": "Original ETA",
    "updated_eta": "Updated ETA",
    "confidence": "Confidence",
    "delay_meter": "Delay Risk Meter",
    "low_risk": "Low Risk",
    "medium_risk": "Medium Risk",
    "high_risk": "High Risk",
    
    // Live Location
    "live_vehicle_location": "Live Vehicle Location",
    "updated_just_now": "Updated: Just now",
    "route_progress": "Route Progress",
    "completed": "Completed",
    "in_progress": "In Progress",
    "pending": "Pending",
    "distance_remaining": "Distance Remaining",
    "est_arrival": "Est. arrival",
    
    // Delivery Calculation
    "delivery_calculation": "Delivery Calculation",
    "original_delivery": "Original Delivery",
    "delay_due_to_weather": "Delay due to Weather",
    "delay_due_to_traffic": "Delay due to Traffic",
    "final_delivery": "Final Delivery",
    "detailed_timeline": "Detailed Tracking Timeline",
    "heavy_traffic": "Heavy traffic congestion is affecting the delivery route. Delivery has been rescheduled for safety.",
    "heavy_thunderstorms": "Heavy thunderstorms are affecting the route. Delivery has been rescheduled for safety.",
    
    // Notifications
    "notifications": "Notifications",
    "no_notifications": "No notifications",
    "delay_predicted": "Delay Predicted",
    "parcel_reached": "Parcel Reached Hub",
    "mark_all_read": "Mark all as read",
    
    // Settings
    "settings": "Settings",
    "appearance": "Appearance",
    "light_mode": "Light Mode",
    "dark_mode": "Dark Mode",
    "language": "Language",
    "english": "English",
    "hindi": "Hindi",
    "telugu": "Telugu",
    "notification_settings": "Notification Settings",
    "push_notifications": "Push Notifications",
    "email_notifications": "Email Notifications",
    "sms_notifications": "SMS Notifications",
    
    // Profile
    "profile": "Profile",
    "edit_profile": "Edit Profile",
    "save_changes": "Save Changes",
    "cancel": "Cancel",
    "name": "Name",
    "phone": "Phone",
    "email": "Email",
    "address": "Address",
    "profile_photo": "Profile Photo",
    "change_photo": "Change Photo",
    
    // Common
    "search": "Search",
    "track_live": "Track Live",
    "view_all": "View All",
    "back": "Back",
    "close": "Close",
    "no_data": "No tracking data available",
    "enter_valid_id": "Please enter a valid tracking ID",
    
    // Timeline items
    "package_collected": "Package Collected",
    "departed_origin": "Departed Origin Facility",
    "arrived_at_hub": "Arrived at Hub",
  },
  hi: {
    // Header
    "india_post": "इंडिया पोस्ट",
    "smart_parcel_tracking": "स्मार्ट पार्सल ट्रैकिंग",
    "tracking": "ट्रैकिंग",
    
    // Navigation
    "home": "होम",
    "live_location": "लाइव लोकेशन",
    "ai_prediction": "AI भविष्यवाणी",
    "delivery_progress": "डिलीवरी प्रगति",
    "enter_tracking_id": "ट्रैकिंग आईडी दर्ज करें",
    
    // Dashboard
    "dashboard_overview": "डैशबोर्ड अवलोकन",
    "track_your_parcel": "वास्तविक समय में अपने पार्सल को ट्रैक करें",
    "delivery_prediction": "डिलीवरी भविष्यवाणी",
    "current_location": "वर्तमान स्थान",
    "recent_activity": "हाल की गतिविधि",
    "updates": "अपडेट",
    
    // Delivery Progress
    "collected": "एकत्रित",
    "in_transit": "रास्ते में",
    "out_for_delivery": "डिलीवरी के लिए निकला",
    "delivered": "वितरित",
    
    // Prediction
    "ai_powered": "AI संचालित",
    "weather_delay_expected": "मौसम के कारण देरी",
    "traffic_delay_expected": "ट्रैफिक के कारण देरी",
    "original_eta": "मूल ETA",
    "updated_eta": "अपडेटेड ETA",
    "confidence": "विश्वास",
    "delay_meter": "देरी जोखिम मीटर",
    "low_risk": "कम जोखिम",
    "medium_risk": "मध्यम जोखिम",
    "high_risk": "उच्च जोखिम",
    
    // Live Location
    "live_vehicle_location": "लाइव वाहन स्थान",
    "updated_just_now": "अभी अपडेट किया गया",
    "route_progress": "मार्ग प्रगति",
    "completed": "पूर्ण",
    "in_progress": "प्रगति पर",
    "pending": "लंबित",
    "distance_remaining": "शेष दूरी",
    "est_arrival": "अनुमानित आगमन",
    
    // Delivery Calculation
    "delivery_calculation": "डिलीवरी गणना",
    "original_delivery": "मूल डिलीवरी",
    "delay_due_to_weather": "मौसम के कारण देरी",
    "delay_due_to_traffic": "ट्रैफिक के कारण देरी",
    "final_delivery": "अंतिम डिलीवरी",
    "detailed_timeline": "विस्तृत ट्रैकिंग टाइमलाइन",
    "heavy_traffic": "भारी ट्रैफिक के कारण डिलीवरी में देरी हो रही है।",
    "heavy_thunderstorms": "भारी तूफान के कारण डिलीवरी पुनर्निर्धारित की गई है।",
    
    // Notifications
    "notifications": "सूचनाएं",
    "no_notifications": "कोई सूचना नहीं",
    "delay_predicted": "देरी की भविष्यवाणी",
    "parcel_reached": "पार्सल हब पहुंचा",
    "mark_all_read": "सभी को पढ़ा हुआ चिह्नित करें",
    
    // Settings
    "settings": "सेटिंग्स",
    "appearance": "दिखावट",
    "light_mode": "लाइट मोड",
    "dark_mode": "डार्क मोड",
    "language": "भाषा",
    "english": "अंग्रेज़ी",
    "hindi": "हिंदी",
    "telugu": "तेलुगु",
    "notification_settings": "सूचना सेटिंग्स",
    "push_notifications": "पुश सूचनाएं",
    "email_notifications": "ईमेल सूचनाएं",
    "sms_notifications": "SMS सूचनाएं",
    
    // Profile
    "profile": "प्रोफ़ाइल",
    "edit_profile": "प्रोफ़ाइल संपादित करें",
    "save_changes": "परिवर्तन सहेजें",
    "cancel": "रद्द करें",
    "name": "नाम",
    "phone": "फ़ोन",
    "email": "ईमेल",
    "address": "पता",
    "profile_photo": "प्रोफ़ाइल फ़ोटो",
    "change_photo": "फ़ोटो बदलें",
    
    // Common
    "search": "खोजें",
    "track_live": "लाइव ट्रैक करें",
    "view_all": "सभी देखें",
    "back": "वापस",
    "close": "बंद करें",
    "no_data": "कोई ट्रैकिंग डेटा उपलब्ध नहीं",
    "enter_valid_id": "कृपया एक वैध ट्रैकिंग आईडी दर्ज करें",
    
    // Timeline items
    "package_collected": "पैकेज एकत्रित",
    "departed_origin": "मूल सुविधा से रवाना",
    "arrived_at_hub": "हब पर पहुंचा",
  },
  te: {
    // Header
    "india_post": "ఇండియా పోస్ట్",
    "smart_parcel_tracking": "స్మార్ట్ పార్సిల్ ట్రాకింగ్",
    "tracking": "ట్రాకింగ్",
    
    // Navigation
    "home": "హోమ్",
    "live_location": "లైవ్ లొకేషన్",
    "ai_prediction": "AI అంచనా",
    "delivery_progress": "డెలివరీ పురోగతి",
    "enter_tracking_id": "ట్రాకింగ్ ID నమోదు చేయండి",
    
    // Dashboard
    "dashboard_overview": "డాష్‌బోర్డ్ అవలోకనం",
    "track_your_parcel": "మీ పార్సిల్‌ను నిజ సమయంలో ట్రాక్ చేయండి",
    "delivery_prediction": "డెలివరీ అంచనా",
    "current_location": "ప్రస్తుత స్థానం",
    "recent_activity": "ఇటీవలి కార్యకలాపం",
    "updates": "అప్‌డేట్‌లు",
    
    // Delivery Progress
    "collected": "సేకరించబడింది",
    "in_transit": "రవాణాలో ఉంది",
    "out_for_delivery": "డెలివరీకి బయలుదేరింది",
    "delivered": "డెలివరీ అయింది",
    
    // Prediction
    "ai_powered": "AI ఆధారిత",
    "weather_delay_expected": "వాతావరణం కారణంగా జాప్యం",
    "traffic_delay_expected": "ట్రాఫిక్ కారణంగా జాప్యం",
    "original_eta": "అసలు ETA",
    "updated_eta": "అప్‌డేట్ చేసిన ETA",
    "confidence": "నమ్మకం",
    "delay_meter": "జాప్య ప్రమాద మీటర్",
    "low_risk": "తక్కువ ప్రమాదం",
    "medium_risk": "మధ్యస్థ ప్రమాదం",
    "high_risk": "అధిక ప్రమాదం",
    
    // Live Location
    "live_vehicle_location": "లైవ్ వాహన స్థానం",
    "updated_just_now": "ఇప్పుడే అప్‌డేట్ అయింది",
    "route_progress": "మార్గ పురోగతి",
    "completed": "పూర్తయింది",
    "in_progress": "పురోగతిలో ఉంది",
    "pending": "పెండింగ్‌లో ఉంది",
    "distance_remaining": "మిగిలిన దూరం",
    "est_arrival": "అంచనా రాక",
    
    // Delivery Calculation
    "delivery_calculation": "డెలివరీ లెక్కింపు",
    "original_delivery": "అసలు డెలివరీ",
    "delay_due_to_weather": "వాతావరణం వల్ల జాప్యం",
    "delay_due_to_traffic": "ట్రాఫిక్ వల్ల జాప్యం",
    "final_delivery": "తుది డెలివరీ",
    "detailed_timeline": "వివరణాత్మక ట్రాకింగ్ టైమ్‌లైన్",
    "heavy_traffic": "భారీ ట్రాఫిక్ రద్దీ మార్గాన్ని ప్రభావితం చేస్తోంది.",
    "heavy_thunderstorms": "భారీ ఉరుములతో కూడిన వర్షం మార్గాన్ని ప్రభావితం చేస్తోంది.",
    
    // Notifications
    "notifications": "నోటిఫికేషన్‌లు",
    "no_notifications": "నోటిఫికేషన్‌లు లేవు",
    "delay_predicted": "జాప్యం అంచనా వేయబడింది",
    "parcel_reached": "పార్సిల్ హబ్‌కు చేరుకుంది",
    "mark_all_read": "అన్నీ చదివినట్లు గుర్తించండి",
    
    // Settings
    "settings": "సెట్టింగ్‌లు",
    "appearance": "రూపం",
    "light_mode": "లైట్ మోడ్",
    "dark_mode": "డార్క్ మోడ్",
    "language": "భాష",
    "english": "ఆంగ్లం",
    "hindi": "హిందీ",
    "telugu": "తెలుగు",
    "notification_settings": "నోటిఫికేషన్ సెట్టింగ్‌లు",
    "push_notifications": "పుష్ నోటిఫికేషన్‌లు",
    "email_notifications": "ఇమెయిల్ నోటిఫికేషన్‌లు",
    "sms_notifications": "SMS నోటిఫికేషన్‌లు",
    
    // Profile
    "profile": "ప్రొఫైల్",
    "edit_profile": "ప్రొఫైల్ సవరించండి",
    "save_changes": "మార్పులను సేవ్ చేయండి",
    "cancel": "రద్దు చేయండి",
    "name": "పేరు",
    "phone": "ఫోన్",
    "email": "ఇమెయిల్",
    "address": "చిరునామా",
    "profile_photo": "ప్రొఫైల్ ఫోటో",
    "change_photo": "ఫోటో మార్చండి",
    
    // Common
    "search": "వెతకండి",
    "track_live": "లైవ్ ట్రాక్",
    "view_all": "అన్నీ చూడండి",
    "back": "వెనుకకు",
    "close": "మూసివేయండి",
    "no_data": "ట్రాకింగ్ డేటా అందుబాటులో లేదు",
    "enter_valid_id": "దయచేసి చెల్లుబాటు అయ్యే ట్రాకింగ్ ID నమోదు చేయండి",
    
    // Timeline items
    "package_collected": "ప్యాకేజీ సేకరించబడింది",
    "departed_origin": "మూల సౌకర్యం నుండి బయలుదేరింది",
    "arrived_at_hub": "హబ్‌కు చేరుకుంది",
  },
};

export const getTranslation = (lang: Language, key: string): string => {
  return translations[lang][key] || translations.en[key] || key;
};
