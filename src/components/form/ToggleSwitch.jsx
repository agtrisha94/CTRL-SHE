const ToggleSwitch = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center justify-between py-4 group">

      {/* Label */}
      <span className="text-gray-700 font-medium tracking-wide">
        {label}
      </span>

      {/* Switch */}
      <button
        type="button"
        onClick={onChange}
        className={`
          relative w-14 h-7 rounded-full transition-all duration-300
          ${checked
            ? "bg-gradient-to-r from-orange-400 to-orange-600 shadow-md"
            : "bg-gray-200"}
          focus:outline-none focus:ring-2 focus:ring-orange-400/40
        `}
      >
        {/* Knob */}
        <span
          className={`
            absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-md
            transition-all duration-300 ease-in-out
            ${checked ? "translate-x-7 scale-105" : ""}
          `}
        />

        {/* Subtle Glow Effect */}
        {checked && (
          <span className="absolute inset-0 rounded-full bg-orange-400/20 blur-sm" />
        )}
      </button>

    </div>
  );
};

export default ToggleSwitch;
