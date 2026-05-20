/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useAnimationFrame, useMotionValue, useScroll, useTransform } from "motion/react";
import { Scissors, Sparkles, User, Calendar, MapPin, Phone, Instagram, Facebook, Clock, ChevronRight, Star, Heart, Palette, Feather, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const SALON_SERVICES = [
  { id: 'hair', name: 'Hair Designer', icon: <Scissors className="w-5 h-5" />, image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=600', desc: 'Precision cuts, artisan coloring, and bespoke styling tailored to your unique identity.' },
  { id: 'skin', name: 'Skin Rituals', icon: <Sparkles className="w-5 h-5" />, image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600', desc: 'Advanced dermal therapies and rejuvenating facials designed for absolute skin radiance.' },
  { id: 'bridal', name: 'Bridal Suite', icon: <Heart className="w-5 h-5" />, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600', desc: 'Luxury bridal transformations providing an ethereal glow for your most cherished moments.' },
  { id: 'nails', name: 'Nail Artistry', icon: <Palette className="w-5 h-5" />, image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600', desc: 'Minimalist and avant-garde nail design using the finest lacquers and restorative care.' },
  { id: 'makeup', name: 'Le Maquillage', icon: <User className="w-5 h-5" />, image: 'https://images.unsplash.com/photo-1522337300263-95130e8a4d4b?q=80&w=600', desc: 'Red carpet ready makeup applications that highlight your natural architecture.' },
  { id: 'threading', name: 'Brow Design', icon: <Feather className="w-5 h-5" />, image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=600', desc: 'Expert threading and precision tinting to frame your gaze with perfect symmetry.' },
];

const TESTIMONIALS = [
  {
    id: 1,
    text: "The most transformative experience I've had. They took my vision and turned it into a masterpiece that feels perfectly aligned with my style.",
    author: "Elena Rossi",
    location: "Milan, IT",
    avatar: "https://i.pravatar.cc/150?u=elena"
  },
  {
    id: 2,
    text: "Absolute perfection in every detail. The staff's expertise in skin rituals is unmatched. I left feeling like a completely renewed version of myself.",
    author: "Julian Chen",
    location: "New York, USA",
    avatar: "https://i.pravatar.cc/150?u=julian"
  },
  {
    id: 3,
    text: "Aura isn't just a salon, it's a sanctuary. Their attention to hygiene and premium products gives me total peace of mind every visit.",
    author: "Sophia Laurent",
    location: "Paris, FR",
    avatar: "https://i.pravatar.cc/150?u=sophia"
  },
  {
    id: 4,
    text: "The bridal team is exceptional. They didn't just do my makeup; they curated a whole look that made me feel like royalty on my special day.",
    author: "Amara Okoro",
    location: "London, UK",
    avatar: "https://i.pravatar.cc/150?u=amara"
  },
  {
    id: 5,
    text: "Rarely do you find such a perfect blend of technical skill and artistic intuition. Aura is truly in a league of its own for hair design.",
    author: "Marcus Thorne",
    location: "Dubai, UAE",
    avatar: "https://i.pravatar.cc/150?u=marcus"
  }
];

function Carousel({ images }: { images: string[] }) {
  // Use a triple set of images for seamless looping
  const displayImages = [...images, ...images, ...images];
  const x = useMotionValue(0);
  const cardWidth = 380; // Adjusted for w-80 + gap-14
  const fullSetWidth = images.length * cardWidth;

  useEffect(() => {
    x.set(-fullSetWidth);
  }, [fullSetWidth, x]);

  useAnimationFrame((_, delta) => {
    const speed = 0.04; 
    const currentX = x.get();
    let nextX = currentX + speed * delta;
    if (nextX > 0) {
      nextX = -fullSetWidth;
    }
    x.set(nextX);
  });

  return (
    <div className="absolute inset-0 z-0 overflow-hidden flex items-center bg-brand-surface perspective-1000">
      <motion.div 
        style={{ x }} 
        className="flex gap-14 px-10 py-20"
      >
        {displayImages.map((src, i) => (
          <motion.div 
            key={i} 
            whileHover={{ scale: 1.05, rotateY: 5, z: 50 }}
            className="flex-shrink-0 w-80 h-[480px] relative group rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] transform-gpu transition-all duration-700"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <img 
              src={src} 
              alt={`Gallery ${i}`} 
              className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            {/* Gloss effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            {/* Cut-out shadow depth */}
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none"></div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Background radial gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,160,89,0.05),transparent)] pointer-events-none"></div>
    </div>
  );
}

const CHOOSE_US_REASONS = [
  { title: "Certified Stylists", desc: "Expert artisans trained in global techniques and creative intuition." },
  { title: "Medical Hygiene", desc: "Hospital-grade sterilization protocols for your total peace of mind." },
  { title: "Branded Products", desc: "Exclusively using world-renowned luxury brands and organic extracts." },
  { title: "Personalized Care", desc: "Curated rituals bespoke to your unique physiological essence." },
  { title: "Eco Friendly", desc: "Sustainable practices, recycled materials, and toxin-free formulations." },
  { title: "Award Winning", desc: "Recognized internationally for architectural design and service excellence." },
  { title: "Master Artistry", desc: "Where technical precision meets thousands of hours of specialized craft." },
  { title: "Luxe Rituals", desc: "More than a service—a sanctuary designed for absolute transformation." }
];

export default function App() {
  const [activeService, setActiveService] = useState<typeof SALON_SERVICES[0] | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-brand-paper text-brand-ink selection:bg-brand-gold/30">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-brand-paper/80 backdrop-blur-md px-8 py-6 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-10 h-10 border border-brand-ink flex items-center justify-center group-hover:bg-brand-ink group-hover:text-brand-paper transition-all duration-500">
            <span className="text-serif text-2xl font-light">A</span>
          </div>
          <div className="flex flex-col">
            <span className="text-serif text-xl tracking-[0.2em] uppercase font-light leading-none">Aura</span>
            <span className="text-[8px] tracking-[0.4em] uppercase font-semibold text-brand-gold">Maison de Beauté</span>
          </div>
        </div>
        
        <div className="hidden lg:flex gap-16 text-[10px] uppercase tracking-[0.25em] font-semibold">
          <a href="#services" className="hover:text-brand-gold transition-colors relative group">
            Services
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#about" className="hover:text-brand-gold transition-colors relative group">
            Our Story
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#gallery" className="hover:text-brand-gold transition-colors relative group">
            Gallery
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#contact" className="hover:text-brand-gold transition-colors relative group">
            L'Atelier
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        <button 
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          className="hidden sm:block bg-brand-ink text-brand-paper px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-brand-gold hover:shadow-xl transition-all duration-500 transform hover:-translate-y-0.5"
        >
          Reserve Experience
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen bg-brand-paper flex items-center justify-center overflow-hidden">
        <Carousel images={[
          "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1920",
          "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=1920",
          "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1920",
          "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1920",
          "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1920",
          "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=1920"
        ]} />

        <div className="absolute inset-0 z-10 bg-brand-paper/40 content-none pointer-events-none"></div>
        {/* Transition Fade */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-brand-paper to-transparent z-15 pointer-events-none"></div>

        <div className="container mx-auto px-8 relative z-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-serif text-5xl md:text-8xl font-light leading-[1.1] text-brand-ink mb-12 drop-shadow-sm">
              Your Best Look, <br />
              <span className="italic text-brand-gold serif-italic">Delivered</span>
            </h1>
            <div className="flex justify-center">
              <button 
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="group relative bg-brand-gold text-brand-paper px-12 py-5 uppercase tracking-[0.3em] text-[10px] font-bold overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(197,160,89,0.4)]"
              >
                <span className="relative z-10">Book a Free Consultation</span>
                <div className="absolute inset-0 bg-brand-ink translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20">
          <span className="text-[8px] uppercase tracking-[0.5em] text-brand-muted/40 font-bold">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-brand-muted/40 to-transparent"></div>
        </div>
      </section>

      {/* Trust Strip - Full Width */}
      <section className="relative z-30 bg-brand-surface border-y border-brand-border py-4 md:py-6">
        <div className="container mx-auto px-8 max-w-7xl">
          <div className="flex items-center justify-between gap-2 md:gap-8">
            {/* 1. Google Rating */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center md:items-start flex-1"
            >
              <div className="flex gap-0.5 text-brand-gold mb-1 justify-center md:justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current" />
                ))}
              </div>
              <span className="text-brand-ink text-[9px] md:text-xs font-light tracking-[0.15em] uppercase text-center md:text-left">4.9 Google Rating</span>
            </motion.div>

            {/* Divider */}
            <div className="w-px h-6 bg-brand-border/40 self-center" />

            {/* 2. Experience */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center flex-1"
            >
              <span className="text-brand-gold text-xs md:text-lg font-bold italic text-serif leading-none">15Y+</span>
              <span className="text-brand-ink text-[9px] md:text-xs font-light tracking-[0.15em] uppercase mt-1 text-center">Experience</span>
            </motion.div>

            {/* Divider */}
            <div className="w-px h-6 bg-brand-border/40 self-center" />

            {/* 3. Transformations */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center flex-1"
            >
              <span className="text-brand-gold text-xs md:text-lg font-bold italic text-serif leading-none">12K+</span>
              <span className="text-brand-ink text-[9px] md:text-xs font-light tracking-[0.15em] uppercase mt-1 text-center">Transformations</span>
            </motion.div>

            {/* Divider for Desktop only */}
            <div className="hidden md:block w-px h-6 bg-brand-border/40 self-center" />

            {/* 4. Global Excellence (Desktop only) */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="hidden md:flex flex-col items-end flex-1 pl-4"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-gold" />
                <span className="text-brand-ink text-sm font-bold italic text-serif">8 Awards</span>
              </div>
              <span className="text-brand-muted text-[9px] uppercase tracking-[0.15em] font-medium mt-1">Global Excellence</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section - Orbital Layout */}
      <section id="services" className="pt-20 pb-6 md:pb-12 bg-brand-paper overflow-hidden">
        <div className="container mx-auto px-8">
          <div className="text-center mb-12 md:mb-16 relative">
            <span className="text-brand-gold uppercase tracking-[0.4em] text-[9px] font-bold mb-4 block">Our Expertise</span>
            <h2 className="text-serif text-5xl md:text-7xl font-light leading-tight mb-6">
              Curated <span className="italic">Rituals</span>
            </h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-brand-muted font-bold"
            >
              Hover or tap to reveal the experience
            </motion.p>
          </div>

          <div className="relative h-[320px] md:h-[650px] flex items-center justify-center">
            {/* Main Orbit Ring */}
            <div className="absolute w-[220px] h-[220px] md:w-[600px] md:h-[600px] border border-brand-border rounded-full"></div>
            
            {/* Secondary Orbit Ring */}
            <div className="absolute w-[160px] h-[160px] md:w-[400px] md:h-[400px] border border-brand-border opacity-50 rounded-full"></div>

            {/* Central Signature */}
            <div className="absolute z-10 w-16 h-16 md:w-32 md:h-32 bg-brand-ink rounded-full flex items-center justify-center shadow-2xl border border-brand-gold/30">
               <span className="text-serif text-xl md:text-4xl text-brand-paper font-light">A</span>
               {/* Pulsing Aura */}
               <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.05, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-brand-gold rounded-full"
               />
            </div>

            {/* Rotating Services Container */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute w-[220px] h-[220px] md:w-[600px] md:h-[600px]"
            >
              {SALON_SERVICES.map((service, index) => {
                const angle = (index / SALON_SERVICES.length) * 360;
                return (
                  <div 
                    key={service.id}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [--orbit-radius:-110px] md:[--orbit-radius:-300px]"
                    style={{
                      transform: `rotate(${angle}deg) translateY(var(--orbit-radius))`
                    }}
                  >
                    {/* Counter-rotating service bubble */}
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                      className="relative"
                    >
                      <button 
                        onClick={() => setActiveService(service)}
                        onMouseEnter={() => setActiveService(service)}
                        className="group relative w-10 h-10 md:w-20 md:h-20 bg-brand-surface border border-brand-border rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95"
                      >
                         <div className="text-brand-muted group-hover:text-brand-gold transition-colors duration-500 scale-[0.65] md:scale-100">
                           {service.icon}
                         </div>
                         
                         <span className="absolute -bottom-8 md:-bottom-12 opacity-0 group-hover:opacity-100 transition-all duration-500 text-[7px] md:text-[10px] uppercase tracking-widest font-bold text-brand-ink whitespace-nowrap bg-brand-surface/90 backdrop-blur-sm px-3 py-1 rounded-full border border-brand-border shadow-sm">
                           {service.name}
                         </span>
                         
                         <div className="absolute inset-0 rounded-full group-hover:shadow-[0_0_30px_rgba(197,160,89,0.3)] transition-shadow duration-500"></div>
                      </button>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>

            {/* Service Detail Popup */}
            <AnimatePresence>
              {activeService && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="absolute z-20 w-[90vw] md:w-[400px] bg-brand-surface shadow-[0_40px_100px_rgba(0,0,0,0.15)] rounded-3xl overflow-hidden pointer-events-auto"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={activeService.image} 
                      alt={activeService.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <button 
                      onClick={(e) => { e.stopPropagation(); setActiveService(null); }}
                      className="absolute top-4 right-4 w-8 h-8 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-8">
                    <span className="text-brand-gold text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold mb-3 block">Service Spotlight</span>
                    <h3 className="text-serif text-3xl font-light mb-4 italic">{activeService.name}</h3>
                    <p className="text-brand-muted text-sm leading-relaxed font-light mb-8">
                      {activeService.desc}
                    </p>
                    <button 
                      onClick={() => {
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                        setActiveService(null);
                      }}
                      className="w-full bg-brand-gold text-brand-paper py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-brand-ink transition-colors duration-500"
                    >
                      Reserve Appointment
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Principles / Foundation Section (Redesigned Why Choose Us) */}
      <section className="pt-16 pb-0 md:pt-24 md:pb-0 bg-brand-paper relative overflow-hidden">
        <div className="container mx-auto px-8 max-w-7xl relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-gold uppercase tracking-[0.5em] text-[10px] font-bold mb-6 block"
            >
              The Aura Foundation
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-serif text-5xl md:text-7xl font-light leading-none"
            >
              Our <span className="italic serif-italic">Principles</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-brand-muted text-xs md:text-sm max-w-xl mx-auto mt-8 font-light leading-relaxed"
            >
              We’re creating a sanctuary shaped by connection, absolute precision, and thoughtful design rituals.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:h-[900px]">
            {/* Top Left: Large Principle Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-7 bg-brand-surface rounded-[3rem] p-12 md:p-16 flex flex-col justify-end relative overflow-hidden group min-h-[400px] border border-brand-border"
            >
              <div className="absolute top-12 left-12 w-24 h-24 rounded-full bg-brand-gold/10 backdrop-blur-xl border border-brand-gold/20 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-brand-gold flex items-center justify-center text-brand-paper">
                   <Scissors className="w-6 h-6" />
                </div>
              </div>
              <div className="relative z-10 max-w-md">
                <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-brand-ink mb-6">Expert Craftsmanship</h3>
                <p className="text-brand-muted text-sm md:text-base font-light leading-relaxed">
                  Led by industry legends with over 15 years of mastery. Every technique is honed through thousands of hours of specialized boutique craft.
                </p>
              </div>
              <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] group-hover:bg-brand-gold/10 transition-all duration-1000"></div>
            </motion.div>

            {/* Right Column: Tall Principle Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-5 md:row-span-2 relative rounded-[3rem] overflow-hidden group h-full min-h-[600px]"
            >
              <img 
                src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800" 
                alt="Artistic Vision"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-ink/40"></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-12">
                 <div className="bg-brand-surface/95 backdrop-blur-md p-10 md:p-14 rounded-[2.5rem] shadow-2xl border border-brand-border/50 max-w-sm mb-8 transform group-hover:-translate-y-2 transition-transform duration-700">
                    <h3 className="text-2xl md:text-3xl font-bold text-brand-ink mb-4 tracking-tight">Artistic Vision</h3>
                    <p className="text-brand-muted text-xs md:text-sm font-light leading-relaxed">
                      We are building a platform for individual expression. A personalized approach to beauty that is uniquely yours.
                    </p>
                 </div>
                 <button 
                   onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                   className="bg-brand-gold text-brand-paper px-10 py-4 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-brand-ink transition-all duration-500 shadow-xl"
                 >
                   Join the Experience
                 </button>
              </div>
            </motion.div>

            {/* Bottom Left: Small Principle Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-3 h-[350px] md:h-auto relative rounded-[3rem] overflow-hidden group"
            >
              <img 
                src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=600" 
                alt="Medical Hygiene"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-ink/30 flex items-center justify-center text-center px-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 backdrop-blur-[2px]">
                 <h3 className="text-brand-paper text-2xl font-bold tracking-tight">Medical Hygiene</h3>
              </div>
              <div className="absolute bottom-10 left-10 right-10 text-center pointer-events-none transition-all duration-700 group-hover:opacity-0 group-hover:translate-y-4">
                 <h3 className="text-brand-paper text-2xl font-bold tracking-tight drop-shadow-lg">Strict Standards</h3>
              </div>
            </motion.div>

            {/* Bottom Left: Small Principle Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="md:col-span-4 h-[350px] md:h-auto relative rounded-[3rem] overflow-hidden group border border-brand-border"
            >
              <img 
                src="https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600" 
                alt="Sustainable Luxury"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-ink/10 group-hover:bg-brand-gold/20 transition-colors duration-700"></div>
              <div className="absolute bottom-10 left-10 flex items-center justify-between w-[calc(100%-5rem)]">
                 <h3 className="text-brand-paper text-2xl font-bold tracking-tight drop-shadow-lg">Eco Friendly</h3>
                 <div className="w-12 h-12 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-brand-paper pt-12 pb-8 md:pt-16 md:pb-12">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16 md:mb-24">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-muted uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block"
            >
              Client Experiences
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-serif text-4xl md:text-6xl font-light text-brand-ink"
            >
              The Aura <span className="italic serif-italic text-brand-gold">Community</span>
            </motion.h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {/* Left Card */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-brand-surface rounded-[2rem] p-10 md:p-12 flex flex-col justify-between min-h-[300px] md:min-h-[450px] border border-brand-border shadow-sm"
            >
              <div className="text-brand-gold/20">
                <span className="text-[100px] md:text-[120px] font-serif leading-none line-clamp-1">"</span>
              </div>
              <div>
                <h2 className="text-brand-ink text-3xl md:text-5xl font-bold mb-4">Trusted by <br /> <span className="text-brand-gold">12k+</span> clients.</h2>
                <p className="text-brand-muted text-[10px] md:text-xs uppercase tracking-widest font-bold">Voices of Aura Excellence</p>
              </div>
            </motion.div>

            {/* Right Card / Slider */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-brand-surface rounded-[2rem] p-10 md:p-14 relative overflow-hidden flex flex-col min-h-[400px] md:min-h-[450px] border border-brand-border shadow-sm"
            >
              {/* Dots */}
              <div className="flex gap-1.5 mb-10">
                {TESTIMONIALS.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all duration-500 ${i === testimonialIndex ? 'w-8 bg-brand-gold' : 'w-1.5 bg-brand-border'}`} 
                  />
                ))}
              </div>

              <div className="flex-grow">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={testimonialIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="text-brand-ink/80 text-lg md:text-2xl font-light leading-relaxed italic mb-8"
                  >
                    {TESTIMONIALS[testimonialIndex].text}
                  </motion.p>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                   key={testimonialIndex}
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="flex items-center gap-4 pt-6 border-t border-brand-border mt-auto"
                >
                  <img 
                    src={TESTIMONIALS[testimonialIndex].avatar} 
                    alt={TESTIMONIALS[testimonialIndex].author} 
                    className="w-12 h-12 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500 ring-2 ring-brand-gold/20"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-brand-ink font-bold text-sm md:text-base">{TESTIMONIALS[testimonialIndex].author}</h4>
                    <p className="text-brand-gold text-[9px] md:text-[10px] uppercase tracking-widest font-bold">{TESTIMONIALS[testimonialIndex].location}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Background Grain/Texture */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="pt-8 pb-24 md:pt-12 md:pb-40 bg-brand-paper overflow-hidden">
        <div className="container mx-auto px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-ink mb-4">Chat To Our Team</h2>
                <p className="text-brand-ink/60 text-base md:text-lg">
                  Ready to elevate your aesthetic? Get in touch with our friendly concierge team and we'll respond within 2 boutique hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-gold">First Name</label>
                    <input type="text" placeholder="Elena" className="w-full bg-brand-paper/30 border-b border-brand-border py-3 outline-none focus:border-brand-gold transition-colors text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-brand-gold">Last Name</label>
                    <input type="text" placeholder="Rossi" className="w-full bg-brand-paper/30 border-b border-brand-border py-3 outline-none focus:border-brand-gold transition-colors text-sm" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-gold">Service Interested In</label>
                  <input type="text" placeholder="Hair Designer / Skin Rituals" className="w-full bg-brand-paper/30 border-b border-brand-border py-3 outline-none focus:border-brand-gold transition-colors text-sm" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-gold">Work Email</label>
                  <input type="email" placeholder="elena@aura-maison.com" className="w-full bg-brand-paper/30 border-b border-brand-border py-3 outline-none focus:border-brand-gold transition-colors text-sm" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-gold">Phone Number</label>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 border-b border-brand-border py-3 text-sm min-w-[70px]">
                      <span className="grayscale">🇺🇸</span>
                      <span>+1</span>
                    </div>
                    <input type="tel" placeholder="(555) 000-0000" className="w-full bg-brand-paper/30 border-b border-brand-border py-3 outline-none focus:border-brand-gold transition-colors text-sm" />
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-brand-gold">Desired Session</p>
                  <div className="space-y-3">
                    <label className="flex items-center gap-4 p-4 rounded-xl border border-brand-border cursor-pointer hover:bg-brand-secondary/20 transition-all group">
                      <input type="radio" name="type" className="accent-brand-gold h-4 w-4" defaultChecked />
                      <div>
                        <p className="text-sm font-bold text-brand-ink">Private Ritual</p>
                        <p className="text-xs text-brand-muted">Exclusive 1-on-1 boutique experience</p>
                      </div>
                    </label>
                    <label className="flex items-center gap-4 p-4 rounded-xl border border-brand-border cursor-pointer hover:bg-brand-secondary/20 transition-all group">
                      <input type="radio" name="type" className="accent-brand-gold h-4 w-4" />
                      <div>
                        <p className="text-sm font-bold text-brand-ink">Elite Group Suite</p>
                        <p className="text-xs text-brand-muted">Premium styling for your entire party</p>
                      </div>
                    </label>
                  </div>
                </div>

                <button className="w-full bg-brand-gold text-brand-paper py-5 text-xs uppercase tracking-[0.3em] font-bold rounded-xl hover:bg-brand-ink hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                  Get in Touch
                </button>
              </div>
            </motion.div>

            {/* Right: Vision Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-[2.5rem] overflow-hidden group h-[600px] lg:h-[800px]"
            >
              <img
                src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1200"
                alt="Aura Vision"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/20 to-transparent"></div>
              
              <div className="absolute bottom-12 left-12 right-12 text-brand-paper">
                <p className="text-xl md:text-2xl font-light italic leading-relaxed mb-8">
                  "Aura's expertise helped me transition from a loose concept of beauty to a professional aesthetic that feels entirely authentic to me."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-paper/20 backdrop-blur-md flex items-center justify-center border border-white/10">
                    <User className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold">Maya Rothwell</h4>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Creative Visionary</p>
                  </div>
                </div>
              </div>

              {/* Glass Glitch Effects */}
              <div className="absolute top-20 right-20 w-32 h-32 border border-white/10 backdrop-blur-sm rounded-full animate-pulse"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-paper pt-24 pb-12 px-8 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-24">
            <div className="col-span-2 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-brand-ink flex items-center justify-center">
                  <span className="text-serif text-2xl font-light">A</span>
                </div>
                <div>
                   <span className="block text-serif text-2xl tracking-[0.2em] uppercase font-light leading-none">Aura</span>
                   <span className="text-[8px] tracking-[0.4em] uppercase font-bold text-brand-gold">Maison de Beauté</span>
                </div>
              </div>
              <p className="text-brand-muted text-sm font-light leading-relaxed max-w-xs">
                A sanctuary in the heart of the city, dedicated to the art of luxury rituals and personal transformation.
              </p>
              <div className="flex gap-6">
                <Instagram className="w-5 h-5 text-brand-ink hover:text-brand-gold transition-colors cursor-pointer" />
                <Facebook className="w-5 h-5 text-brand-ink hover:text-brand-gold transition-colors cursor-pointer" />
              </div>
            </div>

            <div className="space-y-8">
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-gold">Experience</h4>
              <ul className="space-y-4 text-xs font-medium text-brand-muted/80">
                <li className="hover:text-brand-gold cursor-pointer transition-colors">Bridal Suites</li>
                <li className="hover:text-brand-gold cursor-pointer transition-colors">Hair Artistry</li>
                <li className="hover:text-brand-gold cursor-pointer transition-colors">Skin Rituals</li>
                <li className="hover:text-brand-gold cursor-pointer transition-colors">Nail Design</li>
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-gold">Maison</h4>
              <ul className="space-y-4 text-xs font-medium text-brand-muted/80">
                <li className="hover:text-brand-gold cursor-pointer transition-colors">Our Atelier</li>
                <li className="hover:text-brand-gold cursor-pointer transition-colors">Ethics & Origin</li>
                <li className="hover:text-brand-gold cursor-pointer transition-colors">Press & Media</li>
                <li className="hover:text-brand-gold cursor-pointer transition-colors">Careers</li>
              </ul>
            </div>

            <div className="col-span-2 space-y-8">
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-gold">Stay Enlightened</h4>
              <p className="text-xs text-brand-muted leading-relaxed">
                Receive curated updates on boutique releases and private seasonal appointments.
              </p>
              <div className="flex border-b border-brand-border pb-4">
                <input type="email" placeholder="Your essence..." className="bg-transparent text-xs w-full outline-none font-light" />
                <ChevronRight className="w-4 h-4 text-brand-gold" />
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-brand-border flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <p className="text-[8px] uppercase tracking-[0.5em] text-brand-muted/50 font-bold">
              © 2024 Aura Maison de Beauté. All rights reserved.
            </p>
            <div className="flex gap-8 text-[8px] uppercase tracking-widest font-bold text-brand-muted/50">
              <span className="hover:text-brand-gold cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-brand-gold cursor-pointer transition-colors">Terms of Ritual</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
