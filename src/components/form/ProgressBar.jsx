const ProgressBar = ({ step, total }) => {
  const percentage = (step / total) * 100;

  return (
    <div className="w-full mt-6">

      {/* Header Row */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium text-gray-600 tracking-wide">
          Step {step} of {total}
        </span>

        <span className="text-sm font-semibold text-orange-500">
          {Math.round(percentage)}%
        </span>
      </div>

      {/* Track */}
      <div className="relative w-full h-3 bg-gray-200/70 rounded-full overflow-hidden">

        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-orange-200 opacity-30 rounded-full" />

        {/* Progress Fill */}
        <div
          className="relative h-3 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-700 ease-out shadow-sm"
          style={{ width: `${percentage}%` }}
        />

      </div>

      {/* Step Indicators (Optional SaaS touch) */}
      <div className="flex justify-between mt-3">
        {Array.from({ length: total }).map((_, index) => {
          const current = index + 1;
          const isCompleted = current <= step;

          return (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300
                ${isCompleted
                  ? "bg-orange-500 scale-110"
                  : "bg-gray-300"}
              `}
            />
          );
        })}
      </div>

    </div>
  );
};

export default ProgressBar;
