import React from 'react';

const InputField = ({ label, value, onChange, id, readOnly, style, step=1, min, max }) => (
  <div className="col-md-3 mb-3">
    <label htmlFor={id} dangerouslySetInnerHTML={{ __html: label }} />
    <input
      type="number"
      id={id}
      className="form-control"
      value={value !== undefined && value !== null ? value : ''}
      onChange={(e) => {
        const newValue = e.target.value;
        onChange(id, newValue === '' ? 0 : newValue);
      }}
      readOnly={readOnly}
      style={style}
      step={step}
      min={min}
      max={max}
    />
  </div>
);

export default InputField;