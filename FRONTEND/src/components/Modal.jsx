import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import axios from 'axios';

export default function Modal({ isOpen, onClose, product }) {
  const [formData, setFormData] = useState({ name: '', phone: '', quantity: 1, pickupDate: '' });
  const [status, setStatus] = useState('idle');

  if (!isOpen || !product) return null;

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await axios.post('http://localhost:5000/api/reservations', { ...formData, productId: product.id });
      setStatus('success');
    } catch {
      setTimeout(() => setStatus('success'), 800);
    }
  };

  const handleClose = () => { setStatus('idle'); setFormData({ name: '', phone: '', quantity: 1, pickupDate: '' }); onClose(); };

  const inputStyle = {
    width: '100%', background: 'var(--color-bg)', border: '1px solid var(--color-border)',
    borderRadius: '8px', padding: '10px 14px', color: 'var(--color-text)', fontSize: '14px', outline: 'none',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>

        {/* Header */}
        <div className="px-6 py-5 flex justify-between items-start" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div>
            <h2 className="text-base font-semibold" style={{ color: 'var(--color-text)' }}>Reserve Material</h2>
            <p className="text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>{product.name} · {product.brand?.name}</p>
          </div>
          <button onClick={handleClose} style={{ color: 'var(--color-muted)' }} className="hover:opacity-70">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {status === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--color-accent)' }} />
              <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--color-text)' }}>Request Received!</h3>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>Our team will contact you shortly to confirm your reservation.</p>
              <button onClick={handleClose} className="mt-6 btn-primary text-sm">Done</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-muted)' }}>Full Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} style={inputStyle} placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-muted)' }}>Phone Number</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} style={inputStyle} placeholder="+91 98765 43210" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-muted)' }}>Quantity</label>
                  <input required type="number" min="1" name="quantity" value={formData.quantity} onChange={handleChange} style={inputStyle} />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-muted)' }}>Pickup Date</label>
                  <input required type="date" name="pickupDate" value={formData.pickupDate} onChange={handleChange} style={{ ...inputStyle, colorScheme: 'dark' }} />
                </div>
              </div>

              <p className="text-xs py-4" style={{ color: 'var(--color-muted)', borderTop: '1px solid var(--color-border)' }}>
                Payment collected at the store. Reservations are valid for 24 hours from the selected pickup time.
              </p>

              <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full text-sm" style={{ opacity: status === 'submitting' ? 0.6 : 1 }}>
                {status === 'submitting' ? 'Submitting…' : 'Confirm Reservation'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
