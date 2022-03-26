import React, { useState } from 'react';

import './EditorPage.css';
import ClientIndividual from './ClientIndividual';
import toast from 'react-hot-toast';

const EditorPage = () => {
  const toastStyle = {
    borderRadius: '10px',
    background: 'rgb(17, 18, 41)',
    color: '#fff',
  };
  const [clients, setClients] = useState([
    { socketId: 1, username: 'Ayush K' },
    { socketId: 2, username: 'Ayush' },
    { socketId: 3, username: 'Raj' },
    { socketId: 4, username: 'guga' },
    { socketId: 5, username: 'mana' },
  ]);

  const copyId = () => {
    const url = document.URL;
    // console.log(url);
    const roomId = url.substring(url.lastIndexOf('/') + 1);
    navigator.clipboard.writeText(roomId);
    toast.success('Room id copied !', {
      style: toastStyle,
    });
  };
  return (
    <div className='maindiv'>
      <div className='profilewrap'>
        <div className='up'>
          <div class='content1'>
            <h4>CodeOnline</h4>
            <h4>CodeOnline</h4>
          </div>
          <h2 style={{ color: 'white' }}>Connected</h2>
          <div className='clientList'>
            {clients.map((client) => (
              <ClientIndividual
                key={client.socketId}
                username={client.username}
              />
            ))}
          </div>
        </div>
        <div className='down'>
          <button className='btn copy' onClick={copyId}>
            Copy Room id
          </button>
          <button className='btn leave'>Leave</button>
        </div>
      </div>
      <div className='editorwrap'></div>
    </div>
  );
};

export default EditorPage;
