"use client";
import { features } from "@/Data/staticData";
import Header from "@/Libs/Header/Header";
import FeatureCard from "./FeatureCard";

export default function WhyChooseUs() {
  return (
    <>
      <div className="container mx-auto">
        {/* Header Section */}{" "}
        <Header
          title="Why Choose Us?"
          description="Discover the Benefits of Our AI Voice Assistant Service"
        />
        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </>
  );
}
