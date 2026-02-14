import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CTAButton = ({ 
  text, 
  to = "/get-started", 
  variant = "primary",
  onClick,
  icon = null,
  fullWidth = false,
  disabled = false,
  size = "default"
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e) => {
    if (disabled) return;
    if (onClick) {
      onClick(e);
    } else {
      navigate(to);
    }
  };

  const variants = {
    primary: "bg-gradient-to-r from-accent to-orange-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 border-0",
    secondary: "bg-white text-accent border-2 border-accent hover:bg-accent hover:text-white shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95",
    outline: "bg-transparent text-gray-700 border-2 border-gray-300 hover:border-accent hover:text-accent hover:bg-accent/5 shadow-sm hover:shadow transform hover:scale-105 active:scale-95"
  };

  const sizes = {
    small: "px-5 py-2.5 text-sm",
    default: "px-8 py-4 text-base",
    large: "px-10 py-5 text-lg"
  };

  const baseStyles = `relative overflow-hidden group rounded-xl font-semibold transition-all duration-300 
    focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
    ${fullWidth ? 'w-full' : ''} 
    ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}
    ${sizes[size] || sizes.default}`;

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant] || variants.primary}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="flex items-center justify-center gap-2 relative z-10">
        {icon && <span className="transition-colors duration-300">{icon}</span>}
        {text}
        {variant === "primary" && (
          <svg 
            className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        )}
      </span>
    </button>
  );
};

export default CTAButton;