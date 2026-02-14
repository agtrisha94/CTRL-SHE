const ToggleSwitch = ({ label, checked, onChange }) => {
  return (
    <div className="flex justify-between items-center py-3">
      <span className="text-gray-700">{label}</span>

      <button
        onClick={onChange}
        className={`
          relative w-12 h-6 rounded-full transition
          ${checked ? "bg-orange-500" : "bg-gray-300"}
        `}
      >
        <span
          className={`
            absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow
            transition-transform duration-300
            ${checked ? "translate-x-6" : ""}
          `}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;
