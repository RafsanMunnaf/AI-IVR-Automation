"use client";
import { processSteps, services } from "@/Data/staticData";
import ProcessStep from "./ProcessStep";
import Header from "@/Libs/Header/Header";
import { useEffect, useRef, useState } from "react";
import ServiceCard from "./ServiceCard";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useVapi } from "@/Providers/VapiAgentProvider";
import Toaster from "@/Libs/Toast/Toaster";

export default function ServiceSelection() {
  const [activeService, setActiveService] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const { vapi, setCallStatus, isConnected, isSpeaking } = useVapi();

  const handleCardClick = (title, agent_id) => {
    if (agent_id) {
      if (activeService !== title) {
        setCallStatus("connecting");
        const section = document.getElementById("ai-agent");
        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
        vapi.start(agent_id);
        setActiveService(title);
      } else {
        vapi.stop();
        setActiveService(null);
      }
    } else {
      Toaster({ type: "error", message: "Agent not found" });
    }
  };

  useEffect(() => {
    if (!isSpeaking && !isConnected) {
      setActiveService(null);
    }
  }, [isSpeaking, isConnected]);

  //////////////// all animations and pagination ////////////////

  const getCardsPerView = () => {
    if (typeof window === "undefined") return 1;
    const width = window.innerWidth;
    if (width >= 1280) return 4;
    if (width >= 1024) return 3;
    if (width >= 768) return 1;
    return 1;
  };

  const [cardsPerView, setCardsPerView] = useState(getCardsPerView());

  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxSlide = Math.max(0, services.length - cardsPerView);

  const nextSlide = () => {
    if (currentSlide < maxSlide) {
      const newSlide = currentSlide + 1;
      setCurrentSlide(newSlide);
      animateSlide(newSlide);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      const newSlide = currentSlide - 1;
      setCurrentSlide(newSlide);
      animateSlide(newSlide);
    }
  };

  const animateSlide = (slideIndex) => {
    const cardWidth =
      sliderRef.current?.querySelector(".service-card")?.offsetWidth || 0;
    const gap = 24; // 6 * 4px (gap-6)
    const offset = -(slideIndex * (cardWidth + gap));

    gsap.to(sliderRef.current, {
      x: offset,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <>
      {/* Service Selection Section */}
      <div className="container mx-auto">
        <Header
          title="Choose Your Service"
          description="Select the Service You Need and Our AI Agent Will Guide You."
        />
        <div className="relative">
          <div className="bg-gradient-to-r to-primary/90 from-transparent h-[324px] w-72 absolute -right-50 top-5/12 -translate-y-1/2 z-20 md:block hidden"></div>
          <div className="bg-gradient-to-r from-primary/90 to-transparent h-[324px] w-72 absolute -left-50 top-5/12 -translate-y-1/2 z-20 md:block hidden"></div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 rounded-full bg-blue-600/80 backdrop-blur-md border border-blue-400/50 flex items-center justify-center transition-all duration-300 ${
              currentSlide === 0
                ? "opacity-30 cursor-not-allowed"
                : "opacity-100 hover:bg-blue-500/90 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50"
            }`}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlide >= maxSlide}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 rounded-full bg-blue-600/80 backdrop-blur-md border border-blue-400/50 flex items-center justify-center transition-all duration-300 ${
              currentSlide >= maxSlide
                ? "opacity-30 cursor-not-allowed"
                : "opacity-100 hover:bg-blue-500/90 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50"
            }`}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Slider */}
          <div className="container mx-auto" ref={containerRef}>
            <div
              ref={sliderRef}
              className=" h-full flex gap-6"
              style={{ width: "fit-content" }}
            >
              {services.map((service, index) => (
                <div
                  key={index}
                  className="service-card min-w-[340px] md:min-w-[380px] h-full"
                  style={{
                    width:
                      cardsPerView === 1
                        ? "100%"
                        : cardsPerView === 2
                        ? "calc(50% - 12px)"
                        : cardsPerView === 3
                        ? "calc(33.333% - 16px)"
                        : "calc(25% - 18px)",
                  }}
                >
                  <ServiceCard
                    active={service.active}
                    agent_id={service.agent_id}
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    delay={service.delay}
                    onClick={handleCardClick}
                    isActive={activeService === service.title}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          {maxSlide > 0 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxSlide + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index);
                    animateSlide(index);
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    currentSlide === index
                      ? "w-8 h-3 bg-blue-500"
                      : "w-3 h-3 bg-blue-500/30 hover:bg-blue-500/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* What We Deliver Section */}
      <div id="how-it-work" className="container mx-auto md:mt-20 mt-10">
        <Header
          title="What We Deliver"
          description="From initial call to confirmed booking—we build the complete system for you."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-4 relative">
          {processSteps.map((step, index) => (
            <ProcessStep
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              delay={step.delay}
              isLast={index === processSteps.length - 1}
            />
          ))}
        </div>
      </div>
    </>
  );
}
