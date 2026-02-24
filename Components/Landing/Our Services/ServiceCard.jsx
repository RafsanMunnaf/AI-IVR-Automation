import { useState } from "react";

const ServiceCard = ({
  active,
  agent_id,
  icon,
  title,
  description,
  delay,
  onClick,
  isActive,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-500 ${
        isActive ? "scale-105" : ""
      }`}
      style={{
        animation: `fadeInUp 0.6s ease-out forwards`,
        animationDelay: `${delay}s`,
        opacity: 0,
      }}
      // onClick={() => onClick({ title, description, agent_id })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card background with gradient border */}
      <div
        className={`relative h-full bg-primary/40 backdrop-blur-sm rounded-2xl p-8 border-2 transition-all duration-300
          ${
            isActive
              ? "border-blue-500 shadow-2xl shadow-blue-500/50"
              : active
              ? "border-blue-900/50 hover:border-blue-600"
              : "border-gray-800/50 opacity-60 hover:opacity-80"
          }
        `}
      >
        {/* Glow effect on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            isActive ? "opacity-100" : ""
          }`}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div
            className={`mb-6 transition-transform duration-300 ${
              isHovered || isActive ? "scale-110" : ""
            }`}
          >
            <div
              className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${
                active
                  ? "bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-500/50"
                  : "bg-gray-800/50"
              }`}
            >
              {icon}
            </div>
          </div>

          {/* Status badge */}
          {active && (
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-semibold">
                Active
              </span>
            </div>
          )}

          {/* Title */}
          <h3
            className={`text-2xl font-bold mb-3 transition-colors duration-300 ${
              active ? "text-white" : "text-gray-400"
            }`}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className={`text-gray-400 leading-relaxed mb-6 ${
              active ? "text-gray-300" : ""
            }`}
          >
            {description}
          </p>

          {/* Agent ID */}
          {agent_id && (
            <div className="text-xs text-gray-500 font-mono">
              ID: {agent_id}
            </div>
          )}

          {/* Arrow indicator */}
          {/* <div
            className={`mt-6 flex items-center gap-2 text-blue-400 font-semibold transition-transform duration-300 ${
              isHovered || isActive ? "translate-x-2" : ""
            }`}
          >
            <span>Learn More</span>
            <svg
              className="w-5 h-5"
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
          </div> */}
        </div>

        {/* Corner accent */}
        <div
          className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-600/20 to-transparent rounded-2xl transition-opacity duration-300 ${
            isHovered || isActive ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ServiceCard;
