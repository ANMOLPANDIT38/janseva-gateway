import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Bell,
  AlertTriangle,
  Info,
  CheckCircle2,
  Calendar,
  Trash2,
  Check,
} from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '@/contexts/AppContext';
import GovHeader from '@/components/layout/GovHeader';
import AIChatbot from '@/components/chat/AIChatbot';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'alert';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Electricity Bill Due Soon',
    message: 'Your electricity bill of ₹1,250 is due on 15th February. Pay now to avoid late fees.',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    type: 'info',
    title: 'Scheduled Water Maintenance',
    message: 'Water supply will be interrupted on 18th Feb from 10 AM to 2 PM for pipeline maintenance in Sector 12.',
    time: '5 hours ago',
    read: false,
  },
  {
    id: '3',
    type: 'success',
    title: 'Complaint Resolved',
    message: 'Your complaint GRV-2024-0098 regarding streetlight has been resolved. Please provide feedback.',
    time: '1 day ago',
    read: true,
  },
  {
    id: '4',
    type: 'alert',
    title: 'Gas Leak Alert',
    message: 'If you smell gas, please call emergency helpline 1906 immediately. Do not use electrical switches.',
    time: '2 days ago',
    read: true,
  },
  {
    id: '5',
    type: 'info',
    title: 'New Feature: AI Assistant',
    message: 'Try our new AI assistant for 24/7 help with bill payments, complaints, and service requests.',
    time: '3 days ago',
    read: true,
  },
  {
    id: '6',
    type: 'success',
    title: 'Payment Successful',
    message: 'Your water bill payment of ₹380 was successful. Transaction ID: TXN1234567890',
    time: '1 week ago',
    read: true,
  },
];

export default function NotificationsPage() {
  const t = useTranslation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-secondary" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-accent" />;
      case 'alert':
        return <AlertTriangle className="w-5 h-5 text-destructive" />;
      default:
        return <Info className="w-5 h-5 text-info" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-secondary/10 border-l-secondary';
      case 'success':
        return 'bg-accent/10 border-l-accent';
      case 'alert':
        return 'bg-destructive/10 border-l-destructive';
      default:
        return 'bg-info/10 border-l-info';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GovHeader />

      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  {t('notifications')}
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 text-sm bg-secondary text-secondary-foreground rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </h1>
                <p className="text-sm text-muted-foreground">Stay updated with alerts & announcements</p>
              </div>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
              >
                <Check className="w-4 h-4" />
                Mark all read
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'unread' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="bg-card rounded-xl p-12 text-center">
                <Bell className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                <p className="text-lg font-medium text-muted-foreground">No notifications</p>
                <p className="text-sm text-muted-foreground">You're all caught up!</p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`bg-card rounded-xl p-4 border-l-4 ${getBgColor(notification.type)} ${
                    !notification.read ? 'shadow-md' : 'opacity-80'
                  }`}
                >
                  <div className="flex gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      notification.type === 'warning' ? 'bg-secondary/20' :
                      notification.type === 'success' ? 'bg-accent/20' :
                      notification.type === 'alert' ? 'bg-destructive/20' :
                      'bg-info/20'
                    }`}>
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className={`font-semibold ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center gap-2 shrink-0">
                          {!notification.read && (
                            <span className="w-2 h-2 bg-secondary rounded-full" />
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {notification.time}
                        </span>
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs text-primary font-medium hover:underline"
                          >
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </main>

      <AIChatbot />
    </div>
  );
}
