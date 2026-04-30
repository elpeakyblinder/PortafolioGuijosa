import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

const WELCOME_MESSAGE: Message = {
    id: 'welcome',
    role: 'assistant',
    content: '¡Hola! Soy el asistente de Guijosa 👋 Pregúntame lo que quieras sobre Carlos, sus servicios o proyectos. También puedo ayudarte a agendar una consulta directa con él.'
};

const quickReplies = [
    "¿Quién es Guijosa?",
    "¿Qué servicios ofrece?",
    "Quiero agendar una consulta",
    "Automatización con IA",
    "¿Qué proyectos ha hecho?",
];

function TypingIndicator() {
    return (
        <div className="typing-indicator">
            <span /><span /><span />
        </div>
    );
}

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showQuickReplies, setShowQuickReplies] = useState(true);
    const [booked, setBooked] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [ttsEnabled, setTtsEnabled] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    useEffect(() => {
        if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
    }, [isOpen]);

    const speak = (text: string) => {
        if (!ttsEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-MX';
        utterance.rate = 1.05;
        utterance.pitch = 1;

        // Intentar usar voz en español
        const voices = window.speechSynthesis.getVoices();
        const esVoice = voices.find(v => v.lang.startsWith('es') && v.name.includes('Google')) ||
                        voices.find(v => v.lang.startsWith('es-MX')) ||
                        voices.find(v => v.lang.startsWith('es'));
        if (esVoice) utterance.voice = esVoice;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    };

    const stopSpeaking = () => {
        window.speechSynthesis?.cancel();
        setIsSpeaking(false);
    };

    const sendMessage = async (content: string) => {
        if (!content.trim() || isLoading || booked) return;

        setShowQuickReplies(false);
        const userMsg: Message = { id: Date.now().toString(), role: 'user', content: content.trim() };
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: newMessages
                        .filter(m => m.id !== 'welcome')
                        .map(m => ({ role: m.role, content: m.content }))
                })
            });

            const data = await res.json();
            if (data.booked) setBooked(true);

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.message
            }]);
            speak(data.message);
        } catch {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'Lo siento, hubo un error de conexión. Intenta de nuevo o usa el formulario de contacto.'
            }]);
        } finally {
            setIsLoading(false);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };

    const hasSpeechSupport = typeof window !== 'undefined' &&
        ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
            return;
        }

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) return;

        const recognition = new SpeechRecognition();
        recognition.lang = 'es-MX';
        recognition.interimResults = true;
        recognition.continuous = false;

        recognition.onresult = (event: any) => {
            const transcript = Array.from(event.results)
                .map((r: any) => r[0].transcript)
                .join('');
            setInput(transcript);

            if (event.results[0].isFinal) {
                setIsListening(false);
                sendMessage(transcript);
            }
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);

        recognitionRef.current = recognition;
        recognition.start();
        setIsListening(true);
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={() => setIsOpen(prev => !prev)}
                className="chatbot-fab"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.svg
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </motion.svg>
                    ) : (
                        <motion.svg
                            key="chat"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </motion.svg>
                    )}
                </AnimatePresence>
                {!isOpen && <span className="chatbot-fab-pulse" />}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="chatbot-window"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Header */}
                        <div className="chatbot-header">
                            <div className="chatbot-header-info">
                                <motion.img
                                    src="/logo/logo.webp"
                                    alt="Guijosa"
                                    className="chatbot-avatar"
                                    animate={(isLoading || isSpeaking) ? {
                                        scale: [1, 1.15, 1],
                                        rotate: [0, -5, 5, -3, 0],
                                    } : {}}
                                    transition={(isLoading || isSpeaking) ? {
                                        duration: 0.8,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    } : {}}
                                />
                                <div>
                                    <h3>Asistente Guijosa</h3>
                                    <span className="chatbot-status">
                                        <span className="chatbot-status-dot" />
                                        {isSpeaking ? 'Hablando...' : 'En línea'}
                                    </span>
                                </div>
                            </div>
                            <div className="chatbot-header-actions">
                                <button
                                    onClick={() => { if (isSpeaking) stopSpeaking(); setTtsEnabled(prev => !prev); }}
                                    className={`chatbot-close ${ttsEnabled ? 'chatbot-tts-on' : ''}`}
                                    aria-label={ttsEnabled ? "Silenciar voz" : "Activar voz"}
                                    title={ttsEnabled ? "Silenciar voz" : "Activar voz"}
                                >
                                    {ttsEnabled ? (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                                        </svg>
                                    ) : (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                            <line x1="23" y1="9" x2="17" y2="15" />
                                            <line x1="17" y1="9" x2="23" y2="15" />
                                        </svg>
                                    )}
                                </button>
                                <button
                                    onClick={() => { stopSpeaking(); setIsOpen(false); }}
                                    className="chatbot-close"
                                    aria-label="Cerrar chat"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="chatbot-messages">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20, y: 10 }}
                                    animate={{ opacity: 1, x: 0, y: 0 }}
                                    transition={{ duration: 0.3, delay: i === messages.length - 1 ? 0.1 : 0 }}
                                    className={`chatbot-msg chatbot-msg-${msg.role}`}
                                >
                                    {msg.content}
                                </motion.div>
                            ))}

                            {showQuickReplies && (
                                <motion.div
                                    className="chatbot-quick-replies"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.3 }}
                                >
                                    {quickReplies.map((qr) => (
                                        <button
                                            key={qr}
                                            onClick={() => sendMessage(qr)}
                                            className="chatbot-chip"
                                        >
                                            {qr}
                                        </button>
                                    ))}
                                </motion.div>
                            )}

                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="chatbot-msg chatbot-msg-assistant"
                                >
                                    <TypingIndicator />
                                </motion.div>
                            )}

                            {booked && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="chatbot-booked"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    Correos enviados exitosamente
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="chatbot-input-area">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={booked ? "Consulta finalizada" : isListening ? "Escuchando..." : "Escribe tu mensaje..."}
                                disabled={isLoading || booked}
                                className={`chatbot-input ${isListening ? 'chatbot-input-listening' : ''}`}
                            />
                            {hasSpeechSupport && (
                                <button
                                    type="button"
                                    onClick={toggleListening}
                                    disabled={isLoading || booked}
                                    className={`chatbot-mic ${isListening ? 'chatbot-mic-active' : ''}`}
                                    aria-label={isListening ? "Dejar de escuchar" : "Hablar"}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                        <line x1="12" y1="19" x2="12" y2="22" />
                                    </svg>
                                    {isListening && <span className="chatbot-mic-pulse" />}
                                </button>
                            )}
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading || booked}
                                className="chatbot-send"
                                aria-label="Enviar mensaje"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .chatbot-fab {
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    background: var(--clr-accent);
                    color: var(--clr-dark-space);
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    box-shadow: 0 4px 20px rgba(118, 171, 174, 0.4);
                }

                .chatbot-fab-pulse {
                    position: absolute;
                    inset: -4px;
                    border-radius: 50%;
                    border: 2px solid var(--clr-accent);
                    animation: chatbot-pulse 2s ease-in-out infinite;
                    pointer-events: none;
                }

                @keyframes chatbot-pulse {
                    0%, 100% { opacity: 0; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.15); }
                }

                .chatbot-window {
                    position: fixed;
                    bottom: 92px;
                    right: 24px;
                    width: 380px;
                    height: 560px;
                    background: var(--clr-dark-space);
                    border: 1px solid rgba(118, 171, 174, 0.2);
                    border-radius: 16px;
                    z-index: 999;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(118, 171, 174, 0.1);
                }

                @media (max-width: 480px) {
                    .chatbot-window {
                        inset: 0;
                        width: 100%;
                        height: 100%;
                        border-radius: 0;
                        bottom: 0;
                        right: 0;
                    }
                }

                .chatbot-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 16px 20px;
                    background: var(--clr-dark-slate);
                    border-bottom: 1px solid rgba(118, 171, 174, 0.15);
                }

                .chatbot-header-info {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .chatbot-avatar {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    object-fit: contain;
                    flex-shrink: 0;
                    background: var(--clr-dark-space);
                    padding: 2px;
                }

                .chatbot-header h3 {
                    margin: 0;
                    font-size: 14px;
                    color: var(--clr-light-text);
                    font-weight: 600;
                }

                .chatbot-status {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    font-size: 11px;
                    color: var(--clr-text-secundary);
                }

                .chatbot-status-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #4ade80;
                    display: inline-block;
                }

                .chatbot-header-actions {
                    display: flex;
                    gap: 4px;
                }

                .chatbot-tts-on {
                    color: var(--clr-accent) !important;
                }

                .chatbot-close {
                    background: none;
                    border: none;
                    color: var(--clr-text-secundary);
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 6px;
                    display: flex;
                    transition: color 0.2s, background 0.2s;
                }

                .chatbot-close:hover {
                    color: var(--clr-light-text);
                    background: rgba(255, 255, 255, 0.05);
                }

                .chatbot-messages {
                    flex: 1;
                    overflow-y: auto;
                    padding: 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    scrollbar-width: thin;
                    scrollbar-color: rgba(118, 171, 174, 0.2) transparent;
                }

                .chatbot-messages::-webkit-scrollbar {
                    width: 4px;
                }

                .chatbot-messages::-webkit-scrollbar-thumb {
                    background: rgba(118, 171, 174, 0.2);
                    border-radius: 4px;
                }

                .chatbot-msg {
                    max-width: 80%;
                    padding: 10px 14px;
                    border-radius: 14px;
                    font-size: 13.5px;
                    line-height: 1.5;
                    word-wrap: break-word;
                }

                .chatbot-msg-assistant {
                    align-self: flex-start;
                    background: var(--clr-dark-slate);
                    color: var(--clr-light-text);
                    border-bottom-left-radius: 4px;
                }

                .chatbot-msg-user {
                    align-self: flex-end;
                    background: var(--clr-accent);
                    color: var(--clr-dark-space);
                    border-bottom-right-radius: 4px;
                    font-weight: 500;
                }

                .chatbot-quick-replies {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                    padding: 4px 0;
                }

                .chatbot-chip {
                    padding: 6px 14px;
                    border-radius: 20px;
                    border: 1px solid rgba(118, 171, 174, 0.4);
                    background: transparent;
                    color: var(--clr-accent);
                    font-size: 12px;
                    cursor: pointer;
                    transition: all 0.2s;
                    white-space: nowrap;
                }

                .chatbot-chip:hover {
                    background: rgba(118, 171, 174, 0.15);
                    border-color: var(--clr-accent);
                }

                .chatbot-booked {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 14px;
                    border-radius: 10px;
                    background: rgba(74, 222, 128, 0.1);
                    border: 1px solid rgba(74, 222, 128, 0.3);
                    color: #4ade80;
                    font-size: 13px;
                    font-weight: 500;
                    align-self: center;
                }

                .typing-indicator {
                    display: flex;
                    gap: 4px;
                    padding: 4px 0;
                }

                .typing-indicator span {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: var(--clr-accent);
                    opacity: 0.4;
                    animation: typing-bounce 1.4s ease-in-out infinite;
                }

                .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
                .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

                @keyframes typing-bounce {
                    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
                    30% { transform: translateY(-6px); opacity: 1; }
                }

                .chatbot-input-area {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 16px;
                    border-top: 1px solid rgba(118, 171, 174, 0.1);
                    background: var(--clr-dark-slate);
                }

                .chatbot-input {
                    flex: 1;
                    background: var(--clr-dark-space);
                    border: 1px solid rgba(118, 171, 174, 0.15);
                    border-radius: 10px;
                    padding: 10px 14px;
                    color: var(--clr-light-text);
                    font-size: 13.5px;
                    outline: none;
                    transition: border-color 0.2s;
                    font-family: inherit;
                }

                .chatbot-input:focus {
                    border-color: rgba(118, 171, 174, 0.4);
                }

                .chatbot-input::placeholder {
                    color: var(--clr-text-secundary);
                    opacity: 0.6;
                }

                .chatbot-input:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .chatbot-input-listening {
                    border-color: #ef4444 !important;
                    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
                }

                .chatbot-mic {
                    width: 38px;
                    height: 38px;
                    border-radius: 10px;
                    background: transparent;
                    color: var(--clr-text-secundary);
                    border: 1px solid rgba(118, 171, 174, 0.15);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    transition: all 0.2s;
                    position: relative;
                }

                .chatbot-mic:hover:not(:disabled) {
                    color: var(--clr-accent);
                    border-color: rgba(118, 171, 174, 0.4);
                }

                .chatbot-mic-active {
                    background: rgba(239, 68, 68, 0.15) !important;
                    color: #ef4444 !important;
                    border-color: #ef4444 !important;
                }

                .chatbot-mic-pulse {
                    position: absolute;
                    inset: -3px;
                    border-radius: 10px;
                    border: 2px solid #ef4444;
                    animation: mic-pulse 1.2s ease-in-out infinite;
                    pointer-events: none;
                }

                @keyframes mic-pulse {
                    0%, 100% { opacity: 0; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.1); }
                }

                .chatbot-mic:disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                }

                .chatbot-send {
                    width: 38px;
                    height: 38px;
                    border-radius: 10px;
                    background: var(--clr-accent);
                    color: var(--clr-dark-space);
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    transition: opacity 0.2s, transform 0.2s;
                }

                .chatbot-send:hover:not(:disabled) {
                    transform: scale(1.05);
                }

                .chatbot-send:disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                }
            `}</style>
        </>
    );
}
