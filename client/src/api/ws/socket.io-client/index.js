import io from 'socket.io-client';

export const chatSocket = io('localhost:3001/api');