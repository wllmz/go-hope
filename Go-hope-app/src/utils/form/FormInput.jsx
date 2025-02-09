// src/utils/form/FormInput.jsx
const FormInput = ({ type = "text", placeholder, value, onChange, name }) => {
  return (
    <div className="mb-6">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className="w-full px-3 py-2 border border-[#F5943A] bg-[white] rounded-xl shadow-sm focus:outline-none focus:ring focus:ring-[rgba(134,191,206,0.16)]"
      />
    </div>
  );
};

export default FormInput;
