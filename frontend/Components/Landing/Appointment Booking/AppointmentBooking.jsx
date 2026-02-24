"use client";
import { CheckCircle, Send, SendHorizonal } from "lucide-react";
import CalendarComponent from "./CalendarComponent";
import TimeSelector from "./TimeSelector";
import { useEffect, useState } from "react";
import Header from "@/Libs/Header/Header";
import { usePostAppointmentMutation } from "@/Apis/Appointment/appointmentApi";
import Toaster from "@/Libs/Toast/Toaster";

export default function AppointmentBooking() {
  //////////// Api call here ////////////
  const [postAppointment, { isLoading }] = usePostAppointmentMutation();
  /////////////

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("9:00 AM");
  const [summary, setSummary] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const availableTimes = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
  ];

  const handleSubmit = async () => {
    if (!selectedTime) {
      return Toaster({
        type: "error",
        message: "Please select a time slot.",
        backgroundColor: "#ff000075",
      });
    }
    if (!name) {
      return Toaster({
        type: "error",
        message: "Please provide your name.",
        backgroundColor: "#ff000075",
      });
    }
    if (!email) {
      return Toaster({
        type: "error",
        message: "Please provide your email.",
        backgroundColor: "#ff000075",
      });
    }
    if (!summary) {
      return Toaster({
        type: "error",
        message: "Please provide appointment summary.",
        backgroundColor: "#ff000075",
      });
    }

    const data = {
      appointment_time: new Date(
        `${selectedDate.toDateString()} ${selectedTime}`
      ).toISOString(),
      name,
      email,
      description: summary,
    };
    try {
      const response = await postAppointment(data).unwrap();
      console.log("Appointment booked successfully:", response);
      Toaster({ type: "success", message: "Appointment booked successfully!" });

      setSelectedDate(new Date());
      setSelectedTime("");
      setSummary("");
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Failed to book appointment:", error);
      Toaster({
        type: "error",
        backgroundColor: "#ff000075",
        message: "Failed to book appointment. Please try again.",
      });
    }
  };

  useEffect(() => {
    if (isLoading) {
      Toaster({
        type: "info",
        message: "Processing your appointment...",
        backgroundColor: "#0A48CD",
        timer: isLoading ? 5000 : 1000,
      });
    }
  }, [isLoading]);

  return (
    <div className="w-full container mx-auto">
      {/* Header */}
      <Header
        title="Instant Appointment Booking"
        description="Pick a date and time—our AI handles the rest."
      />
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Calendar and Times */}
        <div className="space-y-6">
          {/* Calendar Component */}
          <CalendarComponent
            onDateSelect={setSelectedDate}
            selectedDate={selectedDate}
          />

          {/* Time Selector Component */}
          <TimeSelector
            availableTimes={availableTimes}
            selectedTime={selectedTime}
            onTimeSelect={setSelectedTime}
          />
        </div>

        {/* Right Column - Appointment Summary */}
        <div className="backdrop-blur-xl border-2 border-blue-400/40 rounded-3xl p-6 shadow-2xl flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-6 h-6 text-white" />
            <h2 className="text-xl font-bold text-white">
              Appointment Summary
            </h2>
          </div>

          {/* Name Input */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="mb-4 border-2 border-blue-600/40 rounded-2xl p-4 text-white placeholder-blue-300/50 focus:outline-none focus:border-white transition-all duration-200"
          />

          {/* Email Input */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            className="mb-4 border-2 border-blue-600/40 rounded-2xl p-4 text-white placeholder-blue-300/50 focus:outline-none focus:border-white transition-all duration-200"
          />

          {/* Appointment Summary Textarea */}
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Write here your appointment summary"
            className="flex-1 border-2 border-blue-600/40 rounded-2xl p-4 text-white placeholder-blue-300/50 resize-none focus:outline-none focus:border-white transition-all duration-200 min-h-[300px]"
          />

          <button
            onClick={handleSubmit}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group relative inline-flex items-center justify-center gap-3 px-12 py-5 md:px-16 md:py-6 text-xl md:text-2xl font-bold text-white bg-radial to-primary/60 from-secondary rounded-full border-2 border-blue-400/50 transition-all duration-500 overflow-hidden cursor-pointer mt-6 ${
              isHovered
                ? "transform scale-105 border-blue-300 shadow-2xl"
                : "shadow-xl"
            }`}
          >
            {/* Animated background on hover */}
            <div
              className={`absolute inset-0 bg-radial from-primary/60 to-secondary rounded-full transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Button content */}
            <span className="relative z-10">Submit</span>
            <SendHorizonal
              className={`mt-1 relative z-10 w-6 h-6 md:w-7 md:h-7 transition-transform duration-500 ${
                isHovered ? "transform translate-x-2" : ""
              }`}
            />

            {/* Glow effect */}
            {isHovered && (
              <div className="absolute inset-0 rounded-full animate-pulse-glow pointer-events-none" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
