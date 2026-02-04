import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, Shield, ChevronLeft } from 'lucide-react';
import { useApp, useTranslation } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import GovHeader from '@/components/layout/GovHeader';

type Language = 'en' | 'hi' | 'mr' | 'ta' | 'te' | 'bn';

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
];

export default function LoginPage() {
  const { language, setLanguage, setUser } = useApp();
  const t = useTranslation();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<'language' | 'phone' | 'otp'>('language');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLanguageSelect = (code: Language) => {
    setLanguage(code);
    setStep('phone');
  };

  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate OTP send
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setStep('otp');
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter the complete OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate verification
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock login success
    setUser({
      id: '1',
      phone: phone,
      name: 'Citizen User',
      isAdmin: false,
    });

    setIsLoading(false);
    navigate('/dashboard');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GovHeader />

      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          {/* Language Selection */}
          {step === 'language' && (
            <motion.div variants={itemVariants} className="bg-card rounded-2xl shadow-xl p-6 md:p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-12 h-12 text-secondary"
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
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  SMART JANSEVA
                </h1>
                <p className="text-muted-foreground">
                  One Platform, All Services
                </p>
              </div>

              <h2 className="text-lg font-semibold text-center mb-6">
                {t('selectLanguage')} / भाषा चुनें
              </h2>

              <div className="grid grid-cols-2 gap-3">
                {languages.map((lang) => (
                  <motion.button
                    key={lang.code}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLanguageSelect(lang.code as Language)}
                    className={`lang-btn flex flex-col items-center py-4 ${
                      language === lang.code ? 'lang-btn-active' : ''
                    }`}
                  >
                    <span className="text-lg font-semibold">{lang.native}</span>
                    <span className="text-sm opacity-70">{lang.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Phone Number Entry */}
          {step === 'phone' && (
            <motion.div variants={itemVariants} className="bg-card rounded-2xl shadow-xl p-6 md:p-8">
              <button
                onClick={() => setStep('language')}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                {t('selectLanguage')}
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Phone className="w-8 h-8 text-accent" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  {t('login')}
                </h2>
                <p className="text-muted-foreground">
                  {t('enterMobile')}
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center border-2 rounded-xl overflow-hidden focus-within:border-primary transition-colors">
                    <span className="px-4 py-4 bg-muted text-muted-foreground font-medium border-r">
                      +91
                    </span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setPhone(value);
                        setError('');
                      }}
                      placeholder="9876543210"
                      className="flex-1 px-4 py-4 text-lg font-medium bg-transparent focus:outline-none"
                    />
                  </div>
                  {error && (
                    <p className="text-destructive text-sm mt-2">{error}</p>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSendOtp}
                  disabled={isLoading || phone.length !== 10}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <>
                      {t('sendOtp')}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
                  <Shield className="w-4 h-4" />
                  <span>Your data is secure with 256-bit encryption</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* OTP Verification */}
          {step === 'otp' && (
            <motion.div variants={itemVariants} className="bg-card rounded-2xl shadow-xl p-6 md:p-8">
              <button
                onClick={() => setStep('phone')}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Change Number
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-secondary" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  {t('verifyOtp')}
                </h2>
                <p className="text-muted-foreground">
                  {t('enterOtp')} sent to +91 {phone}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex justify-center gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="tel"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !digit && index > 0) {
                          const prevInput = document.getElementById(`otp-${index - 1}`);
                          prevInput?.focus();
                        }
                      }}
                      className="otp-input"
                    />
                  ))}
                </div>

                {error && (
                  <p className="text-destructive text-sm text-center">{error}</p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleVerifyOtp}
                  disabled={isLoading || otp.join('').length !== 6}
                  className="btn-success w-full flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      {t('verifyOtp')}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                <button className="w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors">
                  Didn't receive OTP? <span className="font-medium text-secondary">Resend</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Footer */}
          <motion.div variants={itemVariants} className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              A Digital India Initiative
            </p>
            <div className="flex items-center justify-center gap-4 mt-2 text-xs text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-colors">
                Help
              </a>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
