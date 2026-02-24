import { useState } from "react";

const FeatureCard = ({ icon: Icon, title, description, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative bg-gradient-to-br from-blue-700/30 to-blue-900/30 backdrop-blur-sm border border-blue-500/30 rounded-3xl p-6 md:p-8 h-full transition-all duration-500 ${
          isHovered
            ? "transform scale-105 border-blue-400/60 shadow-2xl shadow-blue-500/30"
            : ""
        }`}
      >
        <div className="flex items-start gap-4 md:gap-6">
          <div
            className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-600/40 to-blue-800/40 border-2 border-blue-500/50 flex items-center justify-center transition-all duration-500 ${
              isHovered ? "transform rotate-12 scale-110 border-blue-400" : ""
            }`}
          >
            <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-xl md:text-2xl lg:text-2xl font-bold text-white mb-2 md:mb-3 break-words">
              {title}
            </h3>
            <p className="text-sm md:text-base text-blue-200 leading-relaxed break-words">
              {description}
            </p>
          </div>
        </div>

        {isHovered && (
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/10 to-purple-500/10 pointer-events-none" />
        )}
      </div>
    </div>
  );
};

export default FeatureCard;
