const InputField = ({ label, type = "text", value, onChange, placeholder }) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      <label className="text-sm text-gray-600">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent transition"
      />
    </div>
  );
};

export default InputField;
