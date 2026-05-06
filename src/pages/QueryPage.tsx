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
  Calendar,
  Clock,
  Mail,
  Car,
  Send,
  ArrowLeft
} from "lucide-react";
import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CONTACT_INFO } from "../constants";

export default function QueryPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          source: "Query Page Form"
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        console.error("Failed to send enquiry");
        alert("There was an error sending your enquiry. Please try again or call us directly.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error sending your enquiry. Please try again or call us directly.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "glass-nav py-3 shadow-sm" : "bg-zinc-900/80 backdrop-blur-md py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">N</div>
            <span className="font-serif text-xl font-bold tracking-tight text-white">
              NYRAV <span className="text-emerald-500">TOURS AND TRAVELS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-medium text-white/90">
            <Link to="/" className="hover:text-emerald-500 transition-colors">Home</Link>
            <Link to="/cabs" className="hover:text-emerald-500 transition-colors">Cabs</Link>
            <Link to="/destinations" className="hover:text-emerald-500 transition-colors">Destinations</Link>
            <Link to="/itinerary" className="hover:text-emerald-500 transition-colors">Itinerary</Link>
            <Link to="/query" className="text-emerald-500 transition-colors">Enquiry</Link>
            <a href={`tel:${CONTACT_INFO.phones[0]}`} className="flex items-center gap-2 text-emerald-500 hover:text-emerald-400 transition-colors">
              <Phone size={18} />
              <span>{CONTACT_INFO.phones[0]}</span>
            </a>
          </div>

          <div className="hidden md:block">
            <Link to="/">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-6">
                <ArrowLeft className="mr-2 w-4 h-4" /> Back to Home
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="text-white" /> : <Menu className="text-white" />}
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
            <Link to="/destinations" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-zinc-900">Destinations</Link>
            <Link to="/query" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-emerald-600">Enquiry</Link>
            <a href={`tel:${CONTACT_INFO.phones[0]}`} className="flex items-center gap-3 text-emerald-600 font-bold text-lg py-2">
              <Phone size={20} />
              <span>{CONTACT_INFO.phones[0]}</span>
            </a>
          </motion.div>
        )}
      </nav>

      {/* Header */}
      <section className="relative pt-48 pb-24 bg-zinc-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070" 
            alt="Meghalaya Landscape" 
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
              Plan Your Journey
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Booking Enquiry</h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Fill out the form below and our team will get back to you with the best quotes and travel plans within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-none shadow-2xl overflow-hidden rounded-[2.5rem]">
            <CardHeader className="bg-emerald-600 text-white p-10 text-center">
              <CardTitle className="text-3xl font-bold">Travel Details</CardTitle>
              <p className="text-emerald-50/80 mt-2">Tell us about your upcoming trip</p>
            </CardHeader>
            <CardContent className="p-10">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 mb-2">Enquiry Submitted!</h3>
                  <p className="text-zinc-500">Thank you for reaching out. Our team will contact you shortly.</p>
                  <Button 
                    className="mt-8 bg-emerald-600 hover:bg-emerald-700 rounded-full px-8"
                    onClick={() => setSubmitted(false)}
                  >
                    Submit Another Query
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Pickup Location */}
                    <div className="space-y-3">
                      <Label htmlFor="pickup" className="text-sm font-bold text-zinc-700 flex items-center gap-2">
                        <MapPin size={16} className="text-emerald-500" /> Pickup Location
                      </Label>
                      <Input 
                        id="pickup" 
                        name="pickup"
                        placeholder="e.g. Guwahati Airport" 
                        required 
                        className="rounded-xl border-zinc-200 focus:border-emerald-500 focus:ring-emerald-500 h-12"
                      />
                    </div>

                    {/* Drop Location */}
                    <div className="space-y-3">
                      <Label htmlFor="drop" className="text-sm font-bold text-zinc-700 flex items-center gap-2">
                        <MapPin size={16} className="text-emerald-500" /> Drop Location
                      </Label>
                      <Input 
                        id="drop" 
                        name="drop"
                        placeholder="e.g. Shillong Police Bazar" 
                        required 
                        className="rounded-xl border-zinc-200 focus:border-emerald-500 focus:ring-emerald-500 h-12"
                      />
                    </div>

                    {/* Pickup Date */}
                    <div className="space-y-3">
                      <Label htmlFor="date" className="text-sm font-bold text-zinc-700 flex items-center gap-2">
                        <Calendar size={16} className="text-emerald-500" /> Pickup Date
                      </Label>
                      <Input 
                        id="date" 
                        name="date"
                        type="date" 
                        required 
                        className="rounded-xl border-zinc-200 focus:border-emerald-500 focus:ring-emerald-500 h-12"
                      />
                    </div>

                    {/* Time */}
                    <div className="space-y-3">
                      <Label htmlFor="time" className="text-sm font-bold text-zinc-700 flex items-center gap-2">
                        <Clock size={16} className="text-emerald-500" /> Pickup Time
                      </Label>
                      <Input 
                        id="time" 
                        name="time"
                        type="time" 
                        required 
                        className="rounded-xl border-zinc-200 focus:border-emerald-500 focus:ring-emerald-500 h-12"
                      />
                    </div>

                    {/* Mobile Number */}
                    <div className="space-y-3">
                      <Label htmlFor="mobile" className="text-sm font-bold text-zinc-700 flex items-center gap-2">
                        <Phone size={16} className="text-emerald-500" /> Mobile Number
                      </Label>
                      <Input 
                        id="mobile" 
                        name="mobile"
                        type="tel" 
                        placeholder="Enter 10-digit number" 
                        required 
                        className="rounded-xl border-zinc-200 focus:border-emerald-500 focus:ring-emerald-500 h-12"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-sm font-bold text-zinc-700 flex items-center gap-2">
                        <Mail size={16} className="text-emerald-500" /> Email Address
                      </Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email" 
                        placeholder="your@email.com" 
                        required 
                        className="rounded-xl border-zinc-200 focus:border-emerald-500 focus:ring-emerald-500 h-12"
                      />
                    </div>

                    {/* Vehicle Type */}
                    <div className="space-y-3 md:col-span-2">
                      <Label htmlFor="vehicle" className="text-sm font-bold text-zinc-700 flex items-center gap-2">
                        <Car size={16} className="text-emerald-500" /> Vehicle Type
                      </Label>
                      <Select name="vehicle" required>
                        <SelectTrigger className="rounded-xl border-zinc-200 focus:border-emerald-500 h-12">
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedan">Sedan (4+1 Seater)</SelectItem>
                          <SelectItem value="suv">SUV (6+1 / 7+1 Seater)</SelectItem>
                          <SelectItem value="tempo">Tempo Traveller (12-26 Seater)</SelectItem>
                          <SelectItem value="bus">Luxury Bus</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-full py-8 text-xl font-bold shadow-xl group"
                  >
                    Submit Enquiry <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-6 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center text-white font-bold text-lg">N</div>
            <span className="font-serif text-lg font-bold tracking-tight text-zinc-900">
              NYRAV <span className="text-emerald-500">TOURS AND TRAVELS</span>
            </span>
          </div>
          
          <div className="flex gap-8 text-sm font-medium text-zinc-500">
            <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
            <Link to="/cabs" className="hover:text-emerald-600 transition-colors">Cabs</Link>
            <Link to="/destinations" className="hover:text-emerald-600 transition-colors">Destinations</Link>
            <Link to="/query" className="hover:text-emerald-600 transition-colors">Enquiry</Link>
          </div>

          <p className="text-zinc-400 text-sm">
            © 2026 NYRAV TOURS AND TRAVELS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
