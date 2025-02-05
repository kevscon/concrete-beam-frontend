import React from 'react';

const SelectField = ({ label, value, onChange, id, options }) => (
  <div className="col-md-3 mb-3">
    <label htmlFor={id} dangerouslySetInnerHTML={{ __html: label }} />
    <select
      id={id}
      className="form-control"
      value={value}
      onChange={(e) => onChange(id, e.target.value)}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

export default SelectField;