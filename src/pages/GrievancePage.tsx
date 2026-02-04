import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  PlusCircle,
  Search,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Filter,
  MapPin,
  Calendar,
  ChevronRight,
  Camera,
  Upload,
  MessageSquare,
} from 'lucide-react';
import { useTranslation } from '@/contexts/AppContext';
import GovHeader from '@/components/layout/GovHeader';
import AIChatbot from '@/components/chat/AIChatbot';

const existingGrievances = [
  {
    id: 'GRV-2024-0123',
    title: 'Water Supply Interrupted',
    department: 'Water',
    status: 'in_progress',
    date: '28 Jan 2024',
    lastUpdate: '2 days ago',
    location: 'Sector 12, Block B',
  },
  {
    id: 'GRV-2024-0098',
    title: 'Streetlight Not Working',
    department: 'Municipal',
    status: 'resolved',
    date: '15 Jan 2024',
    lastUpdate: '1 week ago',
    location: 'Main Road, Near Temple',
  },
  {
    id: 'GRV-2024-0075',
    title: 'Garbage Collection Issue',
    department: 'Sanitation',
    status: 'pending',
    date: '10 Jan 2024',
    lastUpdate: '3 days ago',
    location: 'Lane 5, Block C',
  },
];

const departments = [
  { id: 'electricity', name: 'Electricity' },
  { id: 'water', name: 'Water' },
  { id: 'gas', name: 'Gas' },
  { id: 'sanitation', name: 'Sanitation' },
  { id: 'municipal', name: 'Municipal' },
];

const issueTypes = [
  'Service Interruption',
  'Billing Issue',
  'New Connection Request',
  'Quality Issue',
  'Infrastructure Damage',
  'Staff Behavior',
  'Delayed Service',
  'Other',
];

export default function GrievancePage() {
  const t = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'list' | 'new' | 'track'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // New Grievance Form
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    department: '',
    issueType: '',
    title: '',
    description: '',
    location: '',
    attachments: [] as File[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return (
          <span className="status-badge status-badge-success">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Resolved
          </span>
        );
      case 'in_progress':
        return (
          <span className="status-badge status-badge-info">
            <Clock className="w-3.5 h-3.5" />
            In Progress
          </span>
        );
      case 'pending':
        return (
          <span className="status-badge status-badge-pending">
            <AlertCircle className="w-3.5 h-3.5" />
            Pending
          </span>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  const filteredGrievances = existingGrievances.filter((g) => {
    if (selectedStatus !== 'all' && g.status !== selectedStatus) return false;
    if (searchQuery && !g.title.toLowerCase().includes(searchQuery.toLowerCase()) && !g.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

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
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t('grievance')}</h1>
              <p className="text-sm text-muted-foreground">File and track your complaints</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 bg-muted p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('list')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'list' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'
              }`}
            >
              My Complaints
            </button>
            <button
              onClick={() => {
                setActiveTab('new');
                setFormStep(1);
                setSubmitSuccess(false);
              }}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'new' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'
              }`}
            >
              <PlusCircle className="w-4 h-4 inline mr-2" />
              New Complaint
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'track' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'
              }`}
            >
              Track Status
            </button>
          </div>

          {/* List View */}
          {activeTab === 'list' && (
            <div className="space-y-4">
              {/* Search & Filter */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by ID or title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="gov-input pl-12"
                  />
                </div>
                <div className="flex gap-2">
                  {['all', 'pending', 'in_progress', 'resolved'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedStatus === status
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {status === 'all' ? 'All' : status.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grievance Cards */}
              <div className="space-y-4">
                {filteredGrievances.map((grievance) => (
                  <motion.div
                    key={grievance.id}
                    whileHover={{ y: -2 }}
                    className="bg-card rounded-xl shadow-md p-5 cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-mono text-muted-foreground">{grievance.id}</span>
                          {getStatusBadge(grievance.status)}
                        </div>
                        <h3 className="font-semibold text-foreground">{grievance.title}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {grievance.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {grievance.date}
                          </span>
                          <span className="px-2 py-0.5 bg-muted rounded text-xs">
                            {grievance.department}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Last updated</p>
                          <p className="font-medium text-foreground">{grievance.lastUpdate}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* New Complaint Form */}
          {activeTab === 'new' && !submitSuccess && (
            <div className="bg-card rounded-xl shadow-md p-6">
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      formStep >= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      {formStep > step ? <CheckCircle2 className="w-5 h-5" /> : step}
                    </div>
                    <span className={`ml-2 text-sm font-medium ${
                      formStep >= step ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step === 1 ? 'Category' : step === 2 ? 'Details' : 'Review'}
                    </span>
                    {step < 3 && (
                      <div className={`hidden md:block w-20 h-1 mx-4 rounded ${
                        formStep > step ? 'bg-primary' : 'bg-muted'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: Category */}
              {formStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Select Department *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                      {departments.map((dept) => (
                        <button
                          key={dept.id}
                          onClick={() => setFormData({ ...formData, department: dept.id })}
                          className={`p-4 rounded-xl border-2 text-center transition-all ${
                            formData.department === dept.id
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <span className="font-medium">{dept.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Issue Type *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {issueTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => setFormData({ ...formData, issueType: type })}
                          className={`p-3 rounded-lg border-2 text-sm transition-all ${
                            formData.issueType === type
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFormStep(2)}
                    disabled={!formData.department || !formData.issueType}
                    className="btn-primary w-full disabled:opacity-50"
                  >
                    Continue
                  </motion.button>
                </div>
              )}

              {/* Step 2: Details */}
              {formStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Complaint Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Brief title of your complaint"
                      className="gov-input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe your issue in detail..."
                      rows={4}
                      className="gov-input resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Location *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Enter your address or landmark"
                        className="gov-input pl-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Attachments (Optional)
                    </label>
                    <div className="border-2 border-dashed rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <div className="flex justify-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                          <Camera className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                          <Upload className="w-6 h-6 text-muted-foreground" />
                        </div>
                      </div>
                      <p className="text-muted-foreground">
                        Tap to capture photo or upload files
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        PNG, JPG, PDF up to 5MB each
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setFormStep(1)}
                      className="btn-outline flex-1"
                    >
                      Back
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormStep(3)}
                      disabled={!formData.title || !formData.description || !formData.location}
                      className="btn-primary flex-1 disabled:opacity-50"
                    >
                      Continue
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {formStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-muted rounded-xl p-6 space-y-4">
                    <h3 className="font-semibold text-lg">Review Your Complaint</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Department</p>
                        <p className="font-medium capitalize">{formData.department}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Issue Type</p>
                        <p className="font-medium">{formData.issueType}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-muted-foreground">Title</p>
                        <p className="font-medium">{formData.title}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-muted-foreground">Description</p>
                        <p className="font-medium">{formData.description}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-muted-foreground">Location</p>
                        <p className="font-medium">{formData.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setFormStep(2)}
                      className="btn-outline flex-1"
                    >
                      Edit
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="btn-success flex-1 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                      ) : (
                        'Submit Complaint'
                      )}
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Success Message */}
          {activeTab === 'new' && submitSuccess && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-card rounded-xl shadow-md p-8 text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Complaint Submitted!</h2>
              <p className="text-muted-foreground mb-6">
                Your complaint has been registered successfully
              </p>
              <div className="bg-muted rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground">Your Complaint ID</p>
                <p className="text-2xl font-bold text-primary font-mono">GRV-2024-{Math.floor(Math.random() * 9000 + 1000)}</p>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                You can track your complaint status using this ID. We'll also send updates to your registered mobile number.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setActiveTab('list');
                    setSubmitSuccess(false);
                  }}
                  className="btn-outline flex-1"
                >
                  View All Complaints
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="btn-primary flex-1"
                >
                  Go to Dashboard
                </button>
              </div>
            </motion.div>
          )}

          {/* Track Status */}
          {activeTab === 'track' && (
            <div className="space-y-6">
              <div className="bg-card rounded-xl shadow-md p-6">
                <h3 className="font-semibold text-lg mb-4">Track Complaint Status</h3>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Enter Complaint ID (e.g., GRV-2024-0123)"
                    className="gov-input flex-1"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary"
                  >
                    <Search className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Sample Timeline */}
              <div className="bg-card rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-sm font-mono text-muted-foreground">GRV-2024-0123</span>
                    <h3 className="font-semibold text-lg">Water Supply Interrupted</h3>
                  </div>
                  <span className="status-badge status-badge-info">
                    <Clock className="w-3.5 h-3.5" />
                    In Progress
                  </span>
                </div>

                <div className="space-y-0">
                  <div className="timeline-step">
                    <div className="timeline-dot timeline-dot-complete">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="pb-6">
                      <p className="font-medium text-foreground">Complaint Registered</p>
                      <p className="text-sm text-muted-foreground">28 Jan 2024, 10:30 AM</p>
                    </div>
                  </div>
                  <div className="timeline-step">
                    <div className="timeline-dot timeline-dot-complete">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="pb-6">
                      <p className="font-medium text-foreground">Assigned to Field Officer</p>
                      <p className="text-sm text-muted-foreground">28 Jan 2024, 02:15 PM</p>
                      <p className="text-sm text-muted-foreground">Officer: Ramesh Kumar (ID: WD-456)</p>
                    </div>
                  </div>
                  <div className="timeline-step">
                    <div className="timeline-dot timeline-dot-active">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="pb-6">
                      <p className="font-medium text-foreground">Site Inspection Scheduled</p>
                      <p className="text-sm text-muted-foreground">Expected: 30 Jan 2024</p>
                    </div>
                  </div>
                  <div className="timeline-step">
                    <div className="timeline-dot">
                      <span className="text-xs">4</span>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Resolution</p>
                      <p className="text-sm text-muted-foreground">Pending</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <button className="btn-outline w-full flex items-center justify-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Contact Support
                  </button>
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
