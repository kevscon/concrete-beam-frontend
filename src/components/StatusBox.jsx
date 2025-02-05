import React from 'react';

const StatusBox = ({ label, value }) => {
  const isActive = value === true;
  const boxStyle = {
    width: '75px',
    height: '25px',
    backgroundColor: isActive ? 'green' : 'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '5px',
    marginTop: '5px',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <div style={containerStyle}>
      <div>{label}</div>
      <div style={boxStyle}>
        {isActive ? 'OK' : 'NG'}
      </div>
    </div>
  );
};

export default StatusBox;