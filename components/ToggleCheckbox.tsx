interface ToggleCheckboxProps {
  id: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ToggleCheckbox = ({
  id,
  label,
  onChange,
}: ToggleCheckboxProps) => (
  <div className="mb-2">
    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
      <input
        type="checkbox"
        name={`sbc-toggle-${id}`}
        id={`sbc-toggle-${id}`}
        onChange={onChange}
        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-gray-700 border-2 border-current appearance-none cursor-pointer focus:outline-none"
      />
      <label
        htmlFor={`sbc-toggle-${id}`}
        className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-700 cursor-pointer"
      />
    </div>
    <label htmlFor={`sbc-toggle-${id}`} className="text-xs text-gray-500">
      {label}
    </label>
  </div>
);
