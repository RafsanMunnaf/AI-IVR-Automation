import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";
import { SLIDE_DATA } from "@/Data/staticData";
import Image from "next/image";

export const Carousel = () => {
  return (
    <div className="relative w-full py-12 overflow-hidden">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 5,
          stretch: 0,
          depth: 150,
          modifier: 2,
          slideShadows: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="w-full"
        breakpoints={{
          320: { slidesPerView: 1.1 },
          1024: { slidesPerView: 2 },
        }}
      >
        {SLIDE_DATA.map((slide) => (
          <SwiperSlide key={slide.id} className="max-w-md px-4">
            {({ isActive }) => (
              <div
                className={`relative group transition-all duration-700 ease-out transform ${
                  isActive
                    ? "scale-100 opacity-100"
                    : "scale-90 opacity-40 blur-[1px]"
                }`}
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] shadow-2xl border border-white/10 glass-panel">
                  <Image
                    layout="fill"
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />

                  {/* Status Badge */}
                  <div className="absolute top-6 right-6">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        slide.status === "Production"
                          ? "bg-green-500/10 border-green-500/30 text-green-400"
                          : slide.status === "Beta"
                          ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                          : "bg-indigo-500/10 border-indigo-500/30 text-indigo-400"
                      }`}
                    >
                      {slide.status}
                    </span>
                  </div>

                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          {slide.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded-md bg-white/10 text-white/70 text-[10px] font-medium uppercase tracking-tighter border border-white/5"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-3xl font-black text-white leading-none">
                          {slide.title}
                        </h3>
                        <p className="text-sm text-white/60 line-clamp-2 max-w-lg">
                          {slide.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 pt-2">
                        <a
                          href={slide.links.live}
                          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all hover:-translate-y-1"
                        >
                          <svg
                            width="14"
                            height="14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                          </svg>
                          Live Project
                        </a>
                        <a
                          href={slide.links.source}
                          className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold rounded-xl transition-all hover:-translate-y-1"
                        >
                          <svg
                            width="14"
                            height="14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                          </svg>
                          View Code
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex items-center justify-center mt-8 space-x-6">
        <button className="swiper-button-prev-custom p-4 rounded-2xl glass-panel hover:bg-white/10 transition-all text-white/50 hover:text-white">
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="custom-pagination !relative !w-auto flex gap-2"></div>
        <button className="swiper-button-next-custom p-4 rounded-2xl glass-panel hover:bg-white/10 transition-all text-white/50 hover:text-white">
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};
