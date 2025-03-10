import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import KalimatiPrices from './pages/KalimatiPrices';
import NotFound from './pages/NotFound';
import './App.css';

const App = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kalimati-tarkari-rate-today" element={<KalimatiPrices />} />
        <Route path="/kalimati-tarkari-rate-today/" element={<Navigate to="/kalimati-tarkari-rate-today" replace />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
