/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Menu,
  X,
  ChevronRight,
  ArrowRight,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Globe,
  Calendar,
  Clock,
  Car,
  ShieldCheck,
  Star,
  Map as MapIcon,
  ChevronDown
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ITINERARIES, CONTACT_INFO } from "../constants";

const WhatsAppIcon = ({ size = 24 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function ItineraryPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDay, setActiveDay] = useState<number | null>(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const itinerary = ITINERARIES[0]; // Currently only one main itinerary

  return (
    <div className="min-h-screen bg-zinc-50 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "glass-nav py-3 shadow-sm" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">N</div>
            <span className={`font-serif text-xl font-bold tracking-tight ${isScrolled ? "text-zinc-900" : "text-white"}`}>
              NYRAV <span className="text-emerald-500">TOURS AND TRAVELS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center gap-8 font-medium ${isScrolled ? "text-zinc-600" : "text-white/90"}`}>
            <Link to="/" className="hover:text-emerald-500 transition-colors">Home</Link>
            <Link to="/cabs" className="hover:text-emerald-500 transition-colors">Cabs</Link>
            <Link to="/destinations" className="hover:text-emerald-500 transition-colors">Destinations</Link>
            <Link to="/itinerary" className="text-emerald-500 transition-colors">Itinerary</Link>
            <Link to="/query" className="hover:text-emerald-500 transition-colors">Enquiry</Link>
          </div>

          <button 
            className={`md:hidden p-2 rounded-lg ${isScrolled ? "text-zinc-900 bg-zinc-100" : "text-white bg-white/10 backdrop-blur-md"}`}
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed inset-0 z-[60] bg-white"
        >
          <div className="p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-12">
              <span className="font-serif text-xl font-bold text-zinc-900">NYRAV TOURS</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 bg-zinc-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-6 text-2xl font-bold text-zinc-900">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/cabs" onClick={() => setMobileMenuOpen(false)}>Cabs</Link>
              <Link to="/destinations" onClick={() => setMobileMenuOpen(false)}>Destinations</Link>
              <Link to="/itinerary" onClick={() => setMobileMenuOpen(false)} className="text-emerald-600">Itinerary</Link>
              <Link to="/query" onClick={() => setMobileMenuOpen(false)}>Enquiry</Link>
            </div>
            <div className="mt-auto pt-8 border-t border-zinc-100">
              <p className="text-zinc-500 mb-4">Book your trip via WhatsApp</p>
              <a 
                href={CONTACT_INFO.whatsapp}
                className="flex items-center justify-center gap-3 w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-600/20"
              >
                <WhatsAppIcon size={24} />
                <span>Chat with us</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src={itinerary.image} 
            alt={itinerary.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-zinc-950/60" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-emerald-500 text-white border-none mb-6 px-4 py-1.5 text-sm uppercase tracking-wider font-bold">
              Best Seller
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {itinerary.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium mb-8">
              {itinerary.duration} • {itinerary.coverage}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                <Car className="w-5 h-5 text-emerald-400" />
                <span className="font-bold">₹{itinerary.pricePerDay}/day</span>
              </div>
              <Link to="/query">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 h-14 text-lg shadow-xl shadow-emerald-600/20">
                  Book This Tour <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Itinerary content */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Calendar className="w-8 h-8 text-emerald-600" />
                Day-wise Breakdown
              </h2>
              
              <div className="space-y-6">
                {itinerary.days.map((day) => (
                  <motion.div 
                    key={day.day}
                    className={`rounded-3xl border transition-all duration-300 ${activeDay === day.day ? "bg-white border-emerald-200 shadow-xl shadow-emerald-100/50 p-8" : "bg-zinc-100 border-transparent p-6 cursor-pointer hover:bg-zinc-200/50"}`}
                    onClick={() => setActiveDay(day.day === activeDay ? null : day.day)}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-6">
                        <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-bold transition-colors ${activeDay === day.day ? "bg-emerald-600 text-white" : "bg-white text-zinc-900"}`}>
                          <span className="text-xs uppercase opacity-70">Day</span>
                          <span className="text-2xl leading-none">{day.day}</span>
                        </div>
                        <div>
                          <h3 className={`text-xl font-bold ${activeDay === day.day ? "text-zinc-900" : "text-zinc-600"}`}>{day.title}</h3>
                        </div>
                      </div>
                      <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${activeDay === day.day ? "rotate-180 text-emerald-600" : "text-zinc-400"}`} />
                    </div>
                    
                    {activeDay === day.day && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-8 pt-8 border-t border-zinc-100"
                      >
                        <p className="text-lg text-zinc-600 mb-8 leading-relaxed italic border-l-4 border-emerald-500 pl-6">
                          "{day.description}"
                        </p>
                        
                        {day.image && (
                          <div className="mb-8 rounded-2xl overflow-hidden aspect-video">
                            <img 
                              src={day.image} 
                              alt={day.title} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {day.activities.map((act, i) => (
                            <div key={i} className="flex items-start gap-3 bg-zinc-50 p-4 rounded-2xl">
                              <div className="mt-1">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                              </div>
                              <span className="font-semibold text-zinc-700">{act}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-zinc-200 overflow-hidden">
              <div className="bg-emerald-600 p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Package Details</h3>
                <p className="opacity-80">Inclusive cab & travel guide</p>
              </div>
              <CardContent className="p-8 space-y-8">
                <div>
                  <h4 className="font-bold text-zinc-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    Inclusions
                  </h4>
                  <ul className="space-y-3">
                    {itinerary.inclusions.map((item, i) => (
                      <li key={i} className="text-zinc-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-8 border-t border-zinc-100">
                  <h4 className="font-bold text-zinc-900 mb-4 flex items-center gap-2">
                    <X className="w-5 h-5 text-red-500" />
                    Exclusions
                  </h4>
                  <ul className="space-y-3">
                    {itinerary.exclusions.map((item, i) => (
                      <li key={i} className="text-zinc-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 border-t border-zinc-100">
                  <div className="text-center bg-zinc-50 p-6 rounded-3xl">
                    <p className="text-zinc-500 text-sm font-bold uppercase mb-2">Total Estimated Price</p>
                    <div className="flex items-end justify-center gap-1">
                      <span className="text-4xl font-bold text-zinc-900">₹{itinerary.pricePerDay * 6}</span>
                      <span className="text-zinc-500 mb-1">/tour</span>
                    </div>
                  </div>
                  <Link to="/query" className="mt-8 block">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl py-8 font-bold text-lg">
                      Send Enquiry
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <div className="bg-zinc-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Phone className="w-24 h-24" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
              <p className="text-zinc-400 mb-8 leading-relaxed">
                Contact us for custom itineraries or any travel related queries in Northeast India.
              </p>
              <div className="space-y-4">
                <a href={CONTACT_INFO.whatsapp} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 p-4 rounded-2xl transition-colors">
                  <div className="w-10 h-10 bg-emerald-600/20 text-emerald-500 flex items-center justify-center rounded-xl">
                    <WhatsAppIcon size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">WhatsApp</p>
                    <p className="font-bold">{CONTACT_INFO.phones[0]}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">N</div>
                <span className="font-serif text-2xl font-bold tracking-tight">
                  NYRAV <span className="text-emerald-500">TOURS AND TRAVELS</span>
                </span>
              </Link>
              <p className="text-zinc-400 max-w-md leading-relaxed mb-8">
                Your trusted travel partner for exploring the untouched beauty of Northeast India. We specialize in custom tours, cab services, and authentic experiences.
              </p>
              <div className="flex gap-4">
                {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 bg-white/5 hover:bg-emerald-600 rounded-xl flex items-center justify-center transition-all">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-xl mb-8">Quick Links</h4>
              <ul className="space-y-4 text-zinc-400">
                <li><Link to="/" className="hover:text-emerald-500 transition-colors">Home</Link></li>
                <li><Link to="/cabs" className="hover:text-emerald-500 transition-colors">Cabs</Link></li>
                <li><Link to="/destinations" className="hover:text-emerald-500 transition-colors">Destinations</Link></li>
                <li><Link to="/itinerary" className="hover:text-emerald-500 transition-colors">Itineraries</Link></li>
                <li><Link to="/query" className="hover:text-emerald-500 transition-colors">Book Now</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xl mb-8">Contact Info</h4>
              <ul className="space-y-6 text-zinc-400">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>{CONTACT_INFO.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>{CONTACT_INFO.phones.join(" / ")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    {CONTACT_INFO.emails.map((email, idx) => (
                      <a key={idx} href={`mailto:${email}`} className="hover:text-emerald-500 transition-colors">
                        {email}
                      </a>
                    ))}
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-emerald-500 shrink-0" />
                  <a href={CONTACT_INFO.website} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-colors">
                    {CONTACT_INFO.website.replace('https://', '')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-500">
            <p>&copy; 2026 NYRAV TOURS AND TRAVELS. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href={CONTACT_INFO.hPanel} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors opacity-20 hover:opacity-100 text-[10px] uppercase font-bold self-center">hPanel Login</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
