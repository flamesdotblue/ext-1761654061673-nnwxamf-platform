import React from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import useCart from '../store/useCart';

const BASES = [
  { id: 'thin', name: 'Thin Crust', price: 5.0 },
  { id: 'hand', name: 'Hand Tossed', price: 5.5 },
  { id: 'cheese', name: 'Cheese Burst', price: 6.5 },
];

const SAUCES = [
  { id: 'tomato', name: 'Tomato Basil', price: 0.5 },
  { id: 'peri', name: 'Peri-Peri', price: 0.7 },
  { id: 'pesto', name: 'Pesto', price: 0.9 },
];

const TOPPINGS = [
  { id: 'paneer', name: 'Paneer', price: 1.0, color: '#ffedd5' },
  { id: 'mushroom', name: 'Mushroom', price: 0.8, color: '#e5e7eb' },
  { id: 'onion', name: 'Onion', price: 0.5, color: '#fde68a' },
  { id: 'capsicum', name: 'Capsicum', price: 0.7, color: '#bbf7d0' },
  { id: 'chicken', name: 'Chicken', price: 1.2, color: '#fecaca' },
  { id: 'jalapeno', name: 'Jalapeño', price: 0.6, color: '#86efac' },
  { id: 'olive', name: 'Olives', price: 0.7, color: '#d1d5db' },
];

export default function PizzaBuilder() {
  const [base, setBase] = React.useState(BASES[0]);
  const [sauce, setSauce] = React.useState(SAUCES[0]);
  const [toppings, setToppings] = React.useState([]);
  const addItem = useCart((s) => s.addItem);

  const price = React.useMemo(() => {
    const tops = toppings.reduce((sum, t) => sum + t.price, 0);
    return +(base.price + sauce.price + tops).toFixed(2);
  }, [base, sauce, toppings]);

  function handleDragEnd(event) {
    const { over, active } = event;
    if (over && over.id === 'pizza-drop') {
      const found = TOPPINGS.find((t) => t.id === active.id);
      if (found) setToppings((prev) => [...prev, found]);
    }
  }

  function removeTopping(idx) {
    setToppings((prev) => prev.filter((_, i) => i !== idx));
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900">Build Your Pizza</h1>
        <p className="text-neutral-600">Drag toppings onto the pizza. Real-time price updates as you customize.</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-6 items-start">
        <div className="rounded-2xl border border-neutral-200 p-4 bg-white">
          <h2 className="font-bold text-amber-700">1. Choose Base</h2>
          <div className="mt-3 grid grid-cols-1 gap-2">
            {BASES.map((b) => (
              <label key={b.id} className={`flex items-center justify-between rounded-lg border p-3 cursor-pointer ${base.id === b.id ? 'border-red-500 bg-red-50' : 'border-neutral-200'}`}>
                <span className="font-medium">{b.name}</span>
                <span className="text-sm">${b.price.toFixed(2)}</span>
                <input aria-label={b.name} type="radio" name="base" className="sr-only" checked={base.id === b.id} onChange={() => setBase(b)} />
              </label>
            ))}
          </div>

          <h2 className="mt-6 font-bold text-amber-700">2. Choose Sauce</h2>
          <div className="mt-3 grid grid-cols-1 gap-2">
            {SAUCES.map((s) => (
              <label key={s.id} className={`flex items-center justify-between rounded-lg border p-3 cursor-pointer ${sauce.id === s.id ? 'border-red-500 bg-red-50' : 'border-neutral-200'}`}>
                <span className="font-medium">{s.name}</span>
                <span className="text-sm">${s.price.toFixed(2)}</span>
                <input aria-label={s.name} type="radio" name="sauce" className="sr-only" checked={sauce.id === s.id} onChange={() => setSauce(s)} />
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 p-4 bg-white">
          <h2 className="font-bold text-amber-700">3. Drag Toppings</h2>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {TOPPINGS.map((t) => (
              <DraggableTopping key={t.id} topping={t} />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 p-4 bg-white">
          <h2 className="font-bold text-amber-700">4. Your Pizza</h2>
          <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToParentElement]}>
            <DroppablePizza>
              {toppings.map((t, idx) => (
                <PlacedTopping key={idx} topping={t} onRemove={() => removeTopping(idx)} />
              ))}
            </DroppablePizza>
          </DndContext>
          <div className="mt-4 text-sm text-neutral-700" aria-live="polite">{toppings.length} topping(s) selected</div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xl font-extrabold text-red-600">${price.toFixed(2)}</p>
            <button
              onClick={() => addItem({ id: `custom-${Date.now()}`, name: `Custom Pizza (${base.name}, ${sauce.name})`, price, qty: 1 })}
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-red-500 text-white font-semibold shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              aria-label="Add custom pizza to cart"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DraggableTopping({ topping }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: topping.id });
  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}
      className={`select-none rounded-lg border p-3 text-sm font-medium bg-white shadow-sm cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-70' : ''}`}
      aria-label={`Drag ${topping.name}`}
    >
      <div className="flex items-center justify-between">
        <span>{topping.name}</span>
        <span className="text-neutral-600">${topping.price.toFixed(2)}</span>
      </div>
    </div>
  );
}

function DroppablePizza({ children }) {
  const { isOver, setNodeRef } = useDroppable({ id: 'pizza-drop' });
  return (
    <div>
      <div
        ref={setNodeRef}
        className={`relative mx-auto w-full aspect-square max-w-md rounded-full border-4 ${isOver ? 'border-red-400' : 'border-amber-300'} bg-gradient-to-br from-amber-100 to-yellow-100 overflow-hidden`}
        aria-label="Drop toppings here"
        role="region"
      >
        <div className="absolute inset-6 rounded-full border-2 border-amber-200"></div>
        <div className="absolute inset-0">{children}</div>
      </div>
      <p className="mt-2 text-center text-xs text-neutral-600">Tip: Drag toppings into the circle. Tap a topping to remove.</p>
    </div>
  );
}

function PlacedTopping({ topping, onRemove }) {
  const [pos] = React.useState(() => ({
    top: Math.random() * 70 + 10,
    left: Math.random() * 70 + 10,
  }));
  return (
    <button
      type="button"
      onClick={onRemove}
      style={{ top: `${pos.top}%`, left: `${pos.left}%`, backgroundColor: topping.color }}
      className="absolute w-10 h-10 rounded-full border border-white/70 shadow focus:outline-none focus:ring-2 focus:ring-amber-500"
      aria-label={`Remove ${topping.name}`}
      title="Remove"
    />
  );
}
