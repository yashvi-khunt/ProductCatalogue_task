import React, { useId, useState, useEffect } from "react";

const Input = React.forwardRef(function Input(
  { label, id = useId(), type = "text", className = "", error, ...props },
  ref
) {
  // const id = useId();
  const [errorMsg, setErrorMsg] = useState(error);

  useEffect(() => {
    setErrorMsg(error);
  }, [error]);

  return (
    <div>
      <div className="flex items-center justify-between">
        {label && (
          <label
            className="block text-sm font-medium leading-6 text-gray-900"
            htmlFor={id}
          >
            {label}
          </label>
        )}
      </div>
      <div className="mt-2">
        <input
          type={type}
          className={`block w-full rounded-md border-0 py-1.5 ps-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 focus:outline-none ${className} ${
            !error
              ? `ring-gray-300 focus:ring-indigo-600`
              : `ring-red-600 focus:ring-red-600`
          }`}
          ref={ref}
          {...props}
          id={id}
        />
        {errorMsg && (
          <p className="text-red-600 text-sm text-left">{errorMsg}</p>
        )}
      </div>
    </div>
  );
});

export default Input;
