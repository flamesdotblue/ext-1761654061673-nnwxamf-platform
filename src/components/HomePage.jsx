import Spline from '@splinetool/react-spline';
import { ArrowRight, Star, Bike } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <DeliveryBanner />
      <FeaturedMenu />
      <PromoVideo />
      <Testimonials />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative w-full h-[70vh] md:h-[80vh]">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white pointer-events-none"></div>
      <div className="relative max-w-7xl mx-auto h-full px-4 md:px-6 flex items-center">
        <div className="max-w-xl">
          <p className="uppercase tracking-wide text-sm text-amber-700 font-semibold">Fresh. Fast. Fiery.</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-extrabold text-neutral-900">Piping Hot Pizzas, Built Your Way</h1>
          <p className="mt-4 text-neutral-700">Crave-worthy pizzas with bold flavors and premium ingredients. Customize every bite with our interactive pizza builder.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/builder" className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-red-500 text-white font-semibold shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
              Start Building <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link to="/menu" className="inline-flex items-center px-6 py-3 rounded-full border border-neutral-300 bg-white text-neutral-900 font-semibold hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
              Explore Menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function DeliveryBanner() {
  return (
    <section className="bg-gradient-to-r from-amber-50 to-red-50 border-y border-amber-100" aria-label="Delivery Area Information">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex items-center gap-4">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-red-600 border border-amber-200"><Bike /></div>
        <p className="text-sm md:text-base text-neutral-800">We deliver within an 8km radius from our hubs. Average delivery time: 25–35 minutes. Real-time tracking at checkout.</p>
      </div>
    </section>
  );
}

function FeaturedMenu() {
  const items = [
    {
      id: 'fm1',
      name: 'Spicy Peri-Peri Paneer',
      img: 'https://images.unsplash.com/photo-1601924582971-b0c5be3d1638?q=80&w=800&auto=format&fit=crop',
      desc: 'Paneer, onions, capsicum, and a fiery peri-peri drizzle.',
      kcal: 320,
    },
    {
      id: 'fm2',
      name: 'Margherita Bliss',
      img: 'https://images.unsplash.com/photo-1541599188778-cdc73298e8f8?q=80&w=800&auto=format&fit=crop',
      desc: 'Classic tomatoes, fresh basil, and mozzarella.',
      kcal: 280,
    },
    {
      id: 'fm3',
      name: 'Tandoori Chicken Feast',
      img: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
      desc: 'Smoky tandoori chicken with peppers and onions.',
      kcal: 360,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-12" aria-labelledby="featured-heading">
      <h2 id="featured-heading" className="text-2xl md:text-3xl font-extrabold text-neutral-900">Featured Favorites</h2>
      <p className="mt-2 text-neutral-600">High-quality ingredients, baked to perfection.</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="group rounded-2xl border border-neutral-200 overflow-hidden bg-white shadow-sm hover:shadow-md focus-within:ring-2 focus-within:ring-amber-500">
            <img loading="lazy" src={`${item.img}&ixlib=rb-4.0.3`} alt={`${item.name} pizza`} className="w-full h-48 object-cover" width="600" height="384" />
            <div className="p-4">
              <h3 className="font-bold text-neutral-900">{item.name}</h3>
              <p className="mt-1 text-sm text-neutral-600">{item.desc}</p>
              <p className="mt-2 text-xs text-neutral-500" aria-label={`Approximately ${item.kcal} kilocalories per slice`}>{item.kcal} kcal/slice</p>
              <div className="mt-4 flex items-center justify-between">
                <Link to="/menu" className="text-sm font-semibold text-red-600 hover:underline">View details</Link>
                <Link to="/builder" className="text-sm font-semibold text-amber-700 hover:underline">Customize</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PromoVideo() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 pb-8" aria-labelledby="promo-video">
      <h2 id="promo-video" className="sr-only">Promotional video</h2>
      <div className="rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-50">
        <video
          className="w-full h-auto"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop"
          aria-label="Short promotional video showing fresh ingredients and pizzas being baked"
        >
          <source src="https://videos.pexels.com/video-files/3577437/3577437-uhd_2560_1440_24fps.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { id: 1, name: 'Aarav', text: 'Best crust in town! The builder is super fun and easy to use.', rating: 5 },
    { id: 2, name: 'Riya', text: 'Delivery was fast and the pizza was still sizzling hot.', rating: 5 },
    { id: 3, name: 'Kabir', text: 'Great vegan options and clear nutrition info. Love it!', rating: 4 },
  ];
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-12" aria-labelledby="testimonials-heading">
      <h2 id="testimonials-heading" className="text-2xl md:text-3xl font-extrabold text-neutral-900">What customers say</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {items.map((t) => (
          <figure key={t.id} className="rounded-2xl border border-neutral-200 p-5 bg-white shadow-sm">
            <div className="flex items-center gap-1 text-amber-500" aria-label={`${t.rating} out of 5 stars`}>
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={18} fill="#f59e0b" stroke="#f59e0b" aria-hidden="true" />
              ))}
            </div>
            <blockquote className="mt-3 text-neutral-700">“{t.text}”</blockquote>
            <figcaption className="mt-3 text-sm font-semibold text-neutral-900">— {t.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
