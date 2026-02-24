import BackgroundPaths from "@/Libs/Background/WaveBackground";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <BackgroundPaths>
      <div className="">
        {/* Header */}
        <header className="relative z-10 flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6 gap-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/Main Image/logo.webp"
              alt="Logo"
              width={100}
              height={400}
              className="w-full h-auto"
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-4 px-6 py-2 bg-radial to-primary from-secondary text-white rounded-full transition-all duration-500 cursor-pointer">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Powered by Advanced AI Technology</span>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="#footer"
              className="px-4 sm:px-6 lg:px-8 py-2 bg-radial to-primary from-secondary border-2 border-blue-400 rounded-full text-sm sm:text-base lg:text-lg hover:bg-radial hover:to-secondary hover:from-primary transition-all duration-500 cursor-pointer text-white"
            >
              Contact Info
            </a>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 lg:px-16 py-10 sm:py-16 lg:py-20 gap-8 lg:gap-0">
          {/* Left Content */}
          <div className="flex-1 max-w-2xl text-white text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 sm:mb-8">
              We Build Agentic AI Solutions for Your Business Needs
            </h1>

            <p className="text-base sm:text-lg text-gray-300 mb-8 sm:mb-12 leading-relaxed italic">
              Our AI-driven agents are designed to seamlessly integrate into
              your business, providing automated support, managing tasks, and
              enhancing customer experiences round the clock. Whether it's
              scheduling, customer service, or data processing, our intelligent
              agents work tirelessly to optimize your operations and drive
              efficiency.
            </p>

            <div className="flex justify-center items-center mt-8 lg:mt-0">
              <div className="relative block md:hidden">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-blue-500 opacity-20 blur-3xl rounded-full"></div>

                {/* Robot Image */}
                <Image
                  src="/Main Image/1d4e31f113f5aae2bee49750480e42c3b3e09294 (1).png"
                  width={500}
                  height={500}
                  alt="AI Robot Assistant"
                  className="w-64 sm:w-80 lg:w-96 xl:w-[500px] h-auto relative z-10 drop-shadow-2xl"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#appointment"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-blue-400 rounded-full text-base sm:text-lg hover:bg-radial hover:to-secondary hover:from-primary hover:bg-opacity-20 transition-all cursor-pointer text-center"
              >
                Get Appointment
              </a>
              <a
                href="#ai-agent"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-radial to-primary from-secondary border-2 border-blue-400 rounded-full text-base sm:text-lg hover:bg-radial hover:to-secondary hover:from-primary transition-all duration-500 cursor-pointer text-center"
              >
                Talk with our Agent
              </a>
            </div>
          </div>

          {/* Right Content - Robot */}
          <div className="flex-1 flex justify-center items-center mt-8 lg:mt-0">
            <div className="relative hidden md:block">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-blue-500 opacity-20 blur-3xl rounded-full"></div>

              {/* Robot Image */}
              <Image
                src="/Main Image/1d4e31f113f5aae2bee49750480e42c3b3e09294 (1).png"
                width={500}
                height={500}
                alt="AI Robot Assistant"
                className="w-64 sm:w-80 lg:w-96 xl:w-[500px] h-auto relative z-10 drop-shadow-2xl"
              />
            </div>
          </div>
        </main>
      </div>
    </BackgroundPaths>
  );
}
