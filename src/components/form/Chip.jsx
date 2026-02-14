const Chip = ({ label, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
        border
        ${
          selected
            ? "bg-orange-500 text-white border-orange-500 shadow-md"
            : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
        }
        hover:scale-105 active:scale-95
      `}
    >
      {label}
    </button>
  );
};

export default Chip;
