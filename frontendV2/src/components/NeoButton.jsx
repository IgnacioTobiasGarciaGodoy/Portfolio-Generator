import React from "react";

const sizes = {
  sm: "text-sm px-3 py-1",
  md: "text-base px-4 py-2",
  lg: "text-lg px-5 py-2.5",
};

const baseStyle = `
  inline-flex items-center justify-center whitespace-nowrap rounded-full 
  font-poppins text-gray-500
`;

const neoShadow = `
  shadow-[inset_6px_6px_12px_#bebebe,_inset_-6px_-6px_12px_#ffffff]
  transition-shadow duration-150 ease-out

  hover:shadow-[inset_3px_3px_6px_#bebebe,_inset_-3px_-3px_6px_#ffffff]
  active:shadow-[inset_4px_4px_8px_#bebebe,_inset_-4px_-4px_8px_#ffffff]

  dark:bg-zinc-900
  dark:shadow-[inset_6px_6px_12px_#0b0b0b,_inset_-6px_-6px_12px_#1f1f1f]
  dark:hover:shadow-[inset_3px_3px_6px_#050505,_inset_-3px_-3px_6px_#2a2a2a]
  dark:active:shadow-[inset_4px_4px_8px_#050505,_inset_-4px_-4px_8px_#2a2a2a]
  dark:hover:bg-[#1e1e1e]
`;

export default function NeoButton({ 
  size = "md", 
  className = "", 
  children, 
  selected = false, 
  ...props 
}) {
  return (
    <button
      className={`
        ${baseStyle} 
        ${sizes[size]} 
        ${neoShadow} 
        ${selected ? "text-gray-950 dark:text-white scale-110 font-semibold" : ""} 
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
