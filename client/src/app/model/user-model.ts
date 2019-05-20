import { Room } from './room-model';

export interface User {
  id: string;
  name: string;
  presence: any;
  rooms: Room[];
  subscribeToRoom: (roomData: any) => Promise<Room>;
  sendMessage: (message: any) => Promise<number>;
  isTypingIn: (room: any) => Promise<void>;
}
