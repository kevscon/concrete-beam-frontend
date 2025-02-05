import React from 'react';

const TextField = ({ label, value, onChange, id, readOnly, style }) => (
  <div className="col-md-3 mb-3">
    <label htmlFor={id} dangerouslySetInnerHTML={{ __html: label }} />
    <input
      type="text"
      id={id}
      className="form-control"
      value={value !== undefined && value !== null ? value : ''}
      onChange={(e) => {
        const newValue = e.target.value;
        onChange(id, newValue === '' ? 0 : newValue);
      }}
      readOnly={readOnly}
      style={style}
    />
  </div>
);

export default TextField;