import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  User,
  Phone,
  MapPin,
  Lock,
  Globe,
  Bell,
  Moon, 
  Sun,
  Smartphone,
  HelpCircle,
  FileText,
  Shield,
  ChevronRight,
  Edit2,
  Check,
  QrCode,
  LogOut,
} from 'lucide-react';
import { useApp, useTranslation } from '@/contexts/AppContext';
import GovHeader from '@/components/layout/GovHeader';
import AIChatbot from '@/components/chat/AIChatbot';
import ThemeToggle from '@/components/ui/ThemeToggle';

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
];

type Language = 'en' | 'hi' | 'mr' | 'ta' | 'te' | 'bn';

export default function SettingsPage() {
  const { user, setUser, language, setLanguage } = useApp();
  const t = useTranslation();
  const navigate = useNavigate();
  
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || 'Citizen User',
    phone: user?.phone || '9876543210',
    email: 'user@example.com',
    address: 'Sector 12, Block B, Smart City',
  });
  const [notifications, setNotifications] = useState({
    sms: true,
    push: true,
    email: false,
    billReminders: true,
    complaintUpdates: true,
    announcements: true,
  });

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const settingSections = [
    {
      id: 'profile',
      icon: User,
      title: 'Profile Information',
      description: 'Manage your personal details',
    },
    {
      id: 'language',
      icon: Globe,
      title: 'Language',
      description: languages.find(l => l.code === language)?.native || 'English',
    },
    {
      id: 'notifications',
      icon: Bell,
      title: 'Notification Preferences',
      description: 'Control how you receive updates',
    },
    {
      id: 'security',
      icon: Lock,
      title: 'Security & Privacy',
      description: 'Password, 2FA, and data settings',
    },
    {
      id: 'devices',
      icon: Smartphone,
      title: 'Linked Devices',
      description: 'Manage kiosk and mobile sessions',
    },
    {
      id: 'qr',
      icon: QrCode,
      title: 'QR Session Transfer',
      description: 'Continue session on another device',
    },
    {
      id: 'appearance',
      icon: Moon,
      title: 'Appearance',
      description: 'Light, dark, or system theme',
    },
  ];

  const supportSections = [
    { id: 'help', icon: HelpCircle, title: 'Help & Support', route: '/help' },
    { id: 'terms', icon: FileText, title: 'Terms of Service' },
    { id: 'privacy', icon: Shield, title: 'Privacy Policy' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GovHeader />

      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto space-y-6"
        >
          {/* Header */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => activeSection ? setActiveSection(null) : navigate('/dashboard')}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {activeSection ? settingSections.find(s => s.id === activeSection)?.title || t('settings') : t('settings')}
              </h1>
              <p className="text-sm text-muted-foreground">
                {activeSection ? 'Configure your preferences' : 'Manage your account settings'}
              </p>
            </div>
          </div>

          {/* Main Settings List */}
          {!activeSection && (
            <>
              {/* User Card */}
              <div className="bg-card rounded-xl shadow-md p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-foreground">{profile.name}</h2>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      +91 {profile.phone}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveSection('profile')}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Edit2 className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Settings Sections */}
              <div className="bg-card rounded-xl shadow-md divide-y">
                {settingSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors text-left"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{section.title}</p>
                      <p className="text-sm text-muted-foreground truncate">{section.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                ))}
              </div>

              {/* Support Sections */}
              <div className="bg-card rounded-xl shadow-md divide-y">
                {supportSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => section.route && navigate(section.route)}
                    className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors text-left"
                  >
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <span className="font-medium text-foreground">{section.title}</span>
                    <ChevronRight className="w-5 h-5 text-muted-foreground ml-auto" />
                  </button>
                ))}
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">{t('logout')}</span>
              </button>

              {/* Version Info */}
              <p className="text-center text-sm text-muted-foreground">
                SMART JANSEVA v1.0.0 • Digital India Initiative
              </p>
            </>
          )}

          {/* Profile Section */}
          {activeSection === 'profile' && (
            <div className="bg-card rounded-xl shadow-md p-6 space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-12 h-12 text-primary" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="gov-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Mobile Number</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="tel"
                      value={`+91 ${profile.phone}`}
                      disabled
                      className="gov-input bg-muted"
                    />
                    <button className="btn-outline shrink-0">Change</button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email (Optional)</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="gov-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                  <textarea
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    rows={2}
                    className="gov-input resize-none"
                  />
                </div>
              </div>

              <button className="btn-success w-full">
                <Check className="w-5 h-5 mr-2 inline" />
                Save Changes
              </button>
            </div>
          )}

          {/* Language Section */}
          {activeSection === 'language' && (
            <div className="bg-card rounded-xl shadow-md p-6">
              <p className="text-muted-foreground mb-4">Select your preferred language for the application</p>
              <div className="grid grid-cols-2 gap-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as Language)}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      language === lang.code
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <span className="text-lg font-semibold block">{lang.native}</span>
                    <span className="text-sm text-muted-foreground">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Notifications Section */}
          {activeSection === 'notifications' && (
            <div className="bg-card rounded-xl shadow-md divide-y">
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-1">Notification Channels</h3>
                <p className="text-sm text-muted-foreground">Choose how you want to receive updates</p>
              </div>
              {[
                { key: 'sms', label: 'SMS Notifications' },
                { key: 'push', label: 'Push Notifications' },
                { key: 'email', label: 'Email Notifications' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4">
                  <span className="font-medium text-foreground">{item.label}</span>
                  <button
                    onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                    className={`w-12 h-7 rounded-full transition-colors relative ${
                      notifications[item.key as keyof typeof notifications] ? 'bg-accent' : 'bg-muted'
                    }`}
                  >
                    <span className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform shadow ${
                      notifications[item.key as keyof typeof notifications] ? 'right-1' : 'left-1'
                    }`} />
                  </button>
                </div>
              ))}
              
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-1">Notification Types</h3>
                <p className="text-sm text-muted-foreground">Control what notifications you receive</p>
              </div>
              {[
                { key: 'billReminders', label: 'Bill Reminders' },
                { key: 'complaintUpdates', label: 'Complaint Updates' },
                { key: 'announcements', label: 'Public Announcements' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4">
                  <span className="font-medium text-foreground">{item.label}</span>
                  <button
                    onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                    className={`w-12 h-7 rounded-full transition-colors relative ${
                      notifications[item.key as keyof typeof notifications] ? 'bg-accent' : 'bg-muted'
                    }`}
                  >
                    <span className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform shadow ${
                      notifications[item.key as keyof typeof notifications] ? 'right-1' : 'left-1'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* QR Session Transfer */}
          {activeSection === 'qr' && (
            <div className="bg-card rounded-xl shadow-md p-6 text-center">
              <div className="w-48 h-48 mx-auto mb-6 bg-muted rounded-xl flex items-center justify-center">
                <QrCode className="w-24 h-24 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Scan to Continue</h3>
              <p className="text-muted-foreground mb-6">
                Scan this QR code with your mobile device to continue your session seamlessly
              </p>
              <p className="text-sm text-muted-foreground">
                QR Code expires in <span className="font-mono text-foreground">04:59</span>
              </p>
            </div>
          )}

          {/* Appearance Section */}
          {activeSection === 'appearance' && (
            <div className="bg-card rounded-xl shadow-md p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Theme</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Choose how the application looks. Select system to match your device settings.
                </p>
                <ThemeToggle />
              </div>
              
              <div className="border-t pt-6">
                <h3 className="font-semibold text-foreground mb-2">Preview</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-background border">
                    <div className="flex items-center gap-2 mb-2">
                      <Sun className="w-5 h-5 text-secondary" />
                      <span className="font-medium">Light Mode</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Best for daytime use and well-lit environments
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-sidebar text-sidebar-foreground border border-sidebar-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Moon className="w-5 h-5" />
                      <span className="font-medium">Dark Mode</span>
                    </div>
                    <p className="text-sm opacity-70">
                      Reduces eye strain in low-light conditions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </main>

      <AIChatbot />
    </div>
  );
}
