import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, HardHat } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav style={{ backgroundColor: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)' }}
         className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <HardHat style={{ color: 'var(--color-accent)' }} className="h-6 w-6" />
            <span className="text-lg font-semibold tracking-wide" style={{ color: 'var(--color-text)' }}>
              Vasavi <span style={{ color: 'var(--color-accent)' }}>Traders</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Home', to: '/' },
              { label: 'Products', to: '/products' },
              { label: 'Price Compare', to: '/products?tab=compare' },
              { label: 'Contact', to: '/contact' },
            ].map(link => (
              <Link key={link.label} to={link.to}
                style={{ color: 'var(--color-muted)' }}
                className="text-sm font-medium hover:opacity-100 transition-opacity"
                onMouseEnter={e => e.target.style.color = 'var(--color-text)'}
                onMouseLeave={e => e.target.style.color = 'var(--color-muted)'}>
                {link.label}
              </Link>
            ))}
            <Link to="/nova"
              style={{ color: 'var(--color-accent)' }}
              className="text-sm font-medium flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                  style={{ backgroundColor: 'var(--color-accent)' }}></span>
                <span className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: 'var(--color-accent)' }}></span>
              </span>
              Nova AI
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer"
               style={{ border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
               className="text-sm px-4 py-2 rounded-lg font-medium transition-colors hover:border-green-500 hover:text-green-400">
              WhatsApp
            </a>
            <Link to="/products"
              className="btn-primary text-sm">
              Reserve Materials
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)}
            className="md:hidden" style={{ color: 'var(--color-muted)' }}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div style={{ backgroundColor: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }} className="md:hidden px-6 py-4 space-y-3">
          {['/', '/products', '/nova', '/contact'].map((to, i) => (
            <Link key={to} to={to}
              className="block text-sm py-2"
              style={{ color: 'var(--color-muted)' }}
              onClick={() => setIsOpen(false)}>
              {['Home', 'Products', 'Nova AI', 'Contact'][i]}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
