import React from 'react';
import { NavLink } from 'react-router-dom';
import { Phone, Mail, MapPin, Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#111827] text-slate-300 font-serif border-t border-slate-800 pt-12 pb-8 px-6 lg:px-12 mt-auto">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Column 1: Brand & Slogan & Socials (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-blue-700 text-white flex items-center justify-center font-bold text-lg shadow-xs">
                🩺
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-white tracking-tight leading-none">
                  ROTATION <span className="text-blue-400">COMPANION</span>
                </h3>
                <p className="text-[10px] font-serif text-amber-400 tracking-wider uppercase font-semibold mt-1">
                  — CLINICAL PRECISION WORKSTATION & AI GUIDE —
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-serif leading-relaxed max-w-sm">
              Empowering medical students, residents, and clinical scholars with rotation tools, case logs, and AI attending guidance to build a better clinical tomorrow.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-3 pt-1 text-slate-400">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 hover:text-white transition-all" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 hover:text-white transition-all" aria-label="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 hover:text-white transition-all" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://github.com/chandukancheti" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 hover:text-white transition-all" aria-label="GitHub">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>

            {/* Contact Details */}
            <div className="space-y-2.5 pt-2 text-xs font-serif text-slate-300">
              <h4 className="text-xs font-serif font-bold text-white uppercase tracking-wider mb-3">Contact Us</h4>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href="tel:+919346394707" className="hover:text-blue-400 transition-colors">+91 9346394707</a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href="mailto:chandukancheti785@gmail.com" className="hover:text-blue-400 transition-colors">chandukancheti785@gmail.com</a>
              </div>
              <div className="flex items-center space-x-2.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>India (Developer: <strong className="text-white font-bold">chandukancheti</strong>)</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-serif font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">Quick Links</h4>
            <ul className="space-y-2.5 text-xs font-serif">
              <li>
                <NavLink to="/dashboard" className="text-slate-400 hover:text-amber-400 transition-colors">Home & Dashboard</NavLink>
              </li>
              <li>
                <NavLink to="/login" className="text-amber-400 font-bold hover:underline">Student & Admin Login</NavLink>
              </li>
              <li>
                <NavLink to="/rotation" className="text-slate-400 hover:text-amber-400 transition-colors">Active Rotation Block</NavLink>
              </li>
              <li>
                <NavLink to="/rotation/topics" className="text-slate-400 hover:text-amber-400 transition-colors">Topics Curriculum</NavLink>
              </li>
              <li>
                <NavLink to="/cases" className="text-slate-400 hover:text-amber-400 transition-colors">My Clinical Cases</NavLink>
              </li>
              <li>
                <NavLink to="/skills" className="text-slate-400 hover:text-amber-400 transition-colors">Skill Mastery Matrix</NavLink>
              </li>
              <li>
                <NavLink to="/questions" className="text-slate-400 hover:text-amber-400 transition-colors">Attending Questions</NavLink>
              </li>
              <li>
                <NavLink to="/settings" className="text-slate-400 hover:text-amber-400 transition-colors">System Settings</NavLink>
              </li>
            </ul>
          </div>

          {/* Column 3: Clinical Rotations / Services (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-serif font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">Our Rotations</h4>
            <ul className="space-y-2.5 text-xs font-serif text-slate-400">
              <li>Internal Medicine Wards</li>
              <li>General & Acute Surgery</li>
              <li>Pediatric Inpatient</li>
              <li>Obstetrics & Gynecology</li>
              <li>Psychiatry & Behavioral Health</li>
              <li>Emergency Medicine</li>
              <li>Family Medicine Outpatient</li>
              <li>Neurology & Critical Care</li>
            </ul>
          </div>

          {/* Column 4: Support & Compliance (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-serif font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">Support</h4>
            <ul className="space-y-2.5 text-xs font-serif text-slate-400">
              <li>
                <NavLink to="/settings" className="hover:text-white transition-colors">FAQs & Setup</NavLink>
              </li>
              <li>
                <NavLink to="/settings" className="hover:text-white transition-colors">AI Engine Config</NavLink>
              </li>
              <li>
                <NavLink to="/settings" className="hover:text-white transition-colors">Export Local Data</NavLink>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">HIPAA De-ID Policy</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">Terms & Conditions</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-serif">
          <p>© {new Date().getFullYear()} Rotation Companion. All rights reserved. Created by <strong className="text-slate-300 font-bold">chandukancheti</strong>.</p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1 text-emerald-400">
              <Sparkles className="w-3 h-3 inline" /> System Online v1.0
            </span>
            <span className="text-slate-600">•</span>
            <a href="mailto:chandukancheti785@gmail.com" className="hover:text-slate-300 underline">chandukancheti785@gmail.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
