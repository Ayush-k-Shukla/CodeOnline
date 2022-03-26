import React, { useState } from 'react';
import './Home.css';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [roomId, setroomId] = useState('');
  const [userName, setuserName] = useState('');
  const navigate = useNavigate();

  const toastStyle = {
    borderRadius: '10px',
    background: 'rgb(17, 18, 41)',
    color: '#fff',
  };
  const joinRoom = (e) => {
    e.preventDefault();
    if (!roomId) {
      toast.error('Room id is required.', {
        style: toastStyle,
      });
      return;
    }
    if (!userName) {
      toast.error('User Name is required.', {
        style: toastStyle,
      });
      return;
    }
    navigate(`/editor/${roomId}`, { state: { userName } });
  };

  const handleInputEnter = (e) => {
    if (e.code === 'Enter') {
      joinRoom();
    }
  };

  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidv4();
    console.log(id);
    setroomId(id);

    toast.success('New room created successfully', {
      style: toastStyle,
    });
  };

  return (
    <div className='main-div'>
      <div className='form-div'>
        <div class='content'>
          <h4>CodeOnline</h4>
          <h4>CodeOnline</h4>
        </div>
        <form className='form'>
          <h4 style={{ color: 'aqua' }}>ENTER THE INVITATION ROOM ID</h4>
          <input
            type='text'
            placeholder='room id'
            value={roomId}
            onKeyUp={handleInputEnter}
            onChange={(e) => setroomId(e.target.value)}
          />
          <input
            type='text'
            placeholder='username'
            value={userName}
            onKeyUp={handleInputEnter}
            onChange={(e) => setuserName(e.target.value)}
          />
          <button type='submit' className='btn joinbtn' onClick={joinRoom}>
            Join
          </button>

          <span className='createroom' style={{ color: 'white' }}>
            Wan't to create an invite then &nbsp;
            <a href='/' className='createNew' onClick={createNewRoom}>
              create new room
            </a>
          </span>
        </form>
      </div>
      <footer>
        <h4 style={{ color: 'white' }}>
          Made with 💜 by &nbsp;
          <a
            href='https://github.com/Ayush-k-shukla'
            title="Ayush's github"
            target='_blank'
            rel='noreferrer'
          >
            😊
          </a>
        </h4>
      </footer>
    </div>
  );
};

export default Home;
