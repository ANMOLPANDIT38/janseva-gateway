import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Mic, MicOff, Bot, User } from 'lucide-react';
import { useApp, useTranslation } from '@/contexts/AppContext';

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const quickActions = [
  { label: 'Pay Electricity Bill', query: 'How do I pay my electricity bill?' },
  { label: 'Track Complaint', query: 'How can I track my complaint status?' },
  { label: 'Water Connection', query: 'How to apply for a new water connection?' },
  { label: 'File Grievance', query: 'I want to file a grievance' },
];

export default function AIChatbot() {
  const { showChatbot, setShowChatbot } = useApp();
  const t = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content: 'नमस्ते! Welcome to SMART JANSEVA. I\'m your AI assistant. How can I help you today? You can ask me about bill payments, grievances, service applications, or any other civic services.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponses: Record<string, string> = {
        'bill': 'To pay your bill:\n\n1. Go to the **Services** section\n2. Select your department (Electricity/Water/Gas)\n3. Click on **Pay Bill**\n4. Enter your Consumer Number\n5. Review the amount and pay using UPI, Card, or Net Banking\n\nWould you like me to guide you step by step?',
        'complaint': 'To track your complaint:\n\n1. Go to **Grievances** from the dashboard\n2. Click on **Track Status**\n3. Enter your Complaint ID or registered mobile number\n\nYou can also check your active complaints in the dashboard under "Active Complaints" section.',
        'connection': 'To apply for a new water connection:\n\n1. Go to **Services** → **Water**\n2. Click on **New Connection**\n3. Fill the application form with your details\n4. Upload required documents (Address Proof, ID Proof)\n5. Pay the application fee\n6. Track your application status\n\nEstimated processing time: 7-10 working days.',
        'grievance': 'I can help you file a grievance. You\'ll need:\n\n• Your mobile number\n• Description of the issue\n• Location details\n• Photos (optional)\n\nWould you like to proceed to the grievance form?',
      };

      let response = 'I understand your query. Let me help you with that. For specific assistance, please navigate to the relevant section from the dashboard or describe your issue in more detail.';

      const lowerText = text.toLowerCase();
      if (lowerText.includes('bill') || lowerText.includes('pay')) {
        response = botResponses['bill'];
      } else if (lowerText.includes('track') || lowerText.includes('status') || lowerText.includes('complaint')) {
        response = botResponses['complaint'];
      } else if (lowerText.includes('connection') || lowerText.includes('apply') || lowerText.includes('new')) {
        response = botResponses['connection'];
      } else if (lowerText.includes('grievance') || lowerText.includes('file')) {
        response = botResponses['grievance'];
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!showChatbot && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowChatbot(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-secondary text-secondary-foreground shadow-xl flex items-center justify-center"
            aria-label="Open AI Assistant"
          >
            <MessageCircle className="w-7 h-7" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {showChatbot && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-100px)] bg-card rounded-2xl shadow-2xl flex flex-col overflow-hidden border"
          >
            {/* Header */}
            <div className="gov-header p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{t('aiAssistant')}</h3>
                  <p className="text-xs text-white/70">Online • 24/7 Support</p>
                </div>
              </div>
              <button
                onClick={() => setShowChatbot(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex gap-2 max-w-[85%]">
                    {message.role === 'bot' && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`chat-bubble ${
                        message.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-secondary" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="chat-bubble chat-bubble-bot">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => handleSend(action.query)}
                      className="px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 rounded-full transition-colors"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t bg-background">
              <div className="flex gap-2">
                <button
                  onClick={toggleVoice}
                  className={`p-3 rounded-xl transition-colors ${
                    isListening
                      ? 'bg-destructive text-destructive-foreground animate-pulse'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                  aria-label={isListening ? 'Stop listening' : 'Start voice input'}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t('askQuestion')}
                  className="flex-1 px-4 py-3 bg-muted rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="p-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
