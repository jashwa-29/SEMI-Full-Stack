import { useState, useEffect, useRef, useCallback } from 'react';
import io from 'socket.io-client';
import { User, MessageCircle, Send, Clock, CheckCircle, AlertCircle, Loader2, Volume2, BellRing, Bot, Smile, Paperclip } from 'lucide-react';
import Toast from "../components/Toast";
import Modal from "../components/Modal";

const SOCKET_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

// --- Typing Indicator Component ---
const TypingIndicator = ({ name = 'Visitor' }) => (
    <div className="flex justify-start items-end gap-2 animate-fadeIn">
        <div className="size-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">
            {name.charAt(0)}
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                    <span className="typing-dot" style={{ animationDelay: '0ms' }} />
                    <span className="typing-dot" style={{ animationDelay: '150ms' }} />
                    <span className="typing-dot" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-[10px] font-medium text-gray-400 ml-1">{name} is typing</span>
            </div>
        </div>
    </div>
);

const LiveChat = () => {
    const socketRef = useRef(null);
    const [chats, setChats] = useState([]);
    const [activeChatId, setActiveChatId] = useState(null);
    const [inputText, setInputText] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isJoining, setIsJoining] = useState(false);
    const [showCloseConfirm, setShowCloseConfirm] = useState(false);
    const [isSoundEnabled, setIsSoundEnabled] = useState(true);
    const [volume, setVolume] = useState(0.8);
    const [notificationPermission, setNotificationPermission] = useState('default');
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });
    const [visitorTyping, setVisitorTyping] = useState({}); // { visitorId: true/false }

    const messagesEndRef = useRef(null);
    const activeChatIdRef = useRef(null);
    const lastMessageCountRef = useRef({});
    const triggerNotificationRef = useRef(null);
    const audioRef = useRef(null);
    const typingTimeoutsRef = useRef({});

    // Sync ref with state
    useEffect(() => {
        activeChatIdRef.current = activeChatId;
    }, [activeChatId]);

    // Handle Title Flashing for Background Notifications
    useEffect(() => {
        let interval;
        const originalTitle = "Live Chat | SEMI Admin";
        
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                clearInterval(interval);
                document.title = originalTitle;
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            clearInterval(interval);
        };
    }, []);

    const playNotificationSound = (customVolume = null) => {
        if (!audioRef.current) {
            audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3');
        }
        
        try {
            audioRef.current.currentTime = 0;
            audioRef.current.volume = customVolume !== null ? customVolume : volume;
            const playPromise = audioRef.current.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn("Autoplay blocked.", error);
                });
            }
        } catch (err) {
            console.error("Sound play failed:", err);
        }
    };

    const triggerNotification = (title, body, force = false) => {
        playNotificationSound();

        if (Notification.permission === "granted" && (document.hidden || force)) {
            try {
                const n = new Notification(title, { 
                    body, 
                    icon: "https://cdn-icons-png.flaticon.com/512/893/893257.png",
                    silent: true 
                });
                n.onclick = () => { window.focus(); n.close(); };
            } catch (e) {
                console.error("OS Notification failed:", e);
            }
        }

        if (document.hidden || force) {
            let showingAlert = false;
            const interval = setInterval(() => {
                document.title = showingAlert ? "Live Chat | SEMI Admin" : "🔔 New Message!";
                showingAlert = !showingAlert;
                if (!document.hidden && !force) {
                    clearInterval(interval);
                    document.title = "Live Chat | SEMI Admin";
                }
            }, 1000);
            
            setTimeout(() => {
                clearInterval(interval);
                document.title = "Live Chat | SEMI Admin";
            }, 10000);
        }
    };

    useEffect(() => {
        triggerNotificationRef.current = triggerNotification;
    });

    const enableNotifications = () => {
        playNotificationSound();
        setIsSoundEnabled(true);
        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        }
        showToast("Audio and Notifications enabled!", "success");
    };

    // Emit admin typing to visitor
    const emitAdminTyping = useCallback(() => {
        if (socketRef.current && activeChatIdRef.current) {
            socketRef.current.emit('admin_typing', { visitorId: activeChatIdRef.current });
        }
    }, []);

    const emitAdminStopTyping = useCallback(() => {
        if (socketRef.current && activeChatIdRef.current) {
            socketRef.current.emit('admin_stop_typing', { visitorId: activeChatIdRef.current });
        }
    }, []);

    // Initial Setup
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        setCurrentUser(user);

        if ("Notification" in window) {
            setNotificationPermission(Notification.permission);
            if (Notification.permission !== "granted" && Notification.permission !== "denied") {
                Notification.requestPermission().then(permission => {
                    setNotificationPermission(permission);
                });
            }
        }



        if (!socketRef.current) {
            socketRef.current = io(SOCKET_URL, {
                withCredentials: true,
                autoConnect: true,
                reconnection: true,
                reconnectionDelay: 1000,
            });

            const socket = socketRef.current;

            socket.on('connect', () => {
                console.log("Connected to socket server ID:", socket.id);
                setIsConnected(true);
                socket.emit('admin_join');
            });

            socket.on('connect_error', (err) => {
                console.error("Socket Connection Error:", err);
                setIsConnected(false);
            });

            socket.on('disconnect', (reason) => {
                console.log("Disconnected from socket:", reason);
                setIsConnected(false);
            });

            // Visitor typing events
            socket.on('visitor_typing', (data) => {
                if (data && data.visitorId) {
                    setVisitorTyping(prev => ({ ...prev, [data.visitorId]: true }));
                    // Auto-clear after 3s
                    if (typingTimeoutsRef.current[data.visitorId]) {
                        clearTimeout(typingTimeoutsRef.current[data.visitorId]);
                    }
                    typingTimeoutsRef.current[data.visitorId] = setTimeout(() => {
                        setVisitorTyping(prev => ({ ...prev, [data.visitorId]: false }));
                    }, 3000);
                }
            });

            socket.on('visitor_stop_typing', (data) => {
                if (data && data.visitorId) {
                    setVisitorTyping(prev => ({ ...prev, [data.visitorId]: false }));
                }
            });

            socket.on('chat_updated', (updatedChat) => {
                if (!updatedChat || !updatedChat.visitorId) return;

                const prevCount = lastMessageCountRef.current[updatedChat.visitorId] || 0;
                const newCount = updatedChat.messages ? updatedChat.messages.length : 0;
                
                if (updatedChat.visitorId === activeChatIdRef.current) {
                    setIsJoining(false);
                }

                // Clear typing when message arrives
                if (newCount > prevCount) {
                    setVisitorTyping(prev => ({ ...prev, [updatedChat.visitorId]: false }));
                }

                if (newCount > prevCount) {
                    const lastMsg = updatedChat.messages[newCount - 1];
                    const isNewMessageFromVisitor = lastMsg && lastMsg.sender !== 'admin' && lastMsg.sender !== 'bot';
                    
                    if (isNewMessageFromVisitor) {
                        const visitorName = updatedChat.name || 'Visitor';
                        showToast(`New Message from ${visitorName}`, "info");
                        triggerNotificationRef.current(
                            `New message from ${visitorName}`,
                            lastMsg.text.substring(0, 50) + (lastMsg.text.length > 50 ? '...' : '')
                        );
                    }
                } else if (prevCount === 0 && newCount === 0) {
                     triggerNotificationRef.current(`New Guest`, `${updatedChat.name || 'Visitor'} is waiting for response`);
                }

                lastMessageCountRef.current[updatedChat.visitorId] = newCount;

                setChats(prev => {
                    const safePrev = Array.isArray(prev) ? prev : [];
                    const exists = safePrev.find(c => c.visitorId === updatedChat.visitorId);
                    if (exists) {
                        return safePrev.map(c => c.visitorId === updatedChat.visitorId ? updatedChat : c);
                    } else {
                        return [updatedChat, ...safePrev];
                    }
                });
            });

            socket.on('error', (err) => {
                const message = typeof err === 'string' ? err : (err.message || 'An unexpected error occurred');
                showToast(message, "error");
                setIsJoining(false);
            });

            socket.on('active_chats_initial', (initialChats) => {
                if (Array.isArray(initialChats)) {
                     setChats(initialChats);
                     initialChats.forEach(c => {
                         lastMessageCountRef.current[c.visitorId] = c.messages ? c.messages.length : 0;
                     });
                }
            });
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, []);

    const currentUserId = currentUser?._id || currentUser?.id;
    const activeChat = chats.find(c => c.visitorId === activeChatId);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [activeChat?.messages, activeChatId, visitorTyping]);

    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
    };

    const handleChatSelect = (chat) => {
        setActiveChatId(chat.visitorId);
    };

    const handleCloseChat = () => {
        if (!socketRef.current || !activeChatId || !currentUserId) return;
        
        socketRef.current.emit('close_chat', {
            visitorId: activeChatId,
            adminId: currentUserId
        });
        setActiveChatId(null);
        setShowCloseConfirm(false);
        showToast("Chat closed and archived", "success");
    };

    const handleClaimChat = () => {
        if (!socketRef.current) return showToast("Connection error. Refreshing...", "error");
        if (!activeChatId) return showToast("No active chat selected.", "error");
        if (!currentUserId) return showToast("Session error: User ID missing. Please re-login.", "error");
        
        setIsJoining(true);
        socketRef.current.emit('admin_claim', { 
            visitorId: activeChatId, 
            adminId: currentUserId 
        });

        setTimeout(() => setIsJoining(false), 5000);
    };

    const handleInputChange = (e) => {
        setInputText(e.target.value);
        emitAdminTyping();
    };

    const handleSendMessage = (message = null) => {
        const textToSend = message || inputText;
        if (!textToSend.trim() || !activeChatId || !currentUserId || !activeChat) return;

        if (!activeChat.assignedTo) {
             showToast("Please join the chat before sending a message", "error");
             return;
        }

        if (String(activeChat.assignedTo) !== String(currentUserId)) {
             showToast("This chat is assigned to another admin", "error");
             return;
        }

        emitAdminStopTyping();

        socketRef.current.emit('send_message', {
            visitorId: activeChatId,
            text: textToSend,
            sender: 'admin',
            isAdmin: true,
            adminId: currentUserId
        });

        if (!message) setInputText('');
    };

    const isClaimedByMe = activeChat?.assignedTo && currentUserId && String(activeChat.assignedTo) === String(currentUserId);
    const isUnclaimed = !activeChat?.assignedTo;
    const isVisitorCurrentlyTyping = activeChatId && visitorTyping[activeChatId];

    const formatTime = (timestamp) => {
        if (!timestamp) return '';
        return new Date(timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    };

    // Group messages for better UX
    const getMessageGroups = (messages) => {
        if (!messages || messages.length === 0) return [];
        
        return messages.map((msg, idx) => {
            const prev = messages[idx - 1];
            const next = messages[idx + 1];
            const isFirst = !prev || prev.sender !== msg.sender || prev.isAdmin !== msg.isAdmin;
            const isLast = !next || next.sender !== msg.sender || next.isAdmin !== msg.isAdmin;
            return { ...msg, isFirst, isLast };
        });
    };

    return (
        <div className="h-[calc(100vh-120px)] grid lg:grid-cols-4 gap-5 animate-fadeIn">
             {toast.show && (
                <Toast 
                    message={toast.message} 
                    type={toast.type} 
                    onClose={() => setToast({ ...toast, show: false })} 
                />
            )}

            {/* Sidebar Column */}
            <div className="lg:col-span-1 flex flex-col gap-3 min-h-0">
                {/* Connection Status Header */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 tracking-tight">Conversations</h3>
                            <div className="flex items-center gap-1.5 mt-1">
                                <div className={`size-2 rounded-full ${isConnected ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-red-500 animate-pulse'} transition-all`} />
                                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                                    {isConnected ? 'Connected' : 'Reconnecting...'}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 font-bold px-2.5 py-1.5 rounded-xl text-[10px] uppercase tracking-wider">
                                <BellRing size={10} className="animate-bounce" style={{ animationDuration: '3s' }} />
                                Live
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-between bg-gray-50 rounded-xl p-2.5 pl-3">
                        <span className="text-[11px] font-bold text-gray-500">
                            {chats.filter(c => c.status !== 'closed').length} active sessions
                        </span>
                        <button 
                            onClick={() => triggerNotification("System Check", "Live & Active", true)}
                            className="p-1.5 hover:bg-white text-gray-400 hover:text-primary-600 rounded-lg transition-all"
                            title="Test Notification"
                        >
                            <Send size={12} className="rotate-[-45deg]" />
                        </button>
                    </div>
                </div>

                {/* Chat List */}
                <div className="flex-1 flex flex-col min-h-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        {chats.filter(c => c.status !== 'closed').map(chat => {
                            const isActive = activeChatId === chat.visitorId;
                            const isTyping = visitorTyping[chat.visitorId];
                            const lastMsg = chat.messages[chat.messages.length - 1];

                            return (
                                <button
                                    key={chat.visitorId}
                                    onClick={() => handleChatSelect(chat)}
                                    className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-start gap-3 group
                                        ${isActive 
                                            ? 'bg-primary-50 ring-1 ring-primary-200' 
                                            : 'hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="relative flex-shrink-0">
                                        <div className={`size-10 rounded-xl flex items-center justify-center font-bold text-sm transition-colors
                                            ${isActive 
                                                ? 'bg-primary-600 text-white shadow-md shadow-primary-200' 
                                                : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            {chat.name?.charAt(0)?.toUpperCase() || 'V'}
                                        </div>
                                        {/* Online dot */}
                                        <div className="absolute -bottom-0.5 -right-0.5 size-3 bg-emerald-400 border-2 border-white rounded-full" />
                                        {/* Assigned badge (Commented out)
                                        {chat.assignedTo && (
                                            <div className={`absolute -top-1 -left-1 size-4 rounded-full border-2 border-white flex items-center justify-center
                                                ${String(chat.assignedTo) === String(currentUserId) ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                                                <User size={8} className="text-white" />
                                            </div>
                                        )} */}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center">
                                            <h4 className={`font-bold truncate text-sm ${isActive ? 'text-primary-900' : 'text-gray-800'}`}>
                                                {chat.name || 'Visitor'}
                                            </h4>
                                            <span className="text-[10px] text-gray-400 flex-shrink-0 ml-2">
                                                {formatTime(chat.lastMessageAt)}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-400 truncate mt-0.5">
                                            {isTyping ? (
                                                <span className="text-emerald-500 font-medium italic">typing...</span>
                                            ) : (
                                                lastMsg?.text || 'Started chat'
                                            )}
                                        </p>
                                        <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                                            {chat.status === 'pending' && (
                                                <span className="bg-amber-100 text-amber-700 text-[9px] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider">New</span>
                                            )}
                                            {/* {chat.assignedTo && currentUserId && String(chat.assignedTo) === String(currentUserId) ? (
                                                <span className="bg-emerald-50 text-emerald-600 text-[9px] px-1.5 py-0.5 rounded-md font-semibold uppercase tracking-wider">You</span>
                                            ) : chat.assignedTo ? (
                                                <span className="bg-gray-100 text-gray-400 text-[9px] px-1.5 py-0.5 rounded-md font-medium uppercase italic">Other Agent</span>
                                            ) : null} */}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                        {chats.filter(c => c.status !== 'closed').length === 0 && (
                            <div className="p-10 text-center">
                                <div className="size-16 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
                                    <MessageCircle size={28} className="text-gray-300" />
                                </div>
                                <p className="text-sm font-bold text-gray-400">No active chats</p>
                                <p className="text-xs text-gray-300 mt-1">Waiting for visitors...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Chat Window */}
            <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                {activeChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between bg-white">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="size-11 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-primary-200">
                                        {activeChat.name?.charAt(0)?.toUpperCase() || 'V'}
                                    </div>
                                    <div className="absolute -bottom-0.5 -right-0.5 size-3 bg-emerald-400 border-2 border-white rounded-full" />
                                </div>
                                <div>
                                    <h2 className="font-bold text-gray-900 text-sm">{activeChat.name || 'Visitor'}</h2>
                                    <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5">
                                        {isVisitorCurrentlyTyping ? (
                                            <span className="text-emerald-500 font-medium flex items-center gap-1">
                                                <span className="inline-flex gap-0.5">
                                                    <span className="typing-dot-sm" style={{ animationDelay: '0ms' }} />
                                                    <span className="typing-dot-sm" style={{ animationDelay: '150ms' }} />
                                                    <span className="typing-dot-sm" style={{ animationDelay: '300ms' }} />
                                                </span>
                                                typing...
                                            </span>
                                        ) : (
                                            <>
                                                {activeChat.email && <span>{activeChat.email}</span>}
                                                {activeChat.email && activeChat.phone && <span>•</span>}
                                                {activeChat.phone && <span>{activeChat.phone}</span>}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                {isClaimedByMe && (
                                    <button 
                                        onClick={() => setShowCloseConfirm(true)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg border border-red-100 transition-colors"
                                    >
                                        <CheckCircle size={13} />
                                        Complete
                                    </button>
                                )}

                                {isUnclaimed && (
                                    <button 
                                        onClick={handleClaimChat}
                                        disabled={isJoining}
                                        className="py-2 px-4 text-xs bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-sm shadow-primary-200 flex items-center gap-2 transition-colors"
                                    >
                                        {isJoining ? <Loader2 className="animate-spin size-3.5" /> : null}
                                        {isJoining ? 'Joining...' : 'Join Chat'}
                                    </button>
                                )}
                                {/* {!isUnclaimed && !isClaimedByMe && (
                                    <div className="flex items-center gap-1.5 text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg text-[11px] font-semibold">
                                        <User size={12} />
                                        Another agent
                                    </div>
                                )} */}
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1 bg-gradient-to-b from-gray-50/50 to-white">
                            {/* Date divider */}
                            <div className="flex items-center justify-center py-3">
                                <div className="bg-gray-100 text-gray-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                                    Today
                                </div>
                            </div>

                            {getMessageGroups(activeChat.messages).map((msg, idx) => {
                                const isAdmin = msg.isAdmin;
                                const isBot = msg.sender === 'bot';

                                if (isBot) {
                                    return (
                                        <div key={idx} className="flex justify-center py-1.5">
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100/60 rounded-full">
                                                <Bot size={11} className="text-gray-400" />
                                                <span className="text-[10px] font-medium text-gray-400">{msg.text}</span>
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <div key={idx} className={`flex items-end gap-2 ${isAdmin ? 'justify-end' : 'justify-start'} ${msg.isFirst ? 'mt-3' : 'mt-0.5'}`}>
                                        {/* Avatar for visitor - only on last message in group */}
                                        {!isAdmin && (
                                            <div className={`size-7 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-opacity
                                                ${msg.isLast ? 'bg-gray-200 text-gray-500' : 'opacity-0'}`}>
                                                {activeChat.name?.charAt(0)?.toUpperCase() || 'V'}
                                            </div>
                                        )}
                                        
                                        <div className="flex flex-col gap-0.5">
                                            {/* Sender label on first message */}
                                            {msg.isFirst && (
                                                <span className={`text-[9px] font-bold uppercase tracking-widest mb-0.5 ${isAdmin ? 'text-right text-primary-400' : 'text-left text-gray-400'}`}>
                                                    {isAdmin ? 'You' : activeChat.name || 'Visitor'}
                                                </span>
                                            )}
                                            <div className={`max-w-[420px] px-4 py-2.5 text-[13px] leading-relaxed font-medium shadow-sm
                                                ${isAdmin 
                                                    ? `bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-primary-100/40
                                                       ${msg.isFirst && msg.isLast ? 'rounded-2xl rounded-br-sm' : msg.isFirst ? 'rounded-2xl rounded-br-md' : msg.isLast ? 'rounded-2xl rounded-tr-md rounded-br-sm' : 'rounded-xl rounded-r-md'}`
                                                    : `bg-white text-gray-700 border border-gray-100
                                                       ${msg.isFirst && msg.isLast ? 'rounded-2xl rounded-bl-sm' : msg.isFirst ? 'rounded-2xl rounded-bl-md' : msg.isLast ? 'rounded-2xl rounded-tl-md rounded-bl-sm' : 'rounded-xl rounded-l-md'}`
                                                }`}
                                            >
                                                {msg.text}
                                            </div>
                                            {/* Timestamp on last message */}
                                            {msg.isLast && (
                                                <span className={`text-[9px] font-medium text-gray-300 ${isAdmin ? 'text-right' : 'text-left'}`}>
                                                    {formatTime(msg.timestamp)}
                                                </span>
                                            )}
                                        </div>

                                        {/* Avatar for admin - only on last message in group */}
                                        {isAdmin && (
                                            <div className={`size-7 rounded-lg flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-opacity
                                                ${msg.isLast ? 'bg-primary-100 text-primary-600' : 'opacity-0'}`}>
                                                {currentUser?.name?.charAt(0)?.toUpperCase() || 'A'}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            {/* Visitor Typing Indicator */}
                            {isVisitorCurrentlyTyping && (
                                <TypingIndicator name={activeChat.name || 'Visitor'} />
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="px-4 py-3 bg-white border-t border-gray-100">
                             {isClaimedByMe ? (
                                <div className="flex flex-col gap-3">
                                    <div className="flex gap-2 items-end">
                                        <div className="flex-1 relative">
                                            <input 
                                                type="text" 
                                                className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-4 pr-4 py-3 text-[13px] font-medium text-gray-900 outline-none transition-all duration-200 focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-500/10"
                                                placeholder="Type your reply..."
                                                value={inputText}
                                                onChange={handleInputChange}
                                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                                onBlur={emitAdminStopTyping}
                                            />
                                        </div>
                                        <button 
                                            onClick={() => handleSendMessage()}
                                            disabled={!inputText.trim()}
                                            className="bg-gradient-to-br from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800 text-white rounded-xl p-3 flex items-center justify-center shadow-md shadow-primary-200/50 transition-all disabled:opacity-30 disabled:shadow-none active:scale-95"
                                        >
                                            <Send size={18} />
                                        </button>
                                    </div>
                                </div>
                             ) : isUnclaimed ? (
                                 <div className="flex flex-col items-center gap-3 py-3">
                                     <p className="text-sm font-semibold text-gray-400">Join this conversation to start replying</p>
                                     <button 
                                         onClick={handleClaimChat}
                                         disabled={isJoining}
                                         className="py-2.5 px-8 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-200/50 flex items-center gap-2 transition-all hover:shadow-xl active:scale-95"
                                     >
                                         {isJoining ? <Loader2 className="animate-spin size-4" /> : <MessageCircle size={16} />}
                                         {isJoining ? 'Joining...' : 'Join & Reply'}
                                     </button>
                                 </div>
                             ) : null}
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="size-20 rounded-3xl bg-gray-50 flex items-center justify-center mb-5">
                            <MessageCircle size={36} className="text-gray-200" />
                        </div>
                        <h3 className="text-base font-bold text-gray-400 mb-1">Select a conversation</h3>
                        <p className="text-sm text-gray-300">Choose a chat from the sidebar to start messaging</p>
                    </div>
                )}
            </div>

            {/* Close Confirmation Modal */}
            <Modal
                isOpen={showCloseConfirm}
                onClose={() => setShowCloseConfirm(false)}
                title="Complete Session?"
                size="sm"
                footer={(
                    <div className="flex gap-3 w-full">
                        <button 
                            onClick={() => setShowCloseConfirm(false)}
                            className="flex-1 py-3 bg-slate-50 text-slate-600 rounded-xl font-bold hover:bg-slate-100 transition-all active:scale-95 text-[10px] uppercase tracking-widest"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleCloseChat}
                            className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 shadow-lg shadow-red-200 transition-all active:scale-95 text-[10px] uppercase tracking-widest"
                        >
                            Archive
                        </button>
                    </div>
                )}
            >
                <div className="text-center py-4">
                    <div className="mx-auto size-16 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 mb-5 border border-red-100 shadow-sm">
                        <AlertCircle size={32} />
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">
                        This chat will be archived and the visitor will be notified.
                    </p>
                </div>
            </Modal>
        </div>
    );
};

export default LiveChat;
