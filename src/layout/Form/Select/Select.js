import { useEffect, useState } from 'react';
// import './Select.css'

const Select = (props) => {
  const [focused, setFocused] = useState(false)
  const { label, optionValue, list, listParam, errorMessage, onChange, id, ...inputProps } = props

  const renderOptions = list.map((option, index) => {
    return (
      <option value={option[optionValue]} key={index}>{option[listParam]}</option>
    )
  })

  return (
    <div className="form-floating mb-3">
      <select className="form-control" id={id} onChange={onChange} {...inputProps}
        onBlur={() => setFocused(true)} focused={focused.toString()} value={inputProps.value}>
        {/* <option value={inputProps.value}>Select{label}</option> */}
        {renderOptions}
      </select>
      <label htmlFor={id}>{label}</label>
      {inputProps.required && <span className="error-msg">{errorMessage}</span>}
    </div >
  );
}

export default Select;