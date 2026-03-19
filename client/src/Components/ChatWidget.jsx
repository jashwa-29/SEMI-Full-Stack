import React, { useState, useEffect, useRef, useCallback } from 'react';
import io from 'socket.io-client';
import { MessageCircle, X, Send, User, Bot, Minus, Phone, Mail, UserCircle, Sparkles, RotateCcw, List } from 'lucide-react';

const SOCKET_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/api\/?$/, '').replace(/\/$/, '');

// --- Typing Indicator Component ---
const TypingIndicator = () => (
  <div className="flex justify-start chat-message-enter">
    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mr-2 flex-shrink-0 shadow-sm">
      <Bot size={14} className="text-white" />
    </div>
    <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
      <div className="flex items-center gap-1.5">
        <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full" style={{ animationDelay: '0ms' }} />
        <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full" style={{ animationDelay: '150ms' }} />
        <span className="typing-dot w-2 h-2 bg-gray-400 rounded-full" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  </div>
);

// --- Step Progress Component ---
const StepProgress = ({ currentStep }) => {
  const steps = [
    { key: 'ask_name', icon: UserCircle, label: 'Name' },
    { key: 'ask_phone', icon: Phone, label: 'Phone' },
    { key: 'ask_email', icon: Mail, label: 'Email' },
    { key: 'chat_live', icon: MessageCircle, label: 'Support' },
  ];
  const currentIdx = steps.findIndex(s => s.key === currentStep);

  return (
    <div className="flex items-center justify-center gap-1 py-2.5 px-4 bg-gradient-to-r from-gray-50 via-white to-gray-50 border-b border-gray-100">
      {steps.map((step, idx) => {
        const Icon = step.icon;
        const isActive = idx === currentIdx;
        const isDone = idx < currentIdx;

        return (
          <React.Fragment key={step.key}>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold tracking-wide transition-all duration-300
              ${isActive ? 'bg-primary-600 text-white shadow-md shadow-primary-200 scale-105' 
                : isDone ? 'bg-emerald-50 text-emerald-600' 
                : 'text-gray-300'}`}
            >
              <Icon size={10} />
              <span className="hidden sm:inline">{step.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`w-4 h-[2px] rounded-full transition-colors duration-300 ${isDone ? 'bg-emerald-400' : 'bg-gray-200'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('ask_name');
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [userDetails, setUserDetails] = useState({ name: '', phone: '', email: '' });
  const [visitorId, setVisitorId] = useState(null);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isAdminTyping, setIsAdminTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [faqOptions, setFaqOptions] = useState([]);
  const [initialFaqs, setInitialFaqs] = useState([]);
  const [menuHistory, setMenuHistory] = useState([]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Fetch FAQ Options dynamically
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch(`${SOCKET_URL}/api/chat-settings/visitor_faqs`);
        const data = await res.json();
        if (data.success) {
          setFaqOptions(data.data);
          setInitialFaqs(data.data);
        }
      } catch (err) {
        console.error("Error fetching FAQs:", err);
      }
    };
    fetchFaqs();
  }, []);

  // Initialize Visitor ID on mount
  useEffect(() => {
    let storedId = localStorage.getItem('semi_visitor_id');
    if (!storedId) {
      storedId = 'visitor_' + Math.random().toString(36).substring(2, 11);
      localStorage.setItem('semi_visitor_id', storedId);
    }
    setVisitorId(storedId);
  }, []);

  // Initialize Socket
  useEffect(() => {
    if (!visitorId) return;

    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return 'Good morning';
      if (hour < 17) return 'Good afternoon';
      return 'Good evening';
    };

    const initialGreeting = `${getGreeting()}! Welcome to SEMI India. I'm your digital assistant. May I know your name to get started?`;

    const newSocket = io(SOCKET_URL, {
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
    });
    setSocket(newSocket);

    newSocket.on('connect', () => {
        console.log('ChatWidget Connected:', newSocket.id);
        newSocket.emit('join_chat', visitorId);
    });

    newSocket.on('connect_error', (err) => {
        console.error('ChatWidget Connection Error:', err);
    });

    newSocket.on('chat_history', (history) => {
        if (history && history.length > 0) {
            setMessages(history);
            const lastMessage = history[history.length - 1];
            if (lastMessage.sender === 'bot' && lastMessage.text.includes('name')) {
                setStep('ask_name');
            } else if (lastMessage.sender === 'bot' && lastMessage.text.includes('phone')) {
                setStep('ask_phone');
            } else if (lastMessage.sender === 'bot' && lastMessage.text.includes('email')) {
                setStep('ask_email');
            } else {
                setStep('chat_live');
            }
        } else {
            setStep('ask_name');
        }
    });

    newSocket.on('receive_message', (msg) => {
        setIsAdminTyping(false);
        setMessages((prev) => [...prev, msg]);
        if (!isOpen || isMinimized) {
          setUnreadCount(prev => prev + 1);
        }
    });

    // Listen for admin typing indicator
    newSocket.on('admin_typing', (data) => {
        if (data.visitorId === visitorId) {
            setIsAdminTyping(true);
            // Auto-clear after 3s if no new typing event
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
            typingTimeoutRef.current = setTimeout(() => setIsAdminTyping(false), 3000);
        }
    });

    newSocket.on('admin_stop_typing', (data) => {
        if (data.visitorId === visitorId) {
            setIsAdminTyping(false);
        }
    });

    newSocket.on('bot_typing', (data) => {
        setIsBotTyping(data.isTyping);
    });

    newSocket.on('new_quick_replies', (replies) => {
        setFaqOptions(replies);
    });

    newSocket.on('chat_closed', () => {
        setIsClosed(true);
        setIsAdminTyping(false);
        setMessages(prev => [...prev, { 
            sender: 'bot', 
            text: 'This session has ended. Do you need to chat another time? Just send a message to start again!',
            timestamp: new Date() 
        }]);
    });

    return () => newSocket.close();
  }, [visitorId]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, isBotTyping, isAdminTyping]);

  // Auto-open after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Clear unread when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setUnreadCount(0);
    }
  }, [isOpen, isMinimized]);

  // Focus input on open
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isMinimized]);

  // Sequential greeting after open
  useEffect(() => {
    let t1, t2, t3;
    if (isOpen && !hasGreeted) {
      setHasGreeted(true);
      setIsBotTyping(true);
      
      const hour = new Date().getHours();
      const greetingWord = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
      
      t1 = setTimeout(() => {
        setMessages(prev => {
          if (prev.length > 0) return prev;
          return [...prev, {
            sender: 'bot',
            text: `${greetingWord}! Welcome to SEMI India. 👋`,
            timestamp: new Date()
          }];
        });
      }, 1200);

      t2 = setTimeout(() => {
        setMessages(prev => {
          if (prev.length > 1) return prev;
          return [...prev, {
            sender: 'bot',
            text: "I'm your digital assistant. May I know your name to get started?",
            timestamp: new Date()
          }];
        });
        setIsBotTyping(false);
      }, 2500);
    }

    return () => {
      if (t1) clearTimeout(t1);
      if (t2) clearTimeout(t2);
      if (t3) clearTimeout(t3);
    };
  }, [isOpen]);

  // Helper: show bot typing then deliver message
  // Helper: show bot typing then deliver message
  const botReply = useCallback((text, callback, delay = 1000) => {
    setIsBotTyping(true);
    const personalizedText = text.replace(/{name}/g, userDetails.name || 'there');
    setTimeout(() => {
      const botResponse = { sender: 'bot', text: personalizedText, timestamp: new Date() };
      setMessages(prev => [...prev, botResponse]);
      setIsBotTyping(false);
      if (callback) callback();
    }, delay);
  }, [userDetails.name]);

  // Emit typing to admin
  const emitTyping = useCallback(() => {
    if (socket && step === 'chat_live' && visitorId) {
      socket.emit('visitor_typing', { visitorId });
    }
  }, [socket, step, visitorId]);

  const emitStopTyping = useCallback(() => {
    if (socket && step === 'chat_live' && visitorId) {
      socket.emit('visitor_stop_typing', { visitorId });
    }
  }, [socket, step, visitorId]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    emitTyping();
  };

  const handleSend = (overrideText = null) => {
    const textToSend = overrideText || inputText;
    if (!textToSend.trim()) return;

    emitStopTyping();

    // If chat was closed, reset session
    if (isClosed) {
      const newId = 'visitor_' + Math.random().toString(36).substring(2, 11);
      localStorage.setItem('semi_visitor_id', newId);
      setIsClosed(false);
      setUserDetails({ name: '', phone: '', email: '' });
      if (!overrideText) setInputText('');
      setMessages([{
        sender: 'bot',
        text: 'Moving you to a new session... May I know your name to get started?',
        timestamp: new Date()
      }]);
      setVisitorId(newId);
      setStep('ask_name');
      setHasGreeted(true);
      return;
    }

    const currentInput = textToSend;
    if (!overrideText) setInputText('');

    if (step === 'chat_live') {
        const userMsg = { 
            visitorId, 
            text: currentInput, 
            sender: 'user', 
            isAdmin: false,
            timestamp: new Date()
        };
        
        // If we are clicking a suggestion, save current state to history for Back button
        if (overrideText && faqOptions.length > 0) {
            setMenuHistory(prev => [...prev, faqOptions]);
            setFaqOptions([]); 
        }

        if (socket) {
            socket.emit('send_message', userMsg);
        }
    } 
    else {
        const userMessage = { sender: 'user', text: currentInput, timestamp: new Date() };
        setMessages(prev => [...prev, userMessage]);

        if (step === 'ask_name') {
            const lowerInput = currentInput.toLowerCase().trim();
            const greetings = ['hi', 'hello', 'hey', 'hii', 'helloo', 'whats up', 'how are you', 'howdy', 'helo', 'hola', 'hi there', 'hello there'];
            
            if (greetings.includes(lowerInput)) {
                botReply('Hello! Could you please tell me your name so we can assist you better?');
                return;
            }

            const cleanName = (str) => {
              return str
                .replace(/^(i\s+am|my\s+name\s+is|this\s+is|im|i'm|myself)\s+/gi, '')
                .trim()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
            };
            
            const extractedName = cleanName(currentInput);
            
            if (!extractedName || extractedName.length < 2) {
                botReply('Could you please provide a valid name?');
                return;
            }

            if (currentInput.length > 30) {
                botReply('That seems a bit long for a name. Could you please provide just your name?');
                return;
            }

            const blacklist = ['yes', 'no', 'ok', 'okay', 'sure', 'thanks', 'thank you', 'pls', 'please', 'idk', 'yeah', 'yep', 'nope'];
            if (blacklist.includes(lowerInput)) {
                botReply('I need your name to proceed. Could you please provide it?');
                return;
            }

            if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(extractedName)) {
                botReply('A name shouldn\'t contain special characters. Could you please provide your actual name?');
                return;
            }

            if (/\d/.test(extractedName)) {
                botReply('A name shouldn\'t contain numbers. Could you please provide your actual name?');
                return;
            }

            setUserDetails(prev => ({ ...prev, name: extractedName }));
            
            if (socket) {
                socket.emit('update_visitor_info', { 
                    visitorId, 
                    name: extractedName,
                    message: userMessage
                });
            }

            botReply(`Thanks ${extractedName.split(' ')[0]}! 😊 What is your phone number?`, () => setStep('ask_phone'));
        } 
        else if (step === 'ask_phone') {
            const extractedPhone = currentInput.replace(/\D/g, '');
            
            if (extractedPhone.length < 10 || extractedPhone.length > 15) {
                botReply('That doesn\'t look like a valid phone number. Could you please provide a 10-digit mobile number?');
                return;
            }

            setUserDetails(prev => ({ ...prev, phone: extractedPhone }));
            
            if (socket) {
                socket.emit('update_visitor_info', { 
                    visitorId, 
                    phone: extractedPhone,
                    message: userMessage
                });
            }

            botReply('Got it! ✅ Finally, what is your email address?', () => setStep('ask_email'));
        } 
        else if (step === 'ask_email') {
            const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
            const match = currentInput.match(emailRegex);
            
            if (!match) {
                botReply('I couldn\'t find a valid email in that. Could you please double-check and send it again?');
                return;
            }

            const extractedEmail = match[0].toLowerCase();
            const finalDetails = { ...userDetails, email: extractedEmail };
            setUserDetails(finalDetails);
            
            if (socket) {
                socket.emit('update_visitor_info', { 
                    visitorId, 
                    ...finalDetails,
                    message: userMessage 
                });
            }

            botReply('Thank you! 🎉 Your details are saved. I can help you with common questions instantly, or you can request to speak with our team if you need further assistance.', () => setStep('chat_live'), 1000);
        }
    }
  };

  const handleKeyPress = (e) => {
      if (e.key === 'Enter') handleSend();
  };

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
    setUnreadCount(0);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={toggleChat}
        className="fixed bottom-28 right-6 z-50 p-4 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all duration-300 hover:scale-110 active:scale-95 group"
        aria-label="Toggle chat"
      >
        <div className="relative">
          {isOpen && !isMinimized ? <X size={24} className="transition-transform group-hover:rotate-90 duration-300" /> : <MessageCircle size={24} className="transition-transform group-hover:scale-110 duration-300" />}
          {unreadCount > 0 && (
            <span className="absolute -top-3 -right-3 size-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white chat-bounce">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && !isMinimized && (
        <div className="fixed bottom-48 right-6 z-50 w-[370px] h-[520px] bg-white rounded-2xl shadow-2xl shadow-gray-900/10 border border-gray-100 flex flex-col overflow-hidden chat-widget-enter">
            {/* Premium Header */}
            <div className="bg-gradient-to-r from-primary-600 via-primary-600 to-primary-700 p-4 flex items-center gap-3 relative overflow-hidden">
                {/* Subtle Pattern Overlay */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
                </div>

                <div className="relative z-10 flex items-center gap-3 flex-1">
                    <div className="relative">
                        <div className="size-11 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-white border border-white/10">
                            <Sparkles size={20} />
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 size-3.5 bg-emerald-400 border-2 border-primary-600 rounded-full shadow-sm" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-sm tracking-tight">SEMI Assistant</h3>
                        <p className="text-[11px] text-white/50 font-medium">
                          {isBotTyping ? '🤖 Bot is typing...' : isAdminTyping ? '✍️ Agent is typing...' : 'Usually replies in minutes'}
                        </p>
                    </div>
                </div>
                
                <div className="relative z-10 flex items-center gap-1">
                  <button 
                    onClick={() => setIsMinimized(true)} 
                    className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all"
                    aria-label="Minimize"
                  >
                    <Minus size={16} />
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)} 
                    className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all"
                    aria-label="Close"
                  >
                    <X size={16} />
                  </button>
                </div>
            </div>

            {/* Step Progress */}
            {step !== 'chat_live' && !isClosed && <StepProgress currentStep={step} />}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-50/80 to-white">
                {messages.map((msg, idx) => {
                    const isUser = msg.sender === 'user';
                    const isBot = msg.sender === 'bot';
                    const showTimestamp = idx === messages.length - 1 || 
                      messages[idx + 1]?.sender !== msg.sender;

                    return (
                        <div 
                            key={idx} 
                            className={`flex chat-message-enter gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                            style={{ animationDelay: `${Math.min(idx, 5) * 60}ms` }}
                        >
                            <div className="flex-shrink-0 self-end mb-4">
                                {isBot ? (
                                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center shadow-lg shadow-primary-200/50">
                                        <Bot size={16} className="text-white" />
                                    </div>
                                ) : (
                                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 flex items-center justify-center shadow-sm">
                                        <User size={15} className="text-slate-600" />
                                    </div>
                                )}
                            </div>
                            
                            <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[80%]`}>
                                <div className={`
                                    px-4 py-2.5 text-[13px] leading-relaxed shadow-sm
                                    ${isUser 
                                        ? 'bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-2xl rounded-tr-none' 
                                        : 'bg-white text-slate-700 border border-slate-100 rounded-2xl rounded-tl-none'
                                    }
                                `}>
                                    <div className="flex flex-col gap-3">
                                        <div className="whitespace-pre-wrap">
                                            {msg.text.split(/(https?:\/\/[^\s]+)/g).map((part, i) => {
                                                if (part.match(/https?:\/\/[^\s]+/)) return null;
                                                return <span key={i}>{part}</span>;
                                            })}
                                        </div>
                                        {msg.text.match(/https?:\/\/[^\s]+/) && (
                                            <a 
                                                href={msg.text.match(/https?:\/\/[^\s]+/)[0]} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all group/link no-underline border ${
                                                    isUser 
                                                    ? 'bg-white/10 hover:bg-white/20 border-white/20' 
                                                    : 'bg-primary-50 hover:bg-primary-100 border-primary-100'
                                                }`}
                                            >
                                                <div className="flex flex-col">
                                                    <span className={`text-[10px] font-black uppercase tracking-widest ${isUser ? 'text-white/60' : 'text-primary-600/60'}`}>External Action</span>
                                                    <span className={`text-[12px] font-bold truncate max-w-[140px] ${isUser ? 'text-white' : 'text-primary-700'}`}>
                                                        {msg.text.match(/https?:\/\/[^\s]+/)[0].replace(/^https?:\/\/(www\.)?/, '')}
                                                    </span>
                                                </div>
                                                <div className={`size-8 rounded-lg flex items-center justify-center transition-all ${
                                                    isUser ? 'bg-white/20 group-hover/link:bg-white/30' : 'bg-primary-600 group-hover/link:bg-primary-700'
                                                }`}>
                                                    <Send size={14} className="text-white rotate-[-45deg]" />
                                                </div>
                                            </a>
                                        )}
                                    </div>
                                </div>
                                {showTimestamp && (
                                  <span className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-tighter opacity-60">
                                    {formatTime(msg.timestamp)}
                                  </span>
                                )}
                            </div>
                        </div>
                    );
                })}
                
                {/* Bot Typing Indicator */}
                {isBotTyping && <TypingIndicator />}  
                
                {/* Admin Typing Indicator */}
                {isAdminTyping && step === 'chat_live' && (
                  <div className="flex justify-start chat-message-enter">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mr-2 flex-shrink-0 shadow-sm">
                      <User size={14} className="text-white" />
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                      <div className="flex items-center gap-1.5">
                        <span className="typing-dot w-2 h-2 bg-emerald-400 rounded-full" style={{ animationDelay: '0ms' }} />
                        <span className="typing-dot w-2 h-2 bg-emerald-400 rounded-full" style={{ animationDelay: '150ms' }} />
                        <span className="typing-dot w-2 h-2 bg-emerald-400 rounded-full" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />

                {/* Integrated Quick Replies - Proper Bot Experience */}
                {step === 'chat_live' && !isClosed && faqOptions.length > 0 && !isBotTyping && (
                  <div className="flex flex-col gap-2 mt-4 mb-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-2 mb-2 px-1">
                      <div className="size-5 rounded-full bg-primary-100 flex items-center justify-center">
                        <Sparkles size={10} className="text-primary-600" />
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Suggestions</span>
                      {faqOptions !== initialFaqs && (
                        <button
                          onClick={() => setFaqOptions(initialFaqs)}
                          className="ml-auto text-[10px] font-bold text-primary-600 hover:underline flex items-center gap-1"
                        >
                          <RotateCcw size={10} /> Main Menu
                        </button>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-2 px-1">
                      {/* FAQ Options */}
                      {faqOptions.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(opt.value || opt.label)}
                          className="w-full text-left px-5 py-4 rounded-2xl bg-white border border-slate-100 text-[13px] font-bold text-slate-700 hover:border-primary-500 hover:text-primary-700 hover:bg-primary-50 transition-all duration-200 active:scale-[0.98] shadow-sm flex items-center justify-between group"
                        >
                          <span>{opt.label}</span>
                          <Send size={12} className="text-slate-300 group-hover:text-primary-500 transition-colors" />
                        </button>
                      ))}

                      {/* Talk to Human Handover Button (Only in Main Menu) */}
                      {/* 
                      {faqOptions === initialFaqs && (
                         <button
                            onClick={() => handleSend('request_live_chat')}
                            className="w-full text-left px-5 py-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-[13px] font-bold text-indigo-700 hover:bg-indigo-100 transition-all duration-200 shadow-sm flex items-center justify-between group"
                         >
                            <div className="flex items-center gap-2">
                                <User size={14} />
                                <span>Talk to a Human</span>
                            </div>
                            <Sparkles size={12} className="text-indigo-400 animate-pulse" />
                         </button>
                      )}
                      */}

                      {/* Navigation Controls: Back & Close (Main Menu) */}
                      {faqOptions !== initialFaqs && (
                          <div className="grid grid-cols-2 gap-2 mt-1">
                              <button
                                  onClick={() => {
                                      if (menuHistory.length > 0) {
                                          const prev = menuHistory[menuHistory.length - 1];
                                          setFaqOptions(prev);
                                          setMenuHistory(h => h.slice(0, -1));
                                      } else {
                                          setFaqOptions(initialFaqs);
                                      }
                                  }}
                                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 text-slate-600 text-[11px] font-bold hover:bg-slate-200 transition-all"
                              >
                                  <RotateCcw size={12} /> Back
                              </button>
                              <button
                                  onClick={() => {
                                      setFaqOptions(initialFaqs);
                                      setMenuHistory([]);
                                  }}
                                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 text-slate-600 text-[11px] font-bold hover:bg-red-50 hover:text-red-500 transition-all"
                              >
                                  <Minus size={12} /> Close Menu
                              </button>
                          </div>
                      )}
                    </div>
                  </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-gray-100">
                <div className="flex items-center gap-2 bg-gray-50 rounded-2xl px-4 py-2.5 border border-gray-200 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/10 focus-within:bg-white transition-all duration-200">
                    {step === 'chat_live' && faqOptions.length === 0 && (
                        <button 
                            onClick={() => {
                                setFaqOptions(initialFaqs);
                                setMenuHistory([]);
                            }}
                            className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                            title="Show Topics"
                        >
                            <List size={16} />
                        </button>
                    )}
                    <input 
                        ref={inputRef}
                        type="text" 
                        value={inputText}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        onBlur={emitStopTyping}
                        placeholder={
                            isClosed ? "Type to start new chat..." :
                            step === 'ask_name' ? "Enter your name..." :
                            step === 'ask_phone' ? "Enter your phone number..." :
                            step === 'ask_email' ? "Enter your email..." :
                            "Type your message..."
                        }
                        className="flex-1 bg-transparent border-none outline-none text-[13px] text-gray-700 placeholder:text-gray-400 font-medium"
                    />
                    <button 
                        onClick={() => handleSend()}
                        disabled={!inputText.trim()}
                        className="p-2 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-md hover:shadow-primary-500/20 transition-all duration-200 active:scale-90"
                    >
                        <Send size={14} />
                    </button>
                </div>
                <div className="text-center mt-2">
                     <p className="text-[9px] text-gray-300 font-medium tracking-wide">Powered by SEMI India</p>
                </div>
            </div>
        </div>
      )}
    </>
  );
}
