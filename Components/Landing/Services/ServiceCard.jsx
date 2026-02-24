import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { CheckCheck } from "lucide-react";

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  agent_id,
  delay,
  onClick,
  active,
  isActive,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const iconRef = useRef(null);
  const buttonRef = useRef(null);
  const glowRef = useRef(null);
  const pulseAnimationRef = useRef(null);

  useEffect(() => {
    // Initial animation
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: delay / 1000,
        ease: "power3.out",
      }
    );
  }, [delay]);

  useEffect(() => {
    // Talking/Pulsing shadow effect when active
    if (isActive && glowRef.current) {
      // Create continuous pulsing animation
      pulseAnimationRef.current = gsap.to(glowRef.current, {
        scale: 1.15,
        opacity: 0.9,
        duration: 1.2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });
    } else if (pulseAnimationRef.current) {
      // Kill animation when not active
      pulseAnimationRef.current.kill();
      gsap.to(glowRef.current, {
        scale: 1,
        opacity: isHovered ? 0.5 : 0,
        duration: 0.4,
      });
    }

    return () => {
      if (pulseAnimationRef.current) {
        pulseAnimationRef.current.kill();
      }
    };
  }, [isActive, isHovered]);

  const handleMouseEnter = () => {
    if (isActive) return; // Don't override active state animation

    setIsHovered(true);

    // Card scale and shadow animation
    gsap.to(cardRef.current, {
      scale: 1.05,
      duration: 0.4,
      ease: "power2.out",
    });

    // Icon rotation and scale
    gsap.to(iconRef.current, {
      rotation: 12,
      scale: 1.15,
      duration: 0.5,
      ease: "back.out(1.7)",
    });

    // Button slide animation
    gsap.to(buttonRef.current, {
      x: 8,
      duration: 0.3,
      ease: "power2.out",
    });

    // Glow effect
    gsap.to(glowRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (isActive) return; // Don't override active state animation

    setIsHovered(false);

    gsap.to(cardRef.current, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.to(iconRef.current, {
      rotation: 0,
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.7)",
    });

    gsap.to(buttonRef.current, {
      x: 0,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(glowRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleClick = () => {
    if (!active) return; // Don't override active state animation
    // Click animation
    gsap.to(cardRef.current, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.in",
      onComplete: () => {
        gsap.to(cardRef.current, {
          scale: 1.05,
          duration: 0.2,
          ease: "power2.out",
        });
      },
    });

    if (onClick) onClick(title, agent_id);
  };

  return (
    <div
      ref={cardRef}
      className={`relative group cursor-pointer h-full ${
        !active ? "pointer-events-none cursor-not-allowed" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Outer glow effect */}
      <div
        ref={glowRef}
        className={`absolute -inset-1 rounded-2xl blur-xl transition-opacity duration-500 h-full ${
          isActive
            ? "bg-gradient-to-br from-green-500/60 via-emerald-500/60 to-green-500/60 opacity-100"
            : "bg-gradient-to-br from-blue-500/50 via-purple-500/50 to-blue-500/50 opacity-0"
        }`}
      />

      {/* Main card */}
      <div
        className={`relative backdrop-blur-md bg-white/10 rounded-2xl p-6 h-full overflow-hidden transition-all duration-500 ${
          isActive
            ? "border-2 border-green-400/80 shadow-2xl shadow-green-500/40"
            : "border border-blue-500/30"
        }`}
      >
        {/* Animated gradient overlay */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isActive
              ? "bg-gradient-to-br from-green-500/20 to-emerald-500/20 opacity-100"
              : isHovered
              ? "bg-gradient-to-br from-secondary/30 to-primary/30 opacity-100"
              : "opacity-0"
          }`}
        />

        {/* Shimmer effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ${
            isHovered ? "translate-x-full" : "-translate-x-full"
          }`}
          style={{
            transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
          }}
        />

        <div className="relative z-10">
          {/* Icon container */}
          <div
            ref={iconRef}
            className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg transition-all duration-500 ${
              isActive
                ? "bg-gradient-to-br from-green-500/70 to-emerald-600/70 shadow-green-500/40"
                : "bg-gradient-to-br from-blue-600/50 to-blue-800/50 shadow-blue-500/30"
            }`}
          >
            <Icon className="w-8 h-8 text-white" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-blue-200 text-sm mb-6 leading-relaxed">
            {description}
          </p>

          {/* Button */}
          <div className="flex items-center justify-between">
            <button
              ref={buttonRef}
              className={`flex items-center font-medium transition-all duration-300 ${
                isActive ? "text-green-400" : "text-white"
              }`}
            >
              {isActive ? "✓ Selected" : "Select Service"}
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
            <p className="text-green-400 shadow-2xl shadow-green-900">
              {active && (
                <div className="relative">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 rounded-full bg-green-500 opacity-40 animate-ping"></div>

                  {/* Ball with shadow */}
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg animate-pulse">
                      {/* Inner highlight */}
                      <div className="absolute top-0 left-2 w-1 h-1 rounded-full bg-white opacity-40"></div>
                    </div>

                    {/* Blinking shadow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-12 h-3 bg-green-500 rounded-full blur-md opacity-60 animate-pulse"></div>
                  </div>
                </div>
              )}
            </p>
          </div>
        </div>

        {/* Corner accents */}
        <div
          className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-transparent rounded-bl-full transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-purple-400/20 to-transparent rounded-tr-full transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
};

export default ServiceCard;
