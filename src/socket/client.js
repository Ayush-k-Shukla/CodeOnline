import { io } from 'socket.io-client';

export const initClientSocket = async () => {
  const options = {
    'force new connction': true,
    reconnectionAttempts: 'Infinity',
    timeout: '10000',
    transports: ['websocket'],
  };

  const socket = io(process.env.REACT_APP_BACKEND_URL, options);
  return socket;
};
