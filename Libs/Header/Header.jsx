import React from "react";

export default function Header({ title, description }) {
  return (
    <div className="text-center mb-12 md:mb-16 lg:mb-20 animate-fade-in px-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
        {title}
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-blue-200 max-w-3xl mx-auto italic">
        {description}
      </p>
    </div>
  );
}
