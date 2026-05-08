/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  MapPin, 
  CheckCircle2, 
  Phone, 
  ArrowRight,
  Menu,
  X,
  Globe,
  Compass,
  Navigation
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { DESTINATIONS, CONTACT_INFO } from "../constants";

import destImageCherrapunji from "../assets/images/regenerated_image_1777896247600.png";
import destImageShillong from "../assets/images/regenerated_image_1777780523170.png";
import destImageMawlynnong from "../assets/images/regenerated_image_1777780711853.png";

export default function DestinationsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeState, setActiveState] = useState<string | "All">("All");

  const states = ["All", "Meghalaya", "Assam", "Arunachal Pradesh"];
  
  const filteredDestinations = activeState === "All" 
    ? DESTINATIONS 
    : DESTINATIONS.filter(d => d.state === activeState);

  const getDestImage = (name: string, defaultImage: string) => {
    if (name === "Cherrapunji") return destImageCherrapunji;
    if (name === "Shillong") return destImageShillong;
    if (name === "Mawlynnong") return destImageMawlynnong;
    return defaultImage;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
              <Compass className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tighter text-zinc-900">NYRAV</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-zinc-600 hover:text-emerald-600 transition-colors">Home</Link>
            <Link to="/cabs" className="text-sm font-medium text-zinc-600 hover:text-emerald-600 transition-colors">Cabs</Link>
            <Link to="/destinations" className="text-sm font-medium text-emerald-600">Destinations</Link>
            <Link to="/itinerary" className="text-sm font-medium text-zinc-600 hover:text-emerald-600 transition-colors">Itinerary</Link>
            <Link to="/query" className="text-sm font-medium text-zinc-600 hover:text-emerald-600 transition-colors">Enquiry</Link>
          </div>

          <div className="hidden md:block">
            <Link to="/query">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6">
                Plan Your Trip
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="text-zinc-900" /> : <Menu className="text-zinc-900" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl py-6 px-6 flex flex-col gap-4 md:hidden"
          >
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-zinc-900">Home</Link>
            <Link to="/cabs" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-zinc-900">Cabs</Link>
            <Link to="/destinations" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-emerald-600">Destinations</Link>
            <Link to="/query" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-zinc-900">Enquiry</Link>
            <Link to="/query" onClick={() => setMobileMenuOpen(false)}>
              <Button className="bg-emerald-600 w-full mt-2">
                Plan Your Trip
              </Button>
            </Link>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-zinc-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070" 
            alt="Northeast India" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 mb-6 py-1.5 px-4 text-sm">
              Explore Northeast India
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Breathtaking Destinations</h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10">
              Discover the hidden gems of Meghalaya, Assam, and Arunachal Pradesh. From misty mountains to lush river islands, we take you everywhere.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {states.map((state) => (
            <button
              key={state}
              onClick={() => setActiveState(state)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                activeState === state 
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" 
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {state}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest, index) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden border-none shadow-lg hover:shadow-xl transition-all rounded-3xl h-full flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={getDestImage(dest.name, dest.image)} 
                    alt={dest.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 backdrop-blur-sm text-emerald-600 border-none font-bold">
                      {dest.state}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-zinc-900 mb-3">{dest.name}</h3>
                  <p className="text-zinc-500 text-sm mb-6 flex-1">
                    {dest.description}
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Must Visit:</h4>
                    <div className="flex flex-wrap gap-2">
                      {dest.locations.map((loc) => (
                        <span key={loc} className="inline-flex items-center gap-1 text-xs font-medium text-zinc-600 bg-zinc-100 px-3 py-1 rounded-full">
                          <Navigation size={10} className="text-emerald-500" /> {loc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link to="/query">
                    <Button className="w-full bg-zinc-900 hover:bg-emerald-600 text-white rounded-xl py-6 group transition-all">
                      Plan Trip to {dest.name} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="bg-emerald-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to explore the Northeast?</h2>
            <p className="text-emerald-50 mb-12 text-lg">
              Our experts are ready to craft the perfect itinerary for your dream vacation. Contact us today for a customized quote.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/query">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 rounded-full px-10 py-7 text-lg font-bold">
                  Get a Free Quote
                </Button>
              </Link>
              <a href={`tel:${CONTACT_INFO.phones[0]}`} className="flex items-center gap-3 text-white font-bold text-xl">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Phone size={24} />
                </div>
                <span>{CONTACT_INFO.phones[0]}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white py-12 px-6 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Compass className="text-white" size={18} />
            </div>
            <span className="text-xl font-bold tracking-tighter">NYRAV</span>
          </div>
          <div className="flex justify-center gap-6 mb-6 text-sm text-zinc-400">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/cabs" className="hover:text-white transition-colors">Cabs</Link>
            <Link to="/query" className="hover:text-white transition-colors">Enquiry</Link>
            <a href={`https://${CONTACT_INFO.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline decoration-emerald-500/50 underline-offset-4">{CONTACT_INFO.website}</a>
          </div>
          <p className="text-zinc-500 text-sm">© 2026 NYRAV TOURS AND TRAVELS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
