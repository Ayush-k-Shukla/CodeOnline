import React from 'react';
import './Home.css';
const Home = () => {
  return (
    <div className='main-div'>
      <div className='form-div'>
        <div class='content'>
          <h4>CodeOnline</h4>
          <h4>CodeOnline</h4>
        </div>
        <form className='form'>
          {/* <h1 style={{ color: 'aqua', fontFamily: 'revert' }}>CodeOnline</h1> */}
          <h4 style={{ color: 'aqua' }}>ENTER THE INVITATION ROOM ID</h4>
          <input type='text' placeholder='room id' />
          <input type='text' placeholder='username' />
          <button type='submit' className='btn joinbtn'>
            Join
          </button>
          <span className='createroom' style={{ color: 'white' }}>
            Wan't to create an invite then &nbsp;
            <a href='' className='createNew'>
              create new room
            </a>
          </span>
        </form>
      </div>
      <footer>
        <h4 style={{ color: 'white' }}>
          Made with 💜 by &nbsp;
          <a href='https://github.com/Ayush-k-shukla' title="Ayush's github">
            😊
          </a>
        </h4>
      </footer>
    </div>
  );
};

export default Home;
