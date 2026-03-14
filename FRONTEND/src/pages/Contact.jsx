import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <main className="flex-grow py-16 px-6 max-w-5xl mx-auto w-full">

        <div className="mb-10">
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>Contact <span style={{ color: 'var(--color-accent)' }}>Us</span></h1>
          <p className="text-sm" style={{ color: 'var(--color-muted)' }}>We're here to help with your construction material needs.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {[
              { Icon: MapPin, label: 'Store Location', lines: ['124 Main Building Road,', 'Industrial Estate, City 500000'] },
              { Icon: Phone, label: 'Phone & WhatsApp', lines: ['+91 98765 43210', '+91 98765 43211'] },
              { Icon: Mail, label: 'Email', lines: ['support@vasavitraders.com'] },
              { Icon: Clock, label: 'Hours', lines: ['Mon–Sat: 8:00 AM – 8:00 PM', 'Sunday: 9:00 AM – 2:00 PM'] },
            ].map(({ Icon, label, lines }) => (
              <div key={label} className="card p-5 flex items-start gap-4 transition-all"
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(75,124,243,0.3)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}>
                <div className="p-2.5 rounded-lg" style={{ background: 'rgba(75,124,243,0.08)', border: '1px solid rgba(75,124,243,0.15)' }}>
                  <Icon className="h-5 w-5" style={{ color: 'var(--color-accent)' }} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>{label}</h3>
                  {lines.map(l => <p key={l} className="text-sm" style={{ color: 'var(--color-muted)' }}>{l}</p>)}
                </div>
              </div>
            ))}
          </div>

          <div className="card flex items-center justify-center h-80 lg:h-auto" style={{ minHeight: '320px' }}>
            <div className="text-center">
              <MapPin className="h-10 w-10 mx-auto mb-3" style={{ color: 'var(--color-border)' }} />
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>Map placeholder</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
