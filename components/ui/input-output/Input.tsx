import { useEffect } from "react";

interface InputProps {
  placeholder: string;
  inputValue: string;
  setInputValue: (value: string) => void;
}

const Input = ({ placeholder, inputValue, setInputValue }: InputProps) => {
  useEffect(() => {
    // Ensures smooth transition effect
    setTimeout(() => {}, 100);
  }, [placeholder]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 150) {
      setInputValue(e.target.value);
    }
  };

  return (
    <div className="relative w-full sm:w-3/4">
      <input
        id="response"
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        maxLength={150}
        
        className={`font-mono w-full px-4 py-2 text-sm sm:text-md bg-gray-800 text-white border 
                    ${inputValue.length >= 150 ? "border-red-500" : "border-gray-600"} 
                    rounded-lg focus:outline-none focus:ring-2 
                    ${inputValue.length >= 150 ? "focus:ring-red-500" : "focus:ring-blue-500"} 
                    transition-opacity duration-500 ease-in-out`}
      />
      <p
        className={`text-right text-xs mt-1 ${
          inputValue.length >= 150 ? "text-red-500" : "text-gray-400"
        }`}
      >
        {inputValue.length}/150
      </p>
    </div>
  );
};

export default Input;