// src/utils/form/FormInput.jsx
const FormInput = ({ type = "text", placeholder, value, onChange, name }) => {
  return (
    <div className="mb-6">
      <input
        type={type}
        placeholder={placeholder}
        value={value} // Assurez-vous que la valeur est correctement liée
        onChange={onChange} // Le gestionnaire d'événements doit être transmis
        name={name} // Le nom du champ doit correspondre à la clé dans userData
        className="w-full px-3 py-2 border border-[rgba(134,191,206,0.16)] bg-[rgba(134,191,206,0.16)] rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[rgba(134,191,206,0.16)]"
      />
    </div>
  );
};

export default FormInput;
