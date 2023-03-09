// @ts-nocheck
// import { io, Socket } from 'socket.io-client';
 
interface Option {
  onJoined?: (message: { roomId: string; userNum: number }) => void;
  onOtherJoined?: (message: { roomId: string; userId: number }) => void;
  onMessage: (data: { type: string; value: any }) => void;
  onFull?: (message: { roomId: string }) => void;
  onBye?: (message: { roomId: string; userId: number }) => void;
  onLeaved?: (message: { roomId: string }) => void;
  serverUrl?: string;
}
 
export default class SignalServer {
  socket: Socket;
  roomId: string;
 
  constructor(option: Option) {
    this.init(option);
  }
 
  init(option) {
    // this.socket = io(option.serverUrl || 'https://www.wangtz.cn:8088/');
    this.socket = new WebSocket("wss://www.wangtz.cn:8088")
    this.socket.connect();
 
    this.socket.on(
      'joined',
      option.onJoined ||
        (({ roomId, usersNum }) => {
          console.log('i joined a room', roomId);
          console.log('current user number:', usersNum);
        }),
    );
 
    this.socket.on(
      'otherjoined',
      option.onOtherJoined ||
        (({ roomId, userId }) => {
          console.log('other user joined, userId', userId);
        }),
    );
 
    this.socket.on('message', option.onMessage);
 
    this.socket.on(
      'full',
      option.onFull ||
        (({ roomId }) => {
          console.log(roomId, 'is full');
        }),
    );
 
    this.socket.on(
      'bye',
      option.onBye ||
        (({ roomId, userId }) => {
          console.log(userId, `leaved`, roomId);
        }),
    );
 
    this.socket.on('leaved', option.onLeaved || (({ roomId }) => {}));
 
    window.addEventListener('beforeunload', () => {
      this.leave();
    });
  }
 
  send(data) {
    if (!this.roomId) return;
    this.socket.emit('message', { roomId: this.roomId, data });
  }
 
  join(roomId) {
    this.roomId = roomId;
    this.socket.emit('join', { roomId });
  }
 
  leave() {
    this.roomId && this.socket.emit('leave', { roomId: this.roomId });
    this.roomId = '';
  }
}
 