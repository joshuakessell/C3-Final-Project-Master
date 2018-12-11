import React from "react";

  const Button = (props) => (
    <div className="inline">
        <button
          type="button"
          name={props.name}
          onClick={props.useClick}>
          {props.value}
        </button>
    </div>
  )

export default Button;