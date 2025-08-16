import { Link } from "react-router-dom";

const sizeClasses = {
  sm: `
    text-sm sm:text-base
    px-4 py-2 sm:px-6 sm:py-2.5
  `,
  md: `
    text-lg sm:text-xl
    px-10 py-3 sm:px-16 sm:py-4
  `,
  lg: `
    text-xl sm:text-2xl
    px-12 py-4 sm:px-20 sm:py-5
  `,
};

const baseClasses = `
  font-poppins self-center font-semibold
  rounded-xl
  bg-white text-gray-700
  shadow-[inset_6px_6px_12px_#bebebe,_inset_-6px_-6px_12px_#ffffff]
  transition-shadow duration-150 ease-out

  hover:shadow-[inset_3px_3px_6px_#bebebe,_inset_-3px_-3px_6px_#ffffff]
  active:shadow-[inset_4px_4px_8px_#bebebe,_inset_-4px_-4px_8px_#ffffff]

  dark:bg-zinc-900 dark:text-zinc-100
  dark:shadow-[inset_6px_6px_12px_#0b0b0b,_inset_-6px_-6px_12px_#1f1f1f]
  dark:hover:shadow-[inset_3px_3px_6px_#050505,_inset_-3px_-3px_6px_#2a2a2a]
  dark:active:shadow-[inset_4px_4px_8px_#050505,_inset_-4px_-4px_8px_#2a2a2a]
  dark:hover:bg-[#1e1e1e]

  flex items-center justify-center gap-2
`;

const Button = ({ children, to, href, size = "md", ...props }) => {
  const classes = `${baseClasses} ${sizeClasses[size]}`;

  if (to) return <Link to={to} className={classes} {...props}>{children}</Link>;
  if (href) return (
    <button
      className={classes}
      onClick={() => window.open(href, "_blank", "noopener,noreferrer")}
      {...props}
    >
      {children}
    </button>
  );
  return <button className={classes} {...props}>{children}</button>;
};

export default Button;
