const DividerWithText = ({ text }) => {
  return (
    <div className="flex items-center w-full my-4">
      
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="mx-4 text-gray-500 font-poppins text-sm">{text}</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
};

export default DividerWithText;