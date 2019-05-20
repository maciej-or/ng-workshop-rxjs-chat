import { User } from './user-model';

export interface Room {
  id: string;
  isPrivate: boolean;
  name: string;
  users: User[];
  unreadCount: number;
  lastMessageAt: string;
  customData: any;
}
