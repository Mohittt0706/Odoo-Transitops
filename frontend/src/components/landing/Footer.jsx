import React from 'react';
import { Shield } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        {/* About column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
              <Shield className="w-4.5 h-4.5" />
            </div>
            <span className="font-headings font-extrabold text-lg text-white">
              Transit<span className="text-primary">Ops</span>
            </span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400 font-medium">
            Smart Logistics & Fleet Telematics Platform. Fully integrated with Odoo ERP modules to simplify freight dispatching.
          </p>
          <div className="flex items-center gap-4 mt-2">
            {/* Twitter/X SVG */}
            <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            {/* LinkedIn SVG */}
            <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zm-1.5-10.268a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM19 19h-3v-4.5c0-1.103-.897-2-2-2s-2 .897-2 2V19h-3v-9h3v1.171c.582-.767 1.637-1.421 2.915-1.421 2.378 0 4.085 1.879 4.085 4.75V19z"/>
              </svg>
            </a>
            {/* GitHub SVG */}
            <a href="#" className="hover:text-white transition-colors" aria-label="GitHub">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-headings font-bold text-xs uppercase tracking-wider text-white mb-4">Platform</h4>
          <ul className="flex flex-col gap-2.5 text-xs font-semibold">
            <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="#solutions" className="hover:text-white transition-colors">Solutions</a></li>
            <li><a href="#roles" className="hover:text-white transition-colors">Roles</a></li>
            <li><a href="#pricing" className="hover:text-white transition-colors">Pricing (Soon)</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-headings font-bold text-xs uppercase tracking-wider text-white mb-4">Resources</h4>
          <ul className="flex flex-col gap-2.5 text-xs font-semibold">
            <li><a href="#" className="hover:text-white transition-colors">Developer Docs</a></li>
            <li><a href="#" className="hover:text-white transition-colors">ERP Integrations</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Logistics Blog</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Release Notes</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-headings font-bold text-xs uppercase tracking-wider text-white mb-4">Support</h4>
          <ul className="flex flex-col gap-2.5 text-xs font-semibold">
            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Security Status</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Odoo Support</a></li>
          </ul>
        </div>

      </div>

      <div className="container mx-auto px-6 border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
          © {year} TransitOps. All rights reserved. Registered with Odoo Hackathon 2026.
        </span>
        <div className="flex gap-6 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
