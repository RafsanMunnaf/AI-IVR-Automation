"use client";
import React from "react";
import ServiceCard from "./ServiceCard";
import { OurServices } from "@/Data/staticData";
import Header from "@/Libs/Header/Header";

export default function OurServicesSection() {
  return (
    <>
      {/* Service Selection Section */}
      <div className="container mx-auto">
        <Header
          title="Our Services"
          description="Discover Our AI Voice Assistant Services for Various Industries"
        />
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {OurServices.map((service, index) => (
              <ServiceCard
                key={index}
                active={service.active}
                agent_id={service.agent_id}
                icon={service.icon}
                title={service.title}
                description={service.description}
                delay={service.delay}
                // onClick={handleCardClick}
                // isActive={activeService === service.title}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
