import { Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-200 mt-16" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="text-white font-extrabold text-lg">Akshay Food Hub</h3>
          <p className="mt-2 text-sm text-neutral-400">Freshly baked pizzas, sizzling sides, and sweet treats. Delivered hot and fast.</p>
          <div className="mt-4 flex items-center gap-3 text-sm text-neutral-300">
            <MapPin size={16} /> <span>We deliver within 8km of all hubs</span>
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center gap-2"><Phone size={16} /> <a href="tel:+1999888777" className="hover:underline">+1 999-888-7777</a></li>
            <li className="flex items-center gap-2"><Mail size={16} /> <a href="mailto:hello@akshayfoodhub.com" className="hover:underline">hello@akshayfoodhub.com</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold">Follow us</h4>
          <div className="mt-3 flex items-center gap-3">
            <a className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-amber-500" aria-label="Instagram" href="#"><Instagram /></a>
            <a className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-amber-500" aria-label="Facebook" href="#"><Facebook /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 text-xs text-neutral-400">
          © {new Date().getFullYear()} Akshay Food Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
