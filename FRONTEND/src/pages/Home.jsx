import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import ThreeDHero from '../components/ThreeDHero';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />

      <main className="flex-grow">
        <section className="relative overflow-hidden py-24 lg:py-32" style={{ backgroundColor: 'var(--color-bg)' }}>

          {/* Very subtle grid background */}
          <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
            backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-12 gap-8 items-center">

              {/* Text */}
              <div className="lg:col-span-6 text-left">
                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase"
                  style={{ background: 'rgba(75,124,243,0.1)', color: 'var(--color-accent)', border: '1px solid rgba(75,124,243,0.2)' }}>
                  <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse" style={{ backgroundColor: 'var(--color-accent)' }}></span>
                  Trusted Construction Partner
                </div>

                <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight mb-6"
                  style={{ color: 'var(--color-text)' }}>
                  Smart Materials<br />
                  <span style={{ color: 'var(--color-accent)' }}>Supply</span> for<br />
                  Modern Builders
                </h1>

                <p className="text-base md:text-lg leading-relaxed mb-10 max-w-lg"
                  style={{ color: 'var(--color-muted)' }}>
                  Vasavi Traders provides high-quality cement, hardware, pipes, electrical items, and construction materials trusted by builders and homeowners.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link to="/products" className="btn-primary text-sm">
                    Explore Products
                  </Link>
                  <a href="#reserve" className="btn-outline text-sm">
                    Reserve Materials
                  </a>
                </div>

                {/* Stats row */}
                <div className="mt-12 flex gap-8">
                  {[['500+', 'Projects'], ['12+', 'Years'], ['50+', 'Brands']].map(([n, l]) => (
                    <div key={l}>
                      <div className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{n}</div>
                      <div className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Illustration */}
              <div className="lg:col-span-6 h-80 md:h-96 lg:h-[480px] rounded-2xl overflow-hidden"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                <ThreeDHero />
              </div>

            </div>
          </div>
        </section>

        {/* Trusted Brands Strip */}
        <section className="py-10" style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-8 items-center justify-center">
            <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--color-muted)' }}>Trusted brands</p>
            {['Asian Paints', 'Nagarjuna', 'UltraTech', 'Ramco', 'Supreme', 'Finolex'].map(b => (
              <span key={b} className="text-sm font-semibold" style={{ color: 'var(--color-muted)', opacity: 0.7 }}>{b}</span>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
