import React from 'react'

function Button({
    children,
    type = "button",
    bgColor = "blue",
    textColor = "white",
    className = "",
    ...props
}) {
  return (
    <div className={` px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`}>{children}</div>
  )
}

export default Button