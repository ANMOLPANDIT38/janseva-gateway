import { WifiOff } from 'lucide-react';
import { useApp, useTranslation } from '@/contexts/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function OfflineBanner() {
  const { isOnline } = useApp();
  const t = useTranslation();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="offline-banner flex items-center justify-center gap-2"
        >
          <WifiOff className="w-4 h-4" />
          <span className="text-sm font-medium">{t('offline')}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
