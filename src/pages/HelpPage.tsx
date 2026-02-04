import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  FileQuestion,
  ChevronDown,
  ExternalLink,
  Headphones,
} from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '@/contexts/AppContext';
import GovHeader from '@/components/layout/GovHeader';
import AIChatbot from '@/components/chat/AIChatbot';

const faqs = [
  {
    question: 'How do I pay my electricity bill?',
    answer: 'You can pay your electricity bill through the Services section. Go to Electricity > Pay Bill, enter your consumer number, review the amount, and pay using UPI, debit/credit card, or net banking.',
  },
  {
    question: 'How long does it take to resolve a complaint?',
    answer: 'Most complaints are resolved within 7-10 working days depending on the nature of the issue. You can track the status of your complaint using the complaint ID provided at registration.',
  },
  {
    question: 'How do I register for a new water connection?',
    answer: 'Go to Services > Water > New Connection. Fill out the application form with required documents (address proof, ID proof, property documents) and pay the application fee. Processing takes 7-10 working days.',
  },
  {
    question: 'Can I use this platform on a kiosk?',
    answer: 'Yes! SMART JANSEVA is optimized for both kiosk and mobile/desktop use. Visit any government kiosk center and use the touch-friendly interface. You can also transfer your session using QR code.',
  },
  {
    question: 'What if I forget my registered mobile number?',
    answer: 'Visit your nearest citizen service center with a valid ID proof. Our staff will help you recover your account and update your mobile number after verification.',
  },
  {
    question: 'How can I get a duplicate bill?',
    answer: 'Go to the respective service department (e.g., Electricity or Water), select View Bills, and you can download previous bills as PDF. Bills for the last 12 months are available.',
  },
];

const contactMethods = [
  {
    icon: Phone,
    title: 'Toll-Free Helpline',
    value: '1800-XXX-XXXX',
    description: 'Available 24/7',
    action: 'Call Now',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Support',
    value: '+91 98765-XXXXX',
    description: 'Quick responses',
    action: 'Chat',
  },
  {
    icon: Mail,
    title: 'Email Support',
    value: 'support@smartjanseva.gov.in',
    description: 'Response within 24 hours',
    action: 'Email',
  },
];

export default function HelpPage() {
  const t = useTranslation();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GovHeader />

      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto space-y-6"
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
              <h1 className="text-2xl font-bold text-foreground">{t('help')}</h1>
              <p className="text-sm text-muted-foreground">Get assistance and find answers</p>
            </div>
          </div>

          {/* Quick Contact */}
          <div className="bg-primary rounded-xl p-6 text-primary-foreground">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Need immediate help?</h2>
                <p className="text-primary-foreground/80">Our support team is available 24/7</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {contactMethods.map((method) => (
                <div
                  key={method.title}
                  className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <method.icon className="w-6 h-6 mb-2" />
                  <p className="font-semibold">{method.title}</p>
                  <p className="text-sm text-primary-foreground/80">{method.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-card rounded-xl shadow-md">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <FileQuestion className="w-5 h-5 text-primary" />
                Frequently Asked Questions
              </h2>
            </div>
            <div className="divide-y">
              {faqs.map((faq, index) => (
                <div key={index} className="cursor-pointer">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-medium text-foreground pr-4">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`} />
                  </button>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4"
                    >
                      <p className="text-muted-foreground bg-muted/50 rounded-lg p-4">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Service Centers */}
          <div className="bg-card rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Nearest Service Centers
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">City Civic Center</h3>
                  <p className="text-sm text-muted-foreground">Sector 12, Main Road, Smart City - 400001</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      9 AM - 6 PM
                    </span>
                    <span className="text-accent">2.3 km away</span>
                  </div>
                </div>
                <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                  <ExternalLink className="w-5 h-5 text-primary" />
                </button>
              </div>
              <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">E-Seva Kendra</h3>
                  <p className="text-sm text-muted-foreground">Block A, Community Hall, Smart City - 400002</p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      8 AM - 8 PM
                    </span>
                    <span className="text-accent">4.1 km away</span>
                  </div>
                </div>
                <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                  <ExternalLink className="w-5 h-5 text-primary" />
                </button>
              </div>
            </div>
          </div>

          {/* Emergency Numbers */}
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-destructive mb-4">Emergency Contacts</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Police', number: '100' },
                { name: 'Fire', number: '101' },
                { name: 'Ambulance', number: '102' },
                { name: 'Gas Leak', number: '1906' },
              ].map((emergency) => (
                <div
                  key={emergency.name}
                  className="bg-card rounded-lg p-4 text-center"
                >
                  <p className="text-2xl font-bold text-foreground">{emergency.number}</p>
                  <p className="text-sm text-muted-foreground">{emergency.name}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>

      <AIChatbot />
    </div>
  );
}
