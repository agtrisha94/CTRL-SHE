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

  /* ===== Variants (Cream + Orange SaaS Theme) ===== */

  const variants = {
    primary: `
      bg-gradient-to-r from-orange-500 to-orange-600 
      text-white 
      shadow-md hover:shadow-xl
      hover:brightness-105
      border border-orange-500
    `,

    secondary: `
      bg-white 
      text-orange-600 
      border border-orange-200 
      hover:bg-orange-50
      shadow-sm hover:shadow-md
    `,

    outline: `
      bg-transparent 
      text-gray-700 
      border border-gray-300 
      hover:border-orange-400 
      hover:text-orange-600 
      hover:bg-orange-50/40
      shadow-sm
    `
  };

  const sizes = {
    small: "px-5 py-2.5 text-sm",
    default: "px-8 py-3.5 text-base",
    large: "px-10 py-5 text-lg"
  };

  const baseStyles = `
    relative overflow-hidden 
    rounded-xl font-semibold 
    transition-all duration-300 ease-in-out
    focus:outline-none 
    focus:ring-2 focus:ring-orange-400 focus:ring-offset-2
    active:scale-[0.98]
    ${fullWidth ? "w-full" : ""}
    ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer"}
    ${sizes[size] || sizes.default}
  `;

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant] || variants.primary}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle Hover Glow Effect */}
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10" />

      <span className="relative z-10 flex items-center justify-center gap-2">
        {icon && (
          <span className="transition-transform duration-300">
            {icon}
          </span>
        )}

        {text}

        {variant === "primary" && (
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${
              isHovered ? "translate-x-1" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        )}
      </span>
    </button>
  );
};

export default CTAButton;
