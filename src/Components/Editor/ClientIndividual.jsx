import React from 'react';
import Avatar from 'react-avatar';
const ClientIndividual = ({ username }) => {
  return (
    <div className='client'>
      <Avatar name={username} round='15px' size={50} />
      <span style={{ color: 'white' }}>{username}</span>
    </div>
  );
};

export default ClientIndividual;
