"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

function FloatingPaths({ position }) {
  const svgRef = useRef(null);

  const paths = Array.from({ length: 36 }, (_, i) => {
    const startX = 984 - i * 6 * position; // Start from right
    const startY = -189 + i * 6;
    const midX1 = 500 - i * 3 * position;
    const midY1 = 50 + i * 8;
    const midX2 = 200 - i * 4 * position;
    const midY2 = -100 + i * 10;
    const endX = -480 - i * 5 * position; // End on left
    const endY = 875 - i * 6;

    return {
      id: i,
      d: `M${startX} ${startY}L${midX1} ${midY1}L${midX2} ${midY2}L${endX} ${endY}`,
      color: `rgba(15,23,42,${0.1 + i * 0.03})`,
      width: 0.5 + i * 0.03,
    };
  });

  useEffect(() => {
    if (!svgRef.current) return;

    const pathElements = svgRef.current.querySelectorAll("path");

    pathElements.forEach((path, index) => {
      const pathLength = path.getTotalLength();

      // Set initial state
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength * 0.8, // Start with 30% visible
        opacity: 0.6,
      });

      // Create animation timeline
      const tl = gsap.timeline({ repeat: -1 });

      tl.to(path, {
        strokeDashoffset: 0,
        duration: 20 + Math.random() * 10,
        ease: "none",
      }).to(
        path,
        {
          opacity: 0.3,
          duration: 10 + Math.random() * 5,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        },
        0
      ); // Start opacity animation at the same time
    });

    return () => {
      gsap.killTweensOf(pathElements);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        ref={svgRef}
        className="w-full h-full text-blue-300"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
          />
        ))}
      </svg>
    </div>
  );
}

export default function BackgroundPaths({ children }) {
  return (
    <div className="relative w-full flex items-center justify-center overflow-hidden gradient-pulse bg-gradient-to-b to-primary to-70% from-30% via-secondary from-primary border-b border-white/60">
      <div className="absolute inset-0">
        {/* <FloatingPaths position={1} /> */}
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 container mx-auto">{children}</div>
    </div>
  );
}
