"use client";

import {
  vapi_assistant_id_for_bangla,
  vapi_assistant_id_for_english,
  vapi_public_key,
} from "@/env";
import Vapi from "@vapi-ai/web";
import { ChevronUp, PhoneCall } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import CallHistoryTable from "./CallLog";
import AllTranscript from "./AllTranscript";
import { useVapi } from "@/Providers/VapiAgentProvider";
import Header from "@/Libs/Header/Header";

export default function AgentCallingPage() {
  const callLogRef = useRef(null);
  const {
    vapi,
    isConnected,
    isSpeaking,
    setCallStatus,
    setLanguage,
    transcript,
    isCallLogOpen,
    language,
    callStatus,
    setIsCallLogOpen,
  } = useVapi();
  const startCall = () => {
    setCallStatus("connecting");
    if (language === "bn-BD" && vapi) {
      vapi.start(vapi_assistant_id_for_bangla);
    } else {
      if (vapi) {
        vapi.start(vapi_assistant_id_for_english);
      }
    }
  };
  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (callLogRef.current && !callLogRef.current.contains(event.target)) {
        setIsCallLogOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isCallLogOpen]);
  return (
    <div className="">
      <div className="container mx-auto w-full text-center space-y-12">
        {/* Heading */}
        <Header
          title="Experience Our Agentic AI"
          description="See how we build natural conversations in Bengali & English languages"
        />
        {/* Top Section - Live Voice Demonstrations Badge and Language Selector */}
        <div className="flex flex-wrap items-center justify-center gap-4 relative">
          {/* Live Voice Demonstrations Badge */}
          {/* <div className="px-6 py-3 bg-transparent border-2 border-blue-400/60 rounded-full flex items-center gap-2">
            <svg
              className="w-5 h-5 text-blue-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" strokeWidth={2} />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
            <span className="text-white font-medium">
              Live Voice Demonstrations
            </span>
          </div> */}

          {/* Language Pill Buttons */}
          <div className="flex items-center gap-2 bg-transparent border-2 border-blue-400/60 rounded-full p-1">
            <button
              onClick={() => setLanguage("en-US")}
              className={`px-6 py-2 rounded-full transition-all duration-300 font-medium ${
                language === "en-US"
                  ? "bg-blue-500 text-white"
                  : "text-blue-200 hover:bg-blue-500/20"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage("bn-BD")}
              className={`px-6 py-2 rounded-full transition-all duration-300 font-medium ${
                language === "bn-BD"
                  ? "bg-blue-500 text-white"
                  : "text-blue-200 hover:bg-blue-500/20"
              }`}
            >
              Bangla
            </button>
          </div>

          <div className="">
            {/* Call log button */}
            <button
              onClick={() => setIsCallLogOpen(!isCallLogOpen)}
              className="px-6 py-3 bg-transparent border-2 border-blue-400/60 rounded-full flex items-center gap-2 text-white hover:bg-radial hover:to-secondary hover:from-primary transition-colors duration-300 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 mr-2" /> View Call Logs{" "}
              <ChevronUp
                className={`w-5 h-5 mt-0.5 ${
                  isCallLogOpen ? "" : "rotate-180"
                }`}
              />
            </button>
          </div>
          <div
            ref={callLogRef}
            className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 max-w-6xl w-full z-20 rounded-lg p-4 md:p-8 bg-secondary/10 backdrop-blur-sm overflow-x-hidden overflow-y-auto transition-all duration-700 ease-in-out ${
              isCallLogOpen ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0"
            }`}
          >
            <CallHistoryTable />
          </div>
        </div>

        {/* Microphone Icon */}

        <div className="flex justify-center md:my-32 my-16 relative">
          {/* <div className="absolute top-0 w-full z-10">
            <AllTranscript messages={transcript} />
          </div> */}
          <div className="relative group" aria-label="Toggle voice recording">
            {isConnected && (
              <>
                <div className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping"></div>
                <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-pulse scale-125"></div>
                <div className="absolute inset-0 rounded-full bg-blue-600/10 animate-ping animation-delay-500 scale-150"></div>
              </>
            )}

            {/* Outer glowing circle */}
            <div
              className={`absolute inset-0 rounded-full bg-blue-500/20 blur-2xl scale-150 transition-all duration-300 ${
                isConnected ? "animate-pulse" : ""
              }`}
            ></div>

            {/* Main circle */}
            <div
              onClick={() => (isConnected ? endCall() : startCall())}
              className={`relative w-52 h-52 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center transition-all duration-300 cursor-pointer ${
                isConnected
                  ? "scale-110 shadow-2xl shadow-blue-500/50 animate-pulse-slow"
                  : "shadow-xl"
              } group-hover:scale-105`}
            >
              <div
                className={`absolute inset-4 rounded-full border-2 border-blue-400/30 transition-all duration-300 ${
                  isConnected ? "border-blue-300/60 animate-spin-slow" : ""
                }`}
              ></div>

              {/* Microphone Icon */}
              <svg
                className={`w-24 h-24 text-white transition-all duration-300 ${
                  isConnected ? "scale-110 animate-bounce-subtle" : ""
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Status Text */}
        {language === "en-US" && (
          <p className="text-white/90 text-lg">
            {callStatus === "connecting"
              ? "Connecting to agent..."
              : "Talk to our Agentic AI to know about our services."}
          </p>
        )}
        {language === "bn-BD" && (
          <p className="text-white/90 text-lg">
            {callStatus === "connecting"
              ? "এজেন্টের সাথে সংযোগ স্থাপন করা হচ্ছে..."
              : "আমাদের সার্ভিস সম্পর্কে জানতে আমাদের Agentic AI সাথে কথা বলুন।"}
          </p>
        )}

        {/* Start Talking Button */}
        <div className="pt-4">
          <button
            onClick={() => (isConnected ? endCall() : startCall())}
            disabled={isSpeaking}
            className={`px-10 py-4 bg-transparent border-2 border-blue-400 text-white rounded-full hover:bg-blue-500/20 transition-all duration-300 text-lg font-medium ${
              isSpeaking ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {callStatus === "connecting"
              ? "Connecting..."
              : isConnected
              ? "Stop Talking"
              : "Start Talking"}
          </button>
        </div>
      </div>
    </div>
  );
}
