import React from "react";


const Input = (props) => {

  return (
    <div>
      <input
        type={props.type}
        name={props.placeholder}
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder}
      />
    </div>
  )
}

export default Input;