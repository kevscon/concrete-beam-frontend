import React from 'react';

const ResultField = ({ label, value, onChange, id, readOnly, style }) => (
  <div className="col-md-3 mb-3">
    <label htmlFor={id} dangerouslySetInnerHTML={{ __html: label }} />
    <input
      type="text"
      id={id}
      className="form-control"
      value={value !== undefined && value !== null ? String(value) : ''}
      onChange={(e) => {
        const newValue = e.target.value.toLowerCase();
        onChange(id, newValue === 'true' ? true : newValue === 'false' ? false : '');
      }}
      readOnly={readOnly}
      style={style}
    />
  </div>
);

export default ResultField;