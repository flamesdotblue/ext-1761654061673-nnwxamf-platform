import React from 'react';
import useCart from '../store/useCart';

const MENU = [
  {
    category: 'Pizzas',
    items: [
      { id: 'pz1', name: 'Margherita', price: 7.99, kcal: 220, protein: 9, carbs: 28, fat: 7, img: 'https://images.unsplash.com/photo-1548365328-9f547fb0953e?q=80&w=800&auto=format&fit=crop', desc: 'Tomato, basil, mozzarella' },
      { id: 'pz2', name: 'Veggie Delight', price: 8.99, kcal: 200, protein: 8, carbs: 26, fat: 6, img: 'https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?q=80&w=800&auto=format&fit=crop', desc: 'Bell peppers, olives, onions' },
      { id: 'pz3', name: 'Chicken Tikka', price: 9.99, kcal: 250, protein: 14, carbs: 27, fat: 9, img: 'https://images.unsplash.com/photo-1541745537413-b804b0d1c9a0?q=80&w=800&auto=format&fit=crop', desc: 'Tikka chicken, onions, jalapeños' },
    ],
  },
  {
    category: 'Sides',
    items: [
      { id: 'sd1', name: 'Garlic Bread', price: 3.49, kcal: 180, protein: 4, carbs: 22, fat: 7, img: 'https://images.unsplash.com/photo-1557925923-6982f3f0d098?q=80&w=800&auto=format&fit=crop', desc: 'Buttery garlic goodness' },
      { id: 'sd2', name: 'Chicken Wings', price: 5.99, kcal: 320, protein: 20, carbs: 4, fat: 24, img: 'https://images.unsplash.com/photo-1608039829570-4959d7ba0d5b?q=80&w=800&auto=format&fit=crop', desc: 'Spicy and crispy' },
    ],
  },
  {
    category: 'Desserts',
    items: [
      { id: 'ds1', name: 'Choco Lava Cake', price: 3.99, kcal: 340, protein: 5, carbs: 50, fat: 13, img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476e?q=80&w=800&auto=format&fit=crop', desc: 'Molten chocolate center' },
    ],
  },
  {
    category: 'Drinks',
    items: [
      { id: 'dr1', name: 'Cola', price: 1.49, kcal: 140, protein: 0, carbs: 39, fat: 0, img: 'https://images.unsplash.com/photo-1573280705647-c5e4e6f7b385?q=80&w=800&auto=format&fit=crop', desc: 'Chilled and fizzy' },
      { id: 'dr2', name: 'Iced Tea', price: 1.99, kcal: 80, protein: 0, carbs: 22, fat: 0, img: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800&auto=format&fit=crop', desc: 'Lemon flavored' },
    ],
  },
];

export default function MenuPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900">Menu</h1>
        <p className="text-neutral-600">High-resolution images, detailed descriptions, and nutritional info per serving.</p>
      </header>
      <div className="space-y-12">
        {MENU.map((section) => (
          <section key={section.category} aria-labelledby={`cat-${section.category}`}>
            <h2 id={`cat-${section.category}`} className="text-2xl font-bold text-amber-700">{section.category}</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function MenuCard({ item }) {
  const addItem = useCart((s) => s.addItem);
  return (
    <article className="rounded-2xl border border-neutral-200 overflow-hidden bg-white shadow-sm">
      <img loading="lazy" src={`${item.img}&ixlib=rb-4.0.3`} alt={`${item.name}`} className="w-full h-48 object-cover" width="600" height="384" />
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-bold text-neutral-900">{item.name}</h3>
            <p className="text-sm text-neutral-600">{item.desc}</p>
          </div>
          <p className="font-extrabold text-red-600">${item.price.toFixed(2)}</p>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-[360px] text-xs border border-neutral-200" aria-label={`Nutritional information for ${item.name}`}>
            <thead className="bg-neutral-50">
              <tr>
                <th className="text-left font-semibold p-2 border-b">Kcal</th>
                <th className="text-left font-semibold p-2 border-b">Protein(g)</th>
                <th className="text-left font-semibold p-2 border-b">Carbs(g)</th>
                <th className="text-left font-semibold p-2 border-b">Fat(g)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border-t">{item.kcal}</td>
                <td className="p-2 border-t">{item.protein}</td>
                <td className="p-2 border-t">{item.carbs}</td>
                <td className="p-2 border-t">{item.fat}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          onClick={() => addItem({ id: item.id, name: item.name, price: item.price, qty: 1 })}
          className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-red-500 text-white font-semibold shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          aria-label={`Add ${item.name} to cart`}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
