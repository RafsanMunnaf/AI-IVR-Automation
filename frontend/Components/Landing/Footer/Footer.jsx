import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="container mx-auto">
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
        {/* Company Info */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600/30 border-2 border-blue-400/50 flex items-center justify-center">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Betopia Limited
            </h2>
          </div>
          <p className="text-blue-100 text-sm md:text-base leading-relaxed">
            We develop custom AI voice appointment systems for businesses. Let
            us automate your operations and save you time and money.
          </p>
        </div>

        {/* Contact Info */}
        <div className="lg:col-span-1">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-300 mt-1 flex-shrink-0" />
              <a
                href="mailto:contact@betopiagroup.com"
                className="text-blue-100 hover:text-white transition-colors text-sm md:text-base"
              >
                contact@betopiagroup.com
              </a>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-blue-300 mt-1 flex-shrink-0" />
              <a
                href="tel:+8801XXXXXXX"
                className="text-blue-100 hover:text-white transition-colors text-sm md:text-base"
              >
                +880 1XXX-XXXXXX
              </a>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-300 mt-1 flex-shrink-0" />
              <span className="text-blue-100 text-sm md:text-base">
                Dhaka, Bangladesh
              </span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-2 flex justify-between">
          <div className="">
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="text-blue-100 hover:text-white transition-colors text-sm md:text-base block"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#how-it-work"
                  className="text-blue-100 hover:text-white transition-colors text-sm md:text-base block"
                >
                  How it Work
                </a>
              </li>
              <li>
                <a
                  href="#service"
                  className="text-blue-100 hover:text-white transition-colors text-sm md:text-base block"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-blue-100 hover:text-white transition-colors text-sm md:text-base block"
                >
                  Features
                </a>
              </li>
            </ul>
          </div>

          <div className="">
            <h3 className="text-xl font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#privacy"
                  className="text-blue-100 hover:text-white transition-colors text-sm md:text-base block"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="text-blue-100 hover:text-white transition-colors text-sm md:text-base block"
                >
                  Terms of service
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white py-4">
        <p className="text-blue-200 text-sm md:text-base text-center md:text-left">
          © 2025 Betopia Group. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
