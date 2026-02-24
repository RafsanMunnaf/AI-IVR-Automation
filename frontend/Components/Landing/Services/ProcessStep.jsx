const ProcessStep = ({ icon: Icon, title, description, delay, isLast }) => {
  return (
    <div
      className="flex flex-col items-center animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600/30 to-blue-800/30 border-2 border-blue-500/50 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:rotate-12 hover:border-blue-400 group">
          <Icon className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
          <div className="absolute inset-0 rounded-full bg-blue-400/0 group-hover:bg-blue-400/20 transition-all duration-500" />
        </div>
      </div>

      <h4 className="text-white font-bold mt-4 text-center">{title}</h4>
      <p className="text-blue-300 text-sm text-center mt-1">{description}</p>

      {!isLast && (
        <div className="hidden lg:block absolute top-12 left-[calc(50%+3rem)] w-20 xl:w-32">
          <svg
            className="w-full h-6 text-blue-500/50"
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
        </div>
      )}
    </div>
  );
};

export default ProcessStep;
