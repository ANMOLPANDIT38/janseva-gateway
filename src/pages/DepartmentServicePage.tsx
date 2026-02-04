import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Zap,
  Droplets,
  Flame,
  Trash2,
  Building2,
  ChevronLeft,
  CreditCard,
  FileText,
  History,
  PlusCircle,
  AlertTriangle,
  Download,
  CheckCircle,
  Receipt,
} from 'lucide-react';
import { useTranslation } from '@/contexts/AppContext';
import GovHeader from '@/components/layout/GovHeader';
import AIChatbot from '@/components/chat/AIChatbot';

const departmentData = {
  electricity: {
    icon: Zap,
    color: 'yellow',
    consumerNo: 'ELEC-2024-789456',
    currentBill: 1250,
    dueDate: '15 Feb 2024',
    lastPayment: '₹1,450 on 15 Jan 2024',
    usage: '142 kWh',
    status: 'unpaid',
  },
  water: {
    icon: Droplets,
    color: 'blue',
    consumerNo: 'WTR-2024-123456',
    currentBill: 450,
    dueDate: '20 Feb 2024',
    lastPayment: '₹380 on 20 Jan 2024',
    usage: '12,500 L',
    status: 'unpaid',
  },
  gas: {
    icon: Flame,
    color: 'orange',
    consumerNo: 'GAS-2024-654321',
    currentBill: 0,
    dueDate: '-',
    lastPayment: '₹890 on 10 Jan 2024',
    usage: '8 Kg',
    status: 'paid',
  },
  sanitation: {
    icon: Trash2,
    color: 'green',
    consumerNo: 'SAN-2024-987654',
    currentBill: 0,
    dueDate: '-',
    lastPayment: '₹200 on 01 Jan 2024',
    usage: '-',
    status: 'paid',
  },
  municipal: {
    icon: Building2,
    color: 'purple',
    consumerNo: 'MUN-2024-456789',
    currentBill: 2100,
    dueDate: '28 Feb 2024',
    lastPayment: '₹2,100 on 28 Jan 2024',
    usage: '-',
    status: 'unpaid',
  },
};

const serviceActions = [
  { id: 'payBill', icon: CreditCard, label: 'Pay Bill' },
  { id: 'viewBill', icon: FileText, label: 'View Bills' },
  { id: 'history', icon: History, label: 'Payment History' },
  { id: 'newConnection', icon: PlusCircle, label: 'New Connection' },
  { id: 'complaint', icon: AlertTriangle, label: 'Report Issue' },
  { id: 'download', icon: Download, label: 'Download Receipt' },
];

export default function DepartmentServicePage() {
  const { department } = useParams<{ department: string }>();
  const t = useTranslation();
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const dept = departmentData[department as keyof typeof departmentData];
  const Icon = dept?.icon || Zap;

  if (!dept) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Service not found</p>
      </div>
    );
  }

  const handlePayment = () => {
    setShowPayment(true);
    // Simulate payment
    setTimeout(() => {
      setPaymentSuccess(true);
    }, 2000);
  };

  const colorClasses = {
    yellow: 'bg-yellow-500 text-yellow-500 bg-yellow-500/10 border-yellow-500',
    blue: 'bg-blue-500 text-blue-500 bg-blue-500/10 border-blue-500',
    orange: 'bg-orange-500 text-orange-500 bg-orange-500/10 border-orange-500',
    green: 'bg-green-500 text-green-500 bg-green-500/10 border-green-500',
    purple: 'bg-purple-500 text-purple-500 bg-purple-500/10 border-purple-500',
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GovHeader />

      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Back Button & Title */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl ${colorClasses[dept.color].split(' ')[2]} flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${colorClasses[dept.color].split(' ')[1]}`} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{t(department || '')}</h1>
                <p className="text-sm text-muted-foreground">{t('services')}</p>
              </div>
            </div>
          </div>

          {/* Account Summary Card */}
          <div className="bg-card rounded-xl shadow-md overflow-hidden">
            <div className={`${colorClasses[dept.color].split(' ')[0]} p-4 text-white`}>
              <p className="text-sm opacity-90">Consumer Number</p>
              <p className="text-xl font-bold">{dept.consumerNo}</p>
            </div>
            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Current Bill</p>
                <p className="text-2xl font-bold text-foreground">
                  {dept.currentBill > 0 ? `₹${dept.currentBill.toLocaleString()}` : 'No Dues'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Due Date</p>
                <p className="text-lg font-semibold text-foreground">{dept.dueDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Payment</p>
                <p className="text-lg font-semibold text-foreground">{dept.lastPayment}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Usage</p>
                <p className="text-lg font-semibold text-foreground">{dept.usage}</p>
              </div>
            </div>
            {dept.currentBill > 0 && (
              <div className="px-6 pb-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePayment}
                  className="btn-secondary w-full md:w-auto"
                >
                  <CreditCard className="w-5 h-5 mr-2 inline" />
                  Pay ₹{dept.currentBill.toLocaleString()} Now
                </motion.button>
              </div>
            )}
          </div>

          {/* Service Actions */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {serviceActions.map((action) => (
                <motion.button
                  key={action.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (action.id === 'complaint') {
                      navigate('/grievances/new');
                    } else if (action.id === 'payBill' && dept.currentBill > 0) {
                      handlePayment();
                    }
                  }}
                  className="quick-action-btn"
                >
                  <action.icon className="w-6 h-6" />
                  <span className="text-sm font-medium text-center">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Usage History Chart Placeholder */}
          <div className="bg-card rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Consumption History</h2>
            <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg">
              <div className="text-center text-muted-foreground">
                <History className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Usage chart will appear here</p>
                <p className="text-sm">Last 6 months consumption data</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card rounded-2xl shadow-2xl max-w-md w-full p-6"
          >
            {!paymentSuccess ? (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                  <CreditCard className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Processing Payment</h3>
                <p className="text-muted-foreground mb-6">
                  Please wait while we process your payment of ₹{dept.currentBill.toLocaleString()}
                </p>
                <div className="w-12 h-12 mx-auto border-4 border-secondary/30 border-t-secondary rounded-full animate-spin" />
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Payment Successful!</h3>
                <p className="text-muted-foreground mb-2">
                  ₹{dept.currentBill.toLocaleString()} paid successfully
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Transaction ID: TXN{Date.now().toString().slice(-10)}
                </p>
                
                {/* Receipt Preview */}
                <div className="bg-muted rounded-lg p-4 text-left mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Receipt className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Payment Receipt</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service</span>
                      <span className="font-medium">{t(department || '')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Consumer No</span>
                      <span className="font-medium">{dept.consumerNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount</span>
                      <span className="font-medium">₹{dept.currentBill.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium">{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowPayment(false);
                      setPaymentSuccess(false);
                    }}
                    className="btn-outline flex-1"
                  >
                    Close
                  </button>
                  <button className="btn-primary flex-1">
                    <Download className="w-5 h-5 mr-2 inline" />
                    Download
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}

      <AIChatbot />
    </div>
  );
}
