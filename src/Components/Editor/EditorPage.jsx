import React, { useEffect, useRef, useState } from 'react';

import './EditorPage.css';
import ClientIndividual from './ClientIndividual';
import toast from 'react-hot-toast';
import ACTIONS from '../../constants/actions.js';

import Editor from './Editor';
import { initClientSocket } from '../../socket/client.js';
import { useLocation, useNavigate } from 'react-router-dom';

const EditorPage = () => {
  const url = document.URL;

  // console.log(url);
  const roomId = url.substring(url.lastIndexOf('/') + 1);
  const socketRef = useRef(null); //change on useref component dont re render
  const location = useLocation();
  const navigate = useNavigate();
  const handleError = (err) => {
    console.log(`Socket err: `, err);
    toast.error('Socket connection failed, try again!', toastStyle);
    navigate('/');
  };
  const init = async () => {
    socketRef.current = await initClientSocket();
    //check for err
    socketRef.current.on('connect_error', (err) => handleError(err));
    socketRef.current.on('connect_failed', (err) => handleError(err));

    socketRef.current.emit(ACTIONS.JOIN, {
      roomId,
      username: location.state?.userName,
    });
  };
  useEffect(() => {
    init();
  }, []);
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
      <div className='editorwrap'>
        <div className='customization'>
          <h2 style={{ color: 'white' }}>customization to be added</h2>
        </div>
        <Editor />
      </div>
    </div>
  );
};

export default EditorPage;
