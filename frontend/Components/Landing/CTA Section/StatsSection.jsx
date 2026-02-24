import React from "react";

const StatCard = ({ value, label, delay }) => {
  return (
    <div
      className="flex flex-col items-center justify-center animate-fade-in-up"
      style={{ animationDelay: `${delay}ms`, opacity: 0 }}
    >
      <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-3 md:mb-4">
        {value}
      </h2>
      <p className="text-base sm:text-lg md:text-xl text-blue-100 text-center">
        {label}
      </p>
    </div>
  );
};

export default function StatsSection() {
  const stats = [
    { value: "95%", label: "Booking Success Rate", delay: 0 },
    { value: "<2s", label: "Average Response Time", delay: 150 },
    { value: "24/7", label: "AI Agent Availability", delay: 300 },
  ];

  return (
    <div className="container mx-auto pt-8 md:pt-12 lg:pt-16">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            value={stat.value}
            label={stat.label}
            delay={stat.delay}
          />
        ))}
      </div>
    </div>
  );
}
