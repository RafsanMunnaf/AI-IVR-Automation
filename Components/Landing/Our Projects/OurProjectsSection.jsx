"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Carousel } from "./Carousel";
import { SLIDE_DATA } from "@/Data/staticData";
import Header from "@/Libs/Header/Header";

const OurProjectsSection = () => {
  return (
    <div className="">
      <Header
        title="Our Projects"
        description="Discover Our AI Voice Assistant Services for Various Industries"
      />
      {/* Project Display */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1">
          <Carousel />
        </div>
      </main>
    </div>
  );
};

export default OurProjectsSection;
