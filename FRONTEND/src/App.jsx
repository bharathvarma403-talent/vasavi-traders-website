import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Products from './pages/Products';
import NovaAssistant from './pages/NovaAssistant';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/nova" element={<NovaAssistant />} />
      </Routes>
    </Router>
  );
}

export default App;
