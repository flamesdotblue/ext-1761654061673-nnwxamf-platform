import { create } from 'zustand';

const useCart = create((set, get) => ({
  items: [],
  get count() {
    return get().items.reduce((sum, i) => sum + i.qty, 0);
  },
  addItem: (item) => set((state) => {
    const exists = state.items.find((i) => i.id === item.id);
    if (exists) {
      return {
        items: state.items.map((i) => (i.id === item.id ? { ...i, qty: i.qty + (item.qty || 1) } : i)),
      };
    }
    return { items: [...state.items, { ...item, qty: item.qty || 1 }] };
  }),
  removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  clear: () => set({ items: [] }),
}));

export default useCart;
