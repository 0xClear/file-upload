import React from 'react'

const Input = ({name, type="text", placeholder, required=false, className}) => {
  return (
    <input name={name} type={type} placeholder={placeholder} required={required}  className={`mt-1 block w-full p-2 border border-none rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${className}`}/>
  )
}

export default Input