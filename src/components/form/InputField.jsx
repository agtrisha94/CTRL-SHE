const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder
}) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      
      {/* Label */}
      <label className="text-sm font-medium text-gray-700 tracking-wide">
        {label}
      </label>

      {/* Input */}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          bg-white
          border border-orange-100
          rounded-xl
          px-5 py-3.5
          text-gray-800
          placeholder:text-gray-400
          shadow-sm
          transition-all duration-300
          focus:outline-none
          focus:ring-2
          focus:ring-orange-400/40
          focus:border-orange-400
          focus:shadow-md
        "
      />

    </div>
  );
};

export default InputField;
