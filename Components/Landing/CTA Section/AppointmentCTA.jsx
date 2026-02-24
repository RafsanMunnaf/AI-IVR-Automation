"use client";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function AppointmentCTA() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="container mx-auto w-full text-center border-b border-white pb-8 md:pb-12 lg:pb-16">
      {/* Main Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight animate-fade-in-up px-4">
        Ready to automate your appointment system?
      </h1>

      {/* Subheading */}
      <p
        className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-12 md:mb-16 leading-relaxed animate-fade-in-up max-w-4xl mx-auto px-4"
        style={{ animationDelay: "0.2s", opacity: 0 }}
      >
        Let Betopia Group build your custom voice appointment system. Start
        saving time and money today.
      </p>

      {/* CTA Button */}
      <div
        className="animate-fade-in-up"
        style={{ animationDelay: "0.4s", opacity: 0 }}
      >
        <a
          href="#appointment"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`group relative inline-flex items-center justify-center gap-3 px-12 py-5 md:px-16 md:py-6 text-xl md:text-2xl font-bold text-white bg-radial to-primary/60  from-secondary rounded-full border-2 border-blue-400/50 transition-all duration-500 overflow-hidden cursor-pointer ${
            isHovered
              ? "transform scale-105 border-blue-300 shadow-2xl"
              : "shadow-xl"
          }`}
        >
          {/* Animated background on hover */}
          <div
            className={`absolute inset-0 bg-radial from-primary/60 to-secondary rounded-full transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Button content */}
          <span className="relative z-10">Get Appointment</span>
          <ArrowRight
            className={`relative z-10 w-6 h-6 md:w-7 md:h-7 transition-transform duration-500 ${
              isHovered ? "transform translate-x-2" : ""
            }`}
          />

          {/* Glow effect */}
          {isHovered && (
            <div className="absolute inset-0 rounded-full animate-pulse-glow pointer-events-none" />
          )}
        </a>
      </div>
    </div>
  );
}
