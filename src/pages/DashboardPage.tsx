import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Zap,
  Droplets,
  Flame,
  Trash2,
  Building2,
  CreditCard,
  FileText,
  AlertTriangle,
  MapPin,
  Clock,
  TrendingUp,
  Bell,
  ChevronRight,
  Calendar,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useApp, useTranslation } from '@/contexts/AppContext';
import GovHeader from '@/components/layout/GovHeader';
import AIChatbot from '@/components/chat/AIChatbot';

const departments = [
  {
    id: 'electricity',
    icon: Zap,
    color: 'bg-yellow-500',
    borderClass: 'dept-card-electricity',
    pending: '₹1,250',
    dueDate: '15 Feb',
  },
  {
    id: 'water',
    icon: Droplets,
    color: 'bg-blue-500',
    borderClass: 'dept-card-water',
    pending: '₹450',
    dueDate: '20 Feb',
  },
  {
    id: 'gas',
    icon: Flame,
    color: 'bg-orange-500',
    borderClass: 'dept-card-gas',
    pending: null,
    dueDate: null,
  },
  {
    id: 'sanitation',
    icon: Trash2,
    color: 'bg-green-500',
    borderClass: 'dept-card-sanitation',
    pending: null,
    dueDate: null,
  },
  {
    id: 'municipal',
    icon: Building2,
    color: 'bg-purple-500',
    borderClass: 'dept-card-municipal',
    pending: '₹2,100',
    dueDate: '28 Feb',
  },
];

const quickActions = [
  { id: 'payBill', icon: CreditCard, route: '/services/payments' },
  { id: 'fileComplaint', icon: AlertTriangle, route: '/grievances/new' },
  { id: 'trackStatus', icon: MapPin, route: '/grievances' },
  { id: 'viewBill', icon: FileText, route: '/services/bills' },
];

const recentActivities = [
  {
    id: 1,
    type: 'payment',
    title: 'Electricity Bill Paid',
    amount: '₹1,450',
    date: '2 days ago',
    status: 'success',
    icon: CheckCircle2,
  },
  {
    id: 2,
    type: 'complaint',
    title: 'Water Supply Complaint',
    reference: 'GRV-2024-0123',
    date: '5 days ago',
    status: 'pending',
    icon: Clock,
  },
  {
    id: 3,
    type: 'application',
    title: 'Property Tax Assessment',
    reference: 'APP-2024-0456',
    date: '1 week ago',
    status: 'review',
    icon: AlertCircle,
  },
];

const notifications = [
  {
    id: 1,
    title: 'Water Supply Maintenance',
    message: 'Scheduled maintenance on 18th Feb, 10 AM - 2 PM',
    type: 'info',
    time: '2 hours ago',
  },
  {
    id: 2,
    title: 'Electricity Bill Due',
    message: 'Your electricity bill of ₹1,250 is due on 15th Feb',
    type: 'warning',
    time: '1 day ago',
  },
];

export default function DashboardPage() {
  const { user } = useApp();
  const t = useTranslation();
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
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

      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 md:space-y-8"
        >
          {/* Welcome Section */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {t('hello')}, {user?.name || 'Citizen'} 👋
              </h1>
              <p className="text-muted-foreground mt-1">
                {t('dashboard')} • Last login: Today, 10:30 AM
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/notifications')}
                className="p-3 rounded-xl bg-card shadow-sm border relative hover:shadow-md transition-shadow"
              >
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-secondary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              </button>
            </div>
          </motion.div>

          {/* Stats Overview */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="stats-card stats-card-secondary">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-secondary" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{t('pendingPayments')}</p>
              <p className="text-2xl font-bold text-foreground mt-1">₹3,800</p>
            </div>
            <div className="stats-card stats-card-primary">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{t('activeComplaints')}</p>
              <p className="text-2xl font-bold text-foreground mt-1">2</p>
            </div>
            <div className="stats-card stats-card-accent">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">This Month Usage</p>
              <p className="text-2xl font-bold text-foreground mt-1">142 kWh</p>
            </div>
            <div className="stats-card stats-card-info">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-info" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Next Due Date</p>
              <p className="text-2xl font-bold text-foreground mt-1">15 Feb</p>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants}>
            <h2 className="text-lg font-semibold text-foreground mb-4">{t('quickActions')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <motion.button
                  key={action.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(action.route)}
                  className="quick-action-btn"
                >
                  <action.icon className="w-7 h-7" />
                  <span className="text-sm font-medium">{t(action.id)}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Department Services */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">{t('services')}</h2>
              <button
                onClick={() => navigate('/services')}
                className="text-sm text-primary font-medium flex items-center gap-1 hover:underline"
              >
                View All
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {departments.map((dept) => (
                <motion.div
                  key={dept.id}
                  whileHover={{ y: -4 }}
                  className={`dept-card ${dept.borderClass} cursor-pointer`}
                  onClick={() => navigate(`/services/${dept.id}`)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl ${dept.color} bg-opacity-10 flex items-center justify-center`}>
                        <dept.icon className={`w-6 h-6 ${dept.color.replace('bg-', 'text-')}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{t(dept.id)}</h3>
                        {dept.pending ? (
                          <p className="text-sm text-muted-foreground">
                            Due: {dept.pending} by {dept.dueDate}
                          </p>
                        ) : (
                          <p className="text-sm text-accent">No pending dues</p>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <motion.div variants={itemVariants} className="bg-card rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">{t('recentActivity')}</h2>
                <button className="text-sm text-primary font-medium hover:underline">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      activity.status === 'success' ? 'bg-accent/10 text-accent' :
                      activity.status === 'pending' ? 'bg-secondary/10 text-secondary' :
                      'bg-info/10 text-info'
                    }`}>
                      <activity.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.amount || activity.reference}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {activity.date}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Notifications */}
            <motion.div variants={itemVariants} className="bg-card rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">{t('notifications')}</h2>
                <button className="text-sm text-primary font-medium hover:underline">
                  Mark all read
                </button>
              </div>
              <div className="space-y-4">
                {notifications.map((notif) => (
                  <div key={notif.id} className={`p-4 rounded-lg border-l-4 ${
                    notif.type === 'warning' ? 'border-l-secondary bg-secondary/5' : 'border-l-info bg-info/5'
                  }`}>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-foreground">{notif.title}</h4>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {notif.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <AIChatbot />
    </div>
  );
}
