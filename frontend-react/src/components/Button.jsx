import React from 'react'

const Button = ({text, className}) => {
  return (
    <>
        <a href='#' className={`btn ${className}`}>{text}</a>
    </>
  )
}

export default Button