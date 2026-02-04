import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  AlertTriangle,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  XCircle,
  Send,
  FileText,
  Activity,
  Database,
  Server,
  Wifi,
  Menu,
  X,
} from 'lucide-react';
import { useApp, useTranslation } from '@/contexts/AppContext';

const statsCards = [
  {
    title: 'Total Users',
    value: '1,24,568',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    color: 'primary',
  },
  {
    title: 'Total Transactions',
    value: '₹2.4 Cr',
    change: '+8.2%',
    trend: 'up',
    icon: BarChart3,
    color: 'secondary',
  },
  {
    title: 'Open Complaints',
    value: '1,234',
    change: '-5.3%',
    trend: 'down',
    icon: AlertTriangle,
    color: 'accent',
  },
  {
    title: 'System Uptime',
    value: '99.9%',
    change: 'Healthy',
    trend: 'up',
    icon: Activity,
    color: 'info',
  },
];

const recentComplaints = [
  {
    id: 'GRV-2024-1234',
    title: 'Water supply issue in Sector 12',
    department: 'Water',
    status: 'pending',
    priority: 'high',
    time: '10 min ago',
  },
  {
    id: 'GRV-2024-1233',
    title: 'Electricity meter not working',
    department: 'Electricity',
    status: 'in_progress',
    priority: 'medium',
    time: '25 min ago',
  },
  {
    id: 'GRV-2024-1232',
    title: 'Garbage not collected for 3 days',
    department: 'Sanitation',
    status: 'pending',
    priority: 'high',
    time: '1 hour ago',
  },
  {
    id: 'GRV-2024-1231',
    title: 'Street light repair needed',
    department: 'Municipal',
    status: 'resolved',
    priority: 'low',
    time: '2 hours ago',
  },
  {
    id: 'GRV-2024-1230',
    title: 'Gas leakage complaint',
    department: 'Gas',
    status: 'in_progress',
    priority: 'urgent',
    time: '3 hours ago',
  },
];

const systemHealth = [
  { name: 'Database', status: 'healthy', uptime: '99.99%', icon: Database },
  { name: 'API Server', status: 'healthy', uptime: '99.95%', icon: Server },
  { name: 'Network', status: 'warning', uptime: '98.5%', icon: Wifi },
];

const sidebarItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'users', icon: Users, label: 'Users' },
  { id: 'complaints', icon: AlertTriangle, label: 'Complaints' },
  { id: 'reports', icon: FileText, label: 'Reports' },
  { id: 'analytics', icon: BarChart3, label: 'Analytics' },
  { id: 'notifications', icon: Bell, label: 'Broadcasts' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export default function AdminDashboardPage() {
  const { setUser } = useApp();
  const t = useTranslation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return <span className="status-badge status-badge-success"><CheckCircle2 className="w-3 h-3" /> Resolved</span>;
      case 'in_progress':
        return <span className="status-badge status-badge-info"><Clock className="w-3 h-3" /> In Progress</span>;
      case 'pending':
        return <span className="status-badge status-badge-pending"><Clock className="w-3 h-3" /> Pending</span>;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      urgent: 'bg-red-100 text-red-800',
      high: 'bg-orange-100 text-orange-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800',
    };
    return (
      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors[priority as keyof typeof colors] || colors.low}`}>
        {priority.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar text-sidebar-foreground transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                </svg>
              </div>
              <div>
                <h1 className="font-bold text-lg">SMART JANSEVA</h1>
                <p className="text-xs text-sidebar-foreground/70">Admin Portal</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* User & Logout */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">Admin User</p>
                <p className="text-xs text-sidebar-foreground/70">Super Admin</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-300 hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-card border-b shadow-sm">
          <div className="flex items-center justify-between px-4 lg:px-6 h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-muted"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <h1 className="text-xl font-bold text-foreground">
                {sidebarItems.find(i => i.id === activeSection)?.label || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-muted relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-secondary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  5
                </span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-6 space-y-6">
          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {statsCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`stats-card stats-card-${stat.color}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    <div className={`flex items-center gap-1 mt-2 text-sm ${
                      stat.trend === 'up' ? 'text-accent' : 'text-destructive'
                    }`}>
                      {stat.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-${stat.color}/10 flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Complaints Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 bg-card rounded-xl shadow-md"
            >
              <div className="p-4 lg:p-6 border-b flex items-center justify-between">
                <h2 className="font-semibold text-lg">Recent Complaints</h2>
                <button className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">ID</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Title</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Department</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Priority</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentComplaints.map((complaint) => (
                      <tr key={complaint.id} className="border-t hover:bg-muted/30 transition-colors cursor-pointer">
                        <td className="p-4 text-sm font-mono text-muted-foreground">{complaint.id}</td>
                        <td className="p-4 text-sm font-medium text-foreground max-w-[200px] truncate">{complaint.title}</td>
                        <td className="p-4 text-sm">{complaint.department}</td>
                        <td className="p-4">{getPriorityBadge(complaint.priority)}</td>
                        <td className="p-4">{getStatusBadge(complaint.status)}</td>
                        <td className="p-4 text-sm text-muted-foreground whitespace-nowrap">{complaint.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* System Health */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-xl shadow-md p-6"
              >
                <h2 className="font-semibold text-lg mb-4">System Health</h2>
                <div className="space-y-4">
                  {systemHealth.map((system) => (
                    <div key={system.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          system.status === 'healthy' ? 'bg-accent/10 text-accent' : 'bg-warning/10 text-warning'
                        }`}>
                          <system.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{system.name}</p>
                          <p className="text-xs text-muted-foreground">Uptime: {system.uptime}</p>
                        </div>
                      </div>
                      <span className={`w-3 h-3 rounded-full ${
                        system.status === 'healthy' ? 'bg-accent' : 'bg-warning animate-pulse'
                      }`} />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Broadcast Notification */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card rounded-xl shadow-md p-6"
              >
                <h2 className="font-semibold text-lg mb-4">Send Broadcast</h2>
                <div className="space-y-4">
                  <textarea
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    placeholder="Type notification message..."
                    rows={3}
                    className="w-full px-4 py-3 bg-muted rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button className="btn-primary w-full flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    Send to All Users
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Charts Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-card rounded-xl shadow-md p-6">
              <h2 className="font-semibold text-lg mb-4">Department-wise Complaints</h2>
              <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Bar Chart Placeholder</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl shadow-md p-6">
              <h2 className="font-semibold text-lg mb-4">Transaction Trends</h2>
              <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg">
                <div className="text-center text-muted-foreground">
                  <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Line Chart Placeholder</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
