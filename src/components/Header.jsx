import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Menu as MenuIcon, Pizza } from 'lucide-react';
import React from 'react';
import useCart from '../store/useCart';

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const count = useCart((s) => s.count);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2" aria-label="Akshay Food Hub Home">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-red-500 text-white">
              <Pizza size={20} />
            </span>
            <span className="text-lg font-extrabold tracking-tight">Akshay Food Hub</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
            <NavItem to="/" label="Home" />
            <NavItem to="/menu" label="Menu" />
            <NavItem to="/builder" label="Pizza Builder" />
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/builder" className="relative inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-red-500 text-white font-semibold shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
              <ShoppingCart size={18} className="mr-2" /> Order Now
              {count > 0 && (
                <span className="ml-2 inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full bg-white text-red-600 text-xs font-bold" aria-live="polite">{count}</span>
              )}
            </Link>
            <button className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-neutral-200" aria-label="Open Menu" onClick={() => setOpen((v) => !v)}>
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-neutral-200 bg-white" role="dialog" aria-label="Mobile Menu">
          <div className="px-4 py-3 flex flex-col gap-2">
            <MobileNavItem to="/" label="Home" onClick={() => setOpen(false)} />
            <MobileNavItem to="/menu" label="Menu" onClick={() => setOpen(false)} />
            <MobileNavItem to="/builder" label="Pizza Builder" onClick={() => setOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
}

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-sm font-medium hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500 rounded ${isActive ? 'text-red-600' : 'text-neutral-700'}`
      }
    >
      {label}
    </NavLink>
  );
}

function MobileNavItem({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `block w-full text-left px-3 py-2 rounded-md ${isActive ? 'bg-red-50 text-red-600' : 'hover:bg-amber-50 text-neutral-800'}`
      }
    >
      {label}
    </NavLink>
  );
}
