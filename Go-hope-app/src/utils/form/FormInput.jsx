const FormInput = ({ type = "text", placeholder, value, onChange, name }) => {
  return (
    <div className="mb-6">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className="w-full px-3 py-2 border border-gray-300 bg-white rounded-xl shadow-sm focus:outline-none focus:border-[#F5943A]"
      />
    </div>
  );
};

export default FormInput;
