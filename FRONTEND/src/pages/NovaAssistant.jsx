import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Mic, Send, Upload, Sparkles, AlertTriangle, Play } from 'lucide-react';

export default function NovaAssistant() {
  const [messages, setMessages] = useState([{
    id: 1, sender: 'nova',
    text: 'Hello! I am Nova, your AI construction assistant. I can help you estimate materials, choose the right brands, or identify cracks in your walls. How can I assist you today? (నమస్కారం! నేను నోవా, నేను మీకు ఎలా సహాయపడగలను?)',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleMicrophoneClick = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) { alert("Browser Speech Recognition not available."); return; }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const r = new SR(); r.lang = 'te-IN'; r.interimResults = false;
    r.onstart = () => setIsListening(true); r.onend = () => setIsListening(false);
    r.onerror = () => setIsListening(false);
    r.onresult = e => { const t = e.results[0][0].transcript; setInputValue(t); setTimeout(() => submitQuery(t), 500); };
    r.start();
  };

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    const u = new SpeechSynthesisUtterance(text); u.lang = 'te-IN'; u.rate = 0.9;
    u.onstart = () => setIsSynthesizing(true); u.onend = () => setIsSynthesizing(false);
    window.speechSynthesis.speak(u);
  };

  const processQuery = (query) => {
    const q = query.toLowerCase();
    if (q.includes('1000') && (q.includes('sq ft') || q.includes('square'))) {
      if (q.includes('cement')) return "For a 1000 sq ft house, you need approximately 400–450 bags of cement. We recommend Nagarjuna OPC 53 Grade for structural work. (1000 చ.అ. ఇంటికి సుమారు 400-450 బస్తాల సిమెంట్ అవసరం.)";
      if (q.includes('brick')) return "For a 1000 sq ft house, you will need around 25,000–30,000 standard bricks.";
      if (q.includes('steel') || q.includes('iron')) return "For a 1000 sq ft house, estimate approximately 2.5–3 metric tons of steel.";
      return "For a 1000 sq ft house: ~400 bags cement, ~28,000 bricks, ~3 tons steel. What specific material do you need?";
    }
    if (q.includes('which cement') || q.includes('best cement')) return "For structural work (slabs, columns) use OPC 53 Grade (Nagarjuna or UltraTech). For plastering, PPC Cement is cost-effective.";
    if (q.includes('pipes') || q.includes('plumbing')) return "For hot water use CPVC pipes (Ashirvad). For cold water/drainage, PVC or UPVC (Supreme, Finolex) work well.";
    if (q.includes('paint')) return "Asian Paints and Berger are top choices. For exteriors use weather-resistant emulsions. Coverage is 120–140 sq ft per litre.";
    return "I'm still learning! For complex estimates, contact our team via WhatsApp. You can also upload a photo of a crack for analysis. (మీ గోడలో పగుళ్లు ఉంటే ఫోటో అప్‌లోడ్ చేయండి)";
  };

  const submitQuery = (queryText = inputValue) => {
    if (!queryText.trim()) return;
    const userMsg = { id: Date.now(), sender: 'user', text: queryText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setTimeout(() => {
      const responseText = processQuery(queryText);
      const novaMsg = { id: Date.now() + 1, sender: 'nova', text: responseText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages(prev => [...prev, novaMsg]);
      speakText(responseText);
    }, 900);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', image: imageUrl, text: 'Uploaded image for crack analysis', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setTimeout(() => {
      const isPlaster = Math.random() > 0.5;
      const text = isPlaster
        ? "This appears to be a surface plaster crack — non-structural. Fill with crack putty, then apply primer and paint. (ఇది ప్లాస్టర్ పగుళ్లు — సిమెంట్ పుట్టీతో సరిచేయవచ్చు.)"
        : "Warning: This may indicate a structural crack from foundation settlement. Consult a structural engineer. Do not just patch it. (ఇది నిర్మాణపరమైన పగుళ్లు కావచ్చు — దయచేసి ఇంజనీర్‌ను సంప్రదించండి.)";
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'nova', text, isAlert: !isPlaster, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      speakText(text);
    }, 1800);
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />

      <main className="flex-grow flex flex-col max-w-3xl mx-auto w-full px-4 sm:px-6 py-8" style={{ height: 'calc(100vh - 64px)' }}>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5 p-4 rounded-xl"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <div className="relative p-2 rounded-lg" style={{ background: 'rgba(75,124,243,0.1)' }}>
            <Sparkles className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70" style={{ backgroundColor: 'var(--color-accent)' }}></span>
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: 'var(--color-accent)' }}></span>
            </span>
          </div>
          <div>
            <h1 className="text-base font-semibold" style={{ color: 'var(--color-text)' }}>Nova AI Assistant</h1>
            <p className="text-xs" style={{ color: 'var(--color-muted)' }}>Material Estimations · Crack Detection · Telugu Voice</p>
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-grow rounded-xl overflow-hidden flex flex-col mb-4"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>

          <div className="flex-grow overflow-y-auto p-5 space-y-5">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>

                {msg.sender === 'nova' && (
                  <div className="w-7 h-7 rounded-full mt-1 mr-3 flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(75,124,243,0.12)', border: '1px solid rgba(75,124,243,0.2)' }}>
                    <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
                  </div>
                )}

                <div className="max-w-[78%] rounded-xl p-4"
                  style={msg.sender === 'user'
                    ? { background: 'rgba(75,124,243,0.15)', border: '1px solid rgba(75,124,243,0.25)', color: 'var(--color-text)', borderTopRightRadius: '4px' }
                    : msg.isAlert
                      ? { background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.25)', color: 'var(--color-text)', borderTopLeftRadius: '4px' }
                      : { background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', borderTopLeftRadius: '4px' }}>

                  {msg.isAlert && (
                    <div className="flex items-center gap-2 mb-2 text-sm font-medium" style={{ color: '#f87171' }}>
                      <AlertTriangle className="w-4 h-4" /> Structural Warning
                    </div>
                  )}
                  {msg.image && <img src={msg.image} alt="Crack" className="w-full max-w-xs rounded-lg mb-3" style={{ border: '1px solid var(--color-border)' }} />}
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <div className="flex items-center justify-end gap-2 mt-2">
                    {msg.sender === 'nova' && (
                      <button onClick={() => speakText(msg.text)} title="Play in Telugu" style={{ color: 'var(--color-muted)' }}>
                        <Play className="w-3 h-3" />
                      </button>
                    )}
                    <span className="text-xs" style={{ color: 'var(--color-muted)' }}>{msg.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
            {isSynthesizing && <p className="text-xs ml-10 animate-pulse" style={{ color: 'var(--color-muted)' }}>Nova is speaking…</p>}
          </div>

          {/* Input */}
          <div className="p-4" style={{ borderTop: '1px solid var(--color-border)' }}>
            <div className="flex items-end gap-2">
              <button onClick={() => fileInputRef.current.click()} title="Upload crack image"
                className="p-2.5 rounded-lg transition-colors"
                style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent)'; e.currentTarget.style.borderColor = 'rgba(75,124,243,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-muted)'; e.currentTarget.style.borderColor = 'var(--color-border)'; }}>
                <Upload className="w-5 h-5" />
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
              </button>

              <textarea value={inputValue} onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitQuery(); } }}
                placeholder="Ask about materials or upload crack image…"
                className="flex-grow rounded-lg px-4 py-2.5 text-sm resize-none focus:outline-none"
                style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', height: '44px' }}
                rows={1} />

              <button onClick={handleMicrophoneClick}
                className="p-2.5 rounded-lg transition-all"
                style={isListening
                  ? { background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)', color: '#f87171' }
                  : { background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}>
                <Mic className="w-5 h-5" />
              </button>

              <button onClick={() => submitQuery()} disabled={!inputValue.trim()}
                className="p-2.5 rounded-lg btn-primary disabled:opacity-40">
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs mt-2 text-center" style={{ color: 'var(--color-muted)' }}>
              Try: "How much cement for 1000 sq ft?" · Voice supports Telugu
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
