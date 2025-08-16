// const DividerWithText = ({ text }) => {
//   return (
//     <div className="flex items-center w-full my-4">
      
//       <div className="flex-grow border-t border-gray-300"></div>
//       <span className="mx-4 text-gray-500 font-poppins text-sm">{text}</span>
//       <div className="flex-grow border-t border-gray-300"></div>
//     </div>
//   );
// };

// export default DividerWithText;

const SIZE = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
};

const DividerWithText = ({
  text,
  size = "sm",
  bold = false,
  className = "",
}) => {
  const sizeClass = SIZE[size] ?? SIZE.md;
  const weight = bold ? "font-bold" : "font-normal";

  return (
    <div className={`flex items-center w-full my-4 ${className}`}>
      <div className="flex-grow border-t border-gray-300 dark:border-gray-700" />
      <span
        className={`mx-4 font-poppins ${sizeClass} ${weight} text-gray-700 dark:text-gray-200`}
      >
        {text}
      </span>
      <div className="flex-grow border-t border-gray-300 dark:border-gray-700" />
    </div>
  );
};

export default DividerWithText;