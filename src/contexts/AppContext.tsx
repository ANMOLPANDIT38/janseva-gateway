import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'mr' | 'ta' | 'te' | 'bn';
type Theme = 'light' | 'dark' | 'system';

interface User {
  id: string;
  phone: string;
  name: string;
  isAdmin?: boolean;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  isOnline: boolean;
  setIsOnline: (status: boolean) => void;
  showChatbot: boolean;
  setShowChatbot: (show: boolean) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const translations: Record<Language, Record<string, string>> = {
  en: {
    welcome: 'Welcome to',
    smartJanseva: 'SMART JANSEVA',
    tagline: 'One Platform, All Services',
    login: 'Login',
    enterMobile: 'Enter Mobile Number',
    sendOtp: 'Send OTP',
    verifyOtp: 'Verify OTP',
    enterOtp: 'Enter OTP',
    selectLanguage: 'Select Language',
    dashboard: 'Dashboard',
    services: 'Services',
    electricity: 'Electricity',
    water: 'Water',
    gas: 'Gas',
    sanitation: 'Sanitation',
    municipal: 'Municipal',
    payBill: 'Pay Bill',
    viewBill: 'View Bill',
    grievance: 'Grievance',
    fileComplaint: 'File Complaint',
    trackStatus: 'Track Status',
    notifications: 'Notifications',
    help: 'Help & Support',
    logout: 'Logout',
    hello: 'Hello',
    quickActions: 'Quick Actions',
    recentActivity: 'Recent Activity',
    pendingPayments: 'Pending Payments',
    activeComplaints: 'Active Complaints',
    admin: 'Admin Dashboard',
    analytics: 'Analytics',
    users: 'Users',
    complaints: 'Complaints',
    reports: 'Reports',
    settings: 'Settings',
    totalUsers: 'Total Users',
    totalTransactions: 'Total Transactions',
    openComplaints: 'Open Complaints',
    systemHealth: 'System Health',
    aiAssistant: 'AI Assistant',
    askQuestion: 'Ask a question...',
    offline: 'You are offline',
    sessionTimeout: 'Session will expire in',
    continueSession: 'Continue Session',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    systemTheme: 'System',
    appearance: 'Appearance',
  },
  hi: {
    welcome: 'स्वागत है',
    smartJanseva: 'स्मार्ट जनसेवा',
    tagline: 'एक मंच, सभी सेवाएं',
    login: 'लॉगिन',
    enterMobile: 'मोबाइल नंबर दर्ज करें',
    sendOtp: 'ओटीपी भेजें',
    verifyOtp: 'ओटीपी सत्यापित करें',
    enterOtp: 'ओटीपी दर्ज करें',
    selectLanguage: 'भाषा चुनें',
    dashboard: 'डैशबोर्ड',
    services: 'सेवाएं',
    electricity: 'बिजली',
    water: 'पानी',
    gas: 'गैस',
    sanitation: 'स्वच्छता',
    municipal: 'नगर निगम',
    payBill: 'बिल भुगतान',
    viewBill: 'बिल देखें',
    grievance: 'शिकायत',
    fileComplaint: 'शिकायत दर्ज करें',
    trackStatus: 'स्थिति जांचें',
    notifications: 'सूचनाएं',
    help: 'सहायता',
    logout: 'लॉगआउट',
    hello: 'नमस्ते',
    quickActions: 'त्वरित कार्य',
    recentActivity: 'हाल की गतिविधि',
    pendingPayments: 'लंबित भुगतान',
    activeComplaints: 'सक्रिय शिकायतें',
    admin: 'प्रशासन पैनल',
    analytics: 'विश्लेषण',
    users: 'उपयोगकर्ता',
    complaints: 'शिकायतें',
    reports: 'रिपोर्ट',
    settings: 'सेटिंग्स',
    totalUsers: 'कुल उपयोगकर्ता',
    totalTransactions: 'कुल लेनदेन',
    openComplaints: 'खुली शिकायतें',
    systemHealth: 'सिस्टम स्वास्थ्य',
    aiAssistant: 'एआई सहायक',
    askQuestion: 'प्रश्न पूछें...',
    offline: 'आप ऑफ़लाइन हैं',
    sessionTimeout: 'सत्र समाप्त होगा',
    continueSession: 'सत्र जारी रखें',
    darkMode: 'डार्क मोड',
    lightMode: 'लाइट मोड',
    systemTheme: 'सिस्टम',
    appearance: 'दिखावट',
  },
  mr: {
    welcome: 'स्वागत आहे',
    smartJanseva: 'स्मार्ट जनसेवा',
    tagline: 'एक व्यासपीठ, सर्व सेवा',
    login: 'लॉगिन',
    enterMobile: 'मोबाइल नंबर टाका',
    sendOtp: 'ओटीपी पाठवा',
    verifyOtp: 'ओटीपी सत्यापित करा',
    enterOtp: 'ओटीपी टाका',
    selectLanguage: 'भाषा निवडा',
    dashboard: 'डॅशबोर्ड',
    services: 'सेवा',
    electricity: 'वीज',
    water: 'पाणी',
    gas: 'गॅस',
    sanitation: 'स्वच्छता',
    municipal: 'महानगरपालिका',
    payBill: 'बिल भरा',
    viewBill: 'बिल पहा',
    grievance: 'तक्रार',
    fileComplaint: 'तक्रार नोंदवा',
    trackStatus: 'स्थिती तपासा',
    notifications: 'सूचना',
    help: 'मदत',
    logout: 'बाहेर पडा',
    hello: 'नमस्कार',
    quickActions: 'त्वरित कृती',
    recentActivity: 'अलीकडील क्रियाकलाप',
    pendingPayments: 'प्रलंबित देयके',
    activeComplaints: 'सक्रिय तक्रारी',
    admin: 'प्रशासन पॅनेल',
    analytics: 'विश्लेषण',
    users: 'वापरकर्ते',
    complaints: 'तक्रारी',
    reports: 'अहवाल',
    settings: 'सेटिंग्ज',
    totalUsers: 'एकूण वापरकर्ते',
    totalTransactions: 'एकूण व्यवहार',
    openComplaints: 'उघड्या तक्रारी',
    systemHealth: 'सिस्टम आरोग्य',
    aiAssistant: 'एआय सहाय्यक',
    askQuestion: 'प्रश्न विचारा...',
    offline: 'तुम्ही ऑफलाइन आहात',
    sessionTimeout: 'सत्र संपेल',
    continueSession: 'सत्र चालू ठेवा',
    darkMode: 'डार्क मोड',
    lightMode: 'लाइट मोड',
    systemTheme: 'सिस्टम',
    appearance: 'दिसणे',
  },
  ta: {
    welcome: 'வரவேற்கிறோம்',
    smartJanseva: 'ஸ்மார்ட் ஜன்சேவா',
    tagline: 'ஒரு தளம், அனைத்து சேவைகள்',
    login: 'உள்நுழை',
    enterMobile: 'மொபைல் எண்ணை உள்ளிடவும்',
    sendOtp: 'OTP அனுப்பு',
    verifyOtp: 'OTP சரிபார்',
    enterOtp: 'OTP உள்ளிடவும்',
    selectLanguage: 'மொழியைத் தேர்வுசெய்',
    dashboard: 'டாஷ்போர்டு',
    services: 'சேவைகள்',
    electricity: 'மின்சாரம்',
    water: 'தண்ணீர்',
    gas: 'எரிவாயு',
    sanitation: 'சுகாதாரம்',
    municipal: 'நகராட்சி',
    payBill: 'பில் செலுத்து',
    viewBill: 'பில் காண்க',
    grievance: 'புகார்',
    fileComplaint: 'புகார் அளி',
    trackStatus: 'நிலை கண்காணி',
    notifications: 'அறிவிப்புகள்',
    help: 'உதவி',
    logout: 'வெளியேறு',
    hello: 'வணக்கம்',
    quickActions: 'விரைவு செயல்கள்',
    recentActivity: 'சமீபத்திய செயல்பாடு',
    pendingPayments: 'நிலுவை பணம்',
    activeComplaints: 'செயலில் புகார்கள்',
    admin: 'நிர்வாக பேனல்',
    analytics: 'பகுப்பாய்வு',
    users: 'பயனர்கள்',
    complaints: 'புகார்கள்',
    reports: 'அறிக்கைகள்',
    settings: 'அமைப்புகள்',
    totalUsers: 'மொத்த பயனர்கள்',
    totalTransactions: 'மொத்த பரிவர்த்தனைகள்',
    openComplaints: 'திறந்த புகார்கள்',
    systemHealth: 'கணினி நிலை',
    aiAssistant: 'AI உதவியாளர்',
    askQuestion: 'கேள்வி கேளுங்கள்...',
    offline: 'நீங்கள் ஆஃப்லைனில்',
    sessionTimeout: 'அமர்வு முடியும்',
    continueSession: 'அமர்வை தொடர',
    darkMode: 'டார்க் மோட்',
    lightMode: 'லைட் மோட்',
    systemTheme: 'சிஸ்டம்',
    appearance: 'தோற்றம்',
  },
  te: {
    welcome: 'స్వాగతం',
    smartJanseva: 'స్మార్ట్ జన్‌సేవ',
    tagline: 'ఒక వేదిక, అన్ని సేవలు',
    login: 'లాగిన్',
    enterMobile: 'మొబైల్ నంబర్ నమోదు చేయండి',
    sendOtp: 'OTP పంపండి',
    verifyOtp: 'OTP ధృవీకరించండి',
    enterOtp: 'OTP నమోదు చేయండి',
    selectLanguage: 'భాష ఎంచుకోండి',
    dashboard: 'డాష్‌బోర్డ్',
    services: 'సేవలు',
    electricity: 'విద్యుత్',
    water: 'నీరు',
    gas: 'గ్యాస్',
    sanitation: 'పారిశుద్ధ్యం',
    municipal: 'మునిసిపల్',
    payBill: 'బిల్ చెల్లించు',
    viewBill: 'బిల్ చూడండి',
    grievance: 'ఫిర్యాదు',
    fileComplaint: 'ఫిర్యాదు చేయండి',
    trackStatus: 'స్థితి చూడండి',
    notifications: 'నోటిఫికేషన్లు',
    help: 'సహాయం',
    logout: 'లాగౌట్',
    hello: 'నమస్కారం',
    quickActions: 'త్వరిత చర్యలు',
    recentActivity: 'ఇటీవలి కార్యకలాపం',
    pendingPayments: 'పెండింగ్ చెల్లింపులు',
    activeComplaints: 'యాక్టివ్ ఫిర్యాదులు',
    admin: 'అడ్మిన్ ప్యానెల్',
    analytics: 'విశ్లేషణలు',
    users: 'వినియోగదారులు',
    complaints: 'ఫిర్యాదులు',
    reports: 'నివేదికలు',
    settings: 'సెట్టింగ్‌లు',
    totalUsers: 'మొత్తం వినియోగదారులు',
    totalTransactions: 'మొత్తం లావాదేవీలు',
    openComplaints: 'ఓపెన్ ఫిర్యాదులు',
    systemHealth: 'సిస్టమ్ ఆరోగ్యం',
    aiAssistant: 'AI సహాయకుడు',
    askQuestion: 'ప్రశ్న అడగండి...',
    offline: 'మీరు ఆఫ్‌లైన్‌లో ఉన్నారు',
    sessionTimeout: 'సెషన్ ముగుస్తుంది',
    continueSession: 'సెషన్ కొనసాగించు',
    darkMode: 'డార్క్ మోడ్',
    lightMode: 'లైట్ మోడ్',
    systemTheme: 'సిస్టమ్',
    appearance: 'రూపం',
  },
  bn: {
    welcome: 'স্বাগতম',
    smartJanseva: 'স্মার্ট জনসেবা',
    tagline: 'এক প্ল্যাটফর্ম, সব সেবা',
    login: 'লগইন',
    enterMobile: 'মোবাইল নম্বর দিন',
    sendOtp: 'OTP পাঠান',
    verifyOtp: 'OTP যাচাই করুন',
    enterOtp: 'OTP দিন',
    selectLanguage: 'ভাষা নির্বাচন করুন',
    dashboard: 'ড্যাশবোর্ড',
    services: 'সেবা',
    electricity: 'বিদ্যুৎ',
    water: 'জল',
    gas: 'গ্যাস',
    sanitation: 'স্যানিটেশন',
    municipal: 'মিউনিসিপ্যাল',
    payBill: 'বিল পরিশোধ',
    viewBill: 'বিল দেখুন',
    grievance: 'অভিযোগ',
    fileComplaint: 'অভিযোগ করুন',
    trackStatus: 'স্থিতি দেখুন',
    notifications: 'বিজ্ঞপ্তি',
    help: 'সাহায্য',
    logout: 'লগআউট',
    hello: 'নমস্কার',
    quickActions: 'দ্রুত কার্য',
    recentActivity: 'সাম্প্রতিক কার্যকলাপ',
    pendingPayments: 'মুলতুবি পেমেন্ট',
    activeComplaints: 'সক্রিয় অভিযোগ',
    admin: 'অ্যাডমিন প্যানেল',
    analytics: 'বিশ্লেষণ',
    users: 'ব্যবহারকারী',
    complaints: 'অভিযোগ',
    reports: 'রিপোর্ট',
    settings: 'সেটিংস',
    totalUsers: 'মোট ব্যবহারকারী',
    totalTransactions: 'মোট লেনদেন',
    openComplaints: 'খোলা অভিযোগ',
    systemHealth: 'সিস্টেম স্বাস্থ্য',
    aiAssistant: 'AI সহায়ক',
    askQuestion: 'প্রশ্ন জিজ্ঞাসা করুন...',
    offline: 'আপনি অফলাইনে আছেন',
    sessionTimeout: 'সেশন শেষ হবে',
    continueSession: 'সেশন চালিয়ে যান',
    darkMode: 'ডার্ক মোড',
    lightMode: 'লাইট মোড',
    systemTheme: 'সিস্টেম',
    appearance: 'চেহারা',
  },
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [user, setUser] = useState<User | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [showChatbot, setShowChatbot] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'system';
    }
    return 'system';
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    
    const applyTheme = () => {
      if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        root.classList.add('dark');
        setIsDarkMode(true);
      } else {
        root.classList.remove('dark');
        setIsDarkMode(false);
      }
    };

    applyTheme();
    localStorage.setItem('theme', theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme();
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        user,
        setUser,
        isOnline,
        setIsOnline,
        showChatbot,
        setShowChatbot,
        theme,
        setTheme,
        isDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export function useTranslation() {
  const { language } = useApp();
  return (key: string) => translations[language][key] || key;
}
