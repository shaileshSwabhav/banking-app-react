import { useState } from 'react';
import './Input.css'

const Input = (props) => {
  const [focused, setFocused] = useState(false)
  const { label, errorMessage, onChange, id, ...inputProps } = props
  
  return (
    <div className="form-floating mb-3">
      <input className="form-control" id={id} onChange={onChange} {...inputProps}
        onBlur={() => setFocused(true)} focused={focused.toString()} />
      <label htmlFor={id}>{label}</label>
      {inputProps.required && <span className="error-msg">{errorMessage}</span>}
    </div >
  );
}

export default Input;