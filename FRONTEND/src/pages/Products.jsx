import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import axios from 'axios';
import { Search, ArrowRightLeft, ShieldCheck, ShoppingCart } from 'lucide-react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareList, setCompareList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => { setProducts(res.data); setLoading(false); })
      .catch(() => {
        setProducts([
          { id: 1, name: 'OPC 53 Grade', category: 'Cement', description: 'High strength cement for critical applications.', priceMin: 410, priceMax: 430, brand: { name: 'Nagarjuna Cement' } },
          { id: 2, name: 'PPC Cement', category: 'Cement', description: 'Portland Pozzolana Cement.', priceMin: 400, priceMax: 420, brand: { name: 'UltraTech' } },
          { id: 3, name: 'OPC Cement', category: 'Cement', description: 'Ordinary Portland Cement.', priceMin: 390, priceMax: 410, brand: { name: 'Ramco' } },
          { id: 4, name: 'PVC Pipe', category: 'Pipes', description: 'Durable PVC pipe for plumbing.', priceMin: 200, priceMax: 800, brand: { name: 'Supreme' } },
          { id: 5, name: 'CPVC Pipe', category: 'Pipes', description: 'For hot and cold water distribution.', priceMin: 250, priceMax: 900, brand: { name: 'Ashirvad' } },
          { id: 6, name: 'Plumbing Pipe', category: 'Pipes', description: 'Standard plumbing pipe.', priceMin: 200, priceMax: 750, brand: { name: 'Finolex' } },
          { id: 7, name: 'Interior Paint', category: 'Paint', description: 'Smooth finish interior paint / liter.', priceMin: 300, priceMax: 600, brand: { name: 'Asian Paints' } },
          { id: 8, name: 'Exterior Paint', category: 'Paint', description: 'Weather resistant exterior paint / liter.', priceMin: 350, priceMax: 700, brand: { name: 'Berger' } },
        ]);
        setLoading(false);
      });
  }, []);

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const filteredProducts = products.filter(p =>
    (categoryFilter === 'All' || p.category === categoryFilter) &&
    (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.brand?.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleCompare = (product) => {
    if (compareList.find(p => p.id === product.id)) {
      setCompareList(compareList.filter(p => p.id !== product.id));
    } else {
      if (compareList.length < 2) setCompareList([...compareList, product]);
      else alert("Max 2 products for comparison.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />

      <main className="flex-grow py-12 px-6 max-w-7xl mx-auto w-full">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Materials <span style={{ color: 'var(--color-accent)' }}>Catalog</span></h1>
            <p className="text-sm mt-1.5" style={{ color: 'var(--color-muted)' }}>Browse and compare construction materials</p>
          </div>
          <button onClick={() => setCompareMode(!compareMode)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={compareMode
              ? { background: 'rgba(75,124,243,0.15)', color: 'var(--color-accent)', border: '1px solid rgba(75,124,243,0.3)' }
              : { background: 'var(--color-surface)', color: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
            <ArrowRightLeft className="w-4 h-4" />
            {compareMode ? 'Exit Compare' : 'Compare'}
          </button>
        </div>

        {/* Compare Dock */}
        {compareMode && compareList.length > 0 && (
          <div className="mb-8 p-5 rounded-xl flex flex-col md:flex-row gap-4"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            {compareList.map(p => (
              <div key={p.id} className="flex-1 relative p-4 rounded-lg" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                <button onClick={() => toggleCompare(p)} className="absolute top-2 right-2 text-xs" style={{ color: 'var(--color-muted)' }}>✕</button>
                <p className="text-xs mb-1" style={{ color: 'var(--color-accent)' }}>{p.category}</p>
                <h3 className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>{p.name}</h3>
                <p className="text-xs mb-3" style={{ color: 'var(--color-muted)' }}>{p.brand?.name}</p>
                <p className="text-sm font-mono" style={{ color: 'var(--color-text)' }}>₹{p.priceMin} – ₹{p.priceMax}</p>
              </div>
            ))}
          </div>
        )}

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-muted)' }} />
            <input type="text" placeholder="Search products or brands..."
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }} />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategoryFilter(cat)}
                className="whitespace-nowrap px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
                style={categoryFilter === cat
                  ? { background: 'rgba(75,124,243,0.15)', color: 'var(--color-accent)', border: '1px solid rgba(75,124,243,0.3)' }
                  : { background: 'var(--color-surface)', color: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: 'var(--color-accent)' }}></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map(product => (
              <div key={product.id} className="card flex flex-col overflow-hidden transition-all hover:border-opacity-80 group"
                style={{ borderColor: 'var(--color-border)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(75,124,243,0.4)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-border)'}>

                {/* Product Image Area */}
                <div className="h-40 flex items-center justify-center" style={{ background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)' }}>
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center"
                    style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                    <ShieldCheck className="w-8 h-8" style={{ color: 'var(--color-muted)', opacity: 0.6 }} />
                  </div>
                </div>

                <div className="p-5 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-accent)' }}>{product.category}</span>
                    <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'var(--color-bg)', color: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>{product.brand?.name}</span>
                  </div>
                  <h3 className="font-semibold mb-1.5" style={{ color: 'var(--color-text)' }}>{product.name}</h3>
                  <p className="text-sm flex-grow mb-4" style={{ color: 'var(--color-muted)' }}>{product.description}</p>

                  <div className="text-base font-mono font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
                    ₹{product.priceMin} <span className="text-sm font-sans font-normal" style={{ color: 'var(--color-muted)' }}>– ₹{product.priceMax}</span>
                  </div>

                  {compareMode ? (
                    <button onClick={() => toggleCompare(product)}
                      className="w-full py-2 rounded-lg text-sm font-medium transition-all"
                      style={compareList.find(p => p.id === product.id)
                        ? { background: 'rgba(75,124,243,0.15)', color: 'var(--color-accent)', border: '1px solid rgba(75,124,243,0.3)' }
                        : { background: 'transparent', color: 'var(--color-muted)', border: '1px solid var(--color-border)' }}>
                      {compareList.find(p => p.id === product.id) ? '✓ Selected' : 'Select to Compare'}
                    </button>
                  ) : (
                    <button onClick={() => { setSelectedProduct(product); setIsModalOpen(true); }}
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all"
                      style={{ background: 'var(--color-accent)', color: 'white' }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                      <ShoppingCart className="w-4 h-4" /> Reserve
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && !loading && (
          <p className="text-center py-20 text-sm" style={{ color: 'var(--color-muted)' }}>No products found.</p>
        )}
      </main>

      <Footer />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={selectedProduct} />
    </div>
  );
}
