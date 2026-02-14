const ProgressBar = ({ step, total }) => {
  const percentage = (step / total) * 100;

  return (
    <div className="w-full mt-6">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>Step {step} of {total}</span>
      </div>

      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div
          className="bg-accent h-2 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
