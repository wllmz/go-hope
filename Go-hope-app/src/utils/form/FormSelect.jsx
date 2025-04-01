const FormSelect = ({
  label,
  value,
  onChange,
  placeholder = "Sélectionnez une option",
  options = [],
  className = "",
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-gray-700 font-medium mb-1">{label}</label>
      )}
      <select
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border border-gray-300 bg-white rounded-xl shadow-sm focus:outline-none focus:border-[#F5943A] appearance-none ${className}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
