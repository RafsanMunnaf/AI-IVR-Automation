import { Clock } from "lucide-react";

const TimeSelector = ({ availableTimes, selectedTime, onTimeSelect }) => {
  return (
    <div className=" backdrop-blur-xl border-2 border-blue-400/40 rounded-3xl p-6 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="w-6 h-6 text-white" />
        <h2 className="text-xl font-bold text-white">Available Times</h2>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {availableTimes.map((time, idx) => (
          <button
            key={idx}
            onClick={() => onTimeSelect(time)}
            className={`
              py-3 px-4 rounded-xl font-medium  text-sm cursor-pointer border-2 border-transparent hover:bg-radial hover:from-primary/60 hover:to-secondary/50 transition-all duration-500
              ${
                selectedTime === time
                  ? " text-white bg-radial to-primary/60  from-secondary rounded-full border-2 border-white overflow-hidden"
                  : "bg-secondary/30 text-blue-100"
              }
            `}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSelector;
