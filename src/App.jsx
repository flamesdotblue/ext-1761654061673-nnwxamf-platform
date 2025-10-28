import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import MenuPage from './components/MenuPage';
import PizzaBuilder from './components/PizzaBuilder';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

import React from 'react';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white text-neutral-900">
        <Header />
        <ScrollToTop />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/builder" element={<PizzaBuilder />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl md:text-4xl font-extrabold text-amber-700">Page not found</h1>
      <p className="mt-4 text-neutral-600">The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="inline-block mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-red-500 text-white font-semibold shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">Go Home</Link>
    </div>
  );
}
