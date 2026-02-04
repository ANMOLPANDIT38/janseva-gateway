import { motion } from 'framer-motion';
import { Globe, User, LogOut, Menu, Bell } from 'lucide-react';
import { useApp, useTranslation, translations } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
];

export default function GovHeader() {
  const { language, setLanguage, user, setUser } = useApp();
  const t = useTranslation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Tricolor Banner */}
      <div className="gov-header-tricolor" />
      
      {/* Main Header */}
      <div className="gov-header">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              {/* Ashoka Chakra Icon */}
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-8 h-8 md:w-10 md:h-10 text-secondary"
                  fill="currentColor"
                >
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                  {[...Array(24)].map((_, i) => (
                    <line
                      key={i}
                      x1="12"
                      y1="4"
                      x2="12"
                      y2="6"
                      stroke="currentColor"
                      strokeWidth="1"
                      transform={`rotate(${i * 15} 12 12)`}
                    />
                  ))}
                </svg>
              </div>
              
              <div className="hidden sm:block">
                <h1 className="text-lg md:text-xl font-bold tracking-wide">
                  {t('smartJanseva')}
                </h1>
                <p className="text-xs md:text-sm text-white/70">
                  {t('tagline')}
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  <Globe className="w-5 h-5" />
                  <span className="text-sm">
                    {languages.find((l) => l.code === language)?.native}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[160px]">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code as any)}
                      className={`cursor-pointer ${
                        language === lang.code ? 'bg-primary/10 text-primary' : ''
                      }`}
                    >
                      <span className="font-medium">{lang.native}</span>
                      <span className="ml-2 text-muted-foreground text-sm">
                        ({lang.name})
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {user && (
                <>
                  {/* Notifications */}
                  <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-xs font-bold rounded-full flex items-center justify-center">
                      3
                    </span>
                  </button>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                      <User className="w-5 h-5" />
                      <span className="text-sm max-w-[100px] truncate">
                        {user.name}
                      </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                        {t('dashboard')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/notifications')}>
                        {t('notifications')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/settings')}>
                        {t('settings')}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-destructive focus:text-destructive"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        {t('logout')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-card border-b shadow-lg"
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Language Selection */}
            <div className="grid grid-cols-3 gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as any);
                    setMobileMenuOpen(false);
                  }}
                  className={`lang-btn text-sm ${
                    language === lang.code ? 'lang-btn-active' : ''
                  }`}
                >
                  {lang.native}
                </button>
              ))}
            </div>

            {user && (
              <div className="border-t pt-4 space-y-2">
                <button
                  onClick={() => {
                    navigate('/notifications');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-muted transition-colors flex items-center gap-3"
                >
                  <Bell className="w-5 h-5" />
                  {t('notifications')}
                  <span className="ml-auto bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                    3
                  </span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-destructive/10 text-destructive transition-colors flex items-center gap-3"
                >
                  <LogOut className="w-5 h-5" />
                  {t('logout')}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
}
