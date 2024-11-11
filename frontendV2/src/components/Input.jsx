/*
  Este componente acepta props desestructurados. 
  Uno de estos es icon, que se renombra como Icon. 
  La notación { icon: Icon } permite que Icon sea tratado como un componente React que puede ser usado en el JSX.
  
  ...props agrupa todos los demás atributos que se pasen al componente, para ser usados en el elemento <input>.

  El operador de propagación ...props en el código <input {...props} /> permite que cualquier propiedad adicional
  que se pase al componente Input se transfiera automáticamente al elemento <input> HTML.
*/
const Input = ({ icon: Icon, ...props }) => {
	return (
		<div className='relative mb-6'>
			<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
				<Icon className='size-5 text-blue-500' />
			</div>
			<input
				{...props}
				className='w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition duration-200'
			/>
		</div>
	);
};
export default Input;