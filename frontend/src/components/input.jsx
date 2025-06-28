const Input = ({ icon: Icon, ...props }) => {
    return (
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Icon className='size-5 text-orange-500 ' />
        </div>
        <input
            {...props}
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg 
            focus:border-orange-500 focus:ring-2 focus:ring-orange-500 
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
            dark:focus:ring-orange-500 dark:focus:border-orange-500"
       />
      </div>
    );
  };
export default Input
