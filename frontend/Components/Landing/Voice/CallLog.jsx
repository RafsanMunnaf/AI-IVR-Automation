import React from "react";
import { Phone, Mail, Calendar, Clock, Timer } from "lucide-react";
import { useGetAllCallLogsQuery } from "@/Apis/Voice/callLogApi";

export default function CallHistoryTable() {
  const { data: callHistory = [] } = useGetAllCallLogsQuery();

  const formatDuration = (call) => {
    if (call?.duration_ms != null) {
      const totalSeconds = Number(call.duration_ms) / 1000;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = Math.round(totalSeconds - minutes * 60);
      return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
    }
    if (call?.duration_seconds != null) {
      const totalSeconds = Number(call.duration_seconds);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = Math.round(totalSeconds - minutes * 60);
      return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
    }
    if (call?.duration_minutes != null) {
      const minutesFloat = Number(call.duration_minutes);
      const minutes = Math.floor(minutesFloat);
      const seconds = Math.round((minutesFloat - minutes) * 60);
      return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
    }
    return "-";
  };

  return (
    <div className="mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 text-white mb-4 sm:mb-6">
        <Phone className="w-5 h-5" />
        <h1 className="text-lg sm:text-xl font-medium">Call History</h1>
      </div>

      {/* Table */}
      <div className="rounded-lg overflow-hidden border border-blue-700/30">
        {callHistory.map((call, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 border-b border-blue-700/30 last:border-b-0 hover:bg-blue-800/30 transition-colors"
          >
            {/* Email */}
            <div className="flex items-center gap-2 text-white">
              <Mail className="w-4 h-4 flex-shrink-0 text-blue-300" />
              <span className="text-sm break-all">
                Email: {call.email || "-"}
              </span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-white">
              <Calendar className="w-4 h-4 flex-shrink-0 text-blue-300" />
              <span className="text-sm">
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                }).format(new Date(call.started_at))}
              </span>
            </div>

            {/* Time */}
            <div className="flex items-center gap-2 text-white">
              <Clock className="w-4 h-4 flex-shrink-0 text-blue-300" />
              <span className="text-sm">
                Time:{" "}
                {new Intl.DateTimeFormat("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                }).format(new Date(call.started_at))}
              </span>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-2 text-white">
              <Timer className="w-4 h-4 flex-shrink-0 text-blue-300" />
              <span className="text-sm">Duration: {formatDuration(call)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
