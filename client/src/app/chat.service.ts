import { Injectable } from '@angular/core';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import { from, combineLatest, Subject, Observable, BehaviorSubject } from 'rxjs';
import { switchMap, share, tap } from 'rxjs/operators';
import { User } from './model/user-model';
import { Message } from './model/message-model';

export enum ConnectionState {
  none = 0,
  pending,
  ok
}
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private AUTH_URL = 'http://localhost:5200/authenticate';
  private INSTANCE_LOCATOR = 'v1:us1:c6df2ce0-c761-4b60-ae1f-0c00838d5e50';
  private GENERAL_ROOM_ID = '21866520';

  private chatManager: ChatManager;
  private currentUser: User;
  private currentUserId: string;

  users$ = new Subject<User[]>();

  message$ = new Subject<Message>();

  connectionState$ = new BehaviorSubject<ConnectionState>(ConnectionState.none);

  constructor() {
    console.log('ChatService()');
  }

  connectToChatkit(userId: string): Observable<any> {

    this.chatManager = new ChatManager({
      instanceLocator: this.INSTANCE_LOCATOR,
      userId,
      tokenProvider: new TokenProvider({ url: this.AUTH_URL })
    });

    const roomData = {
      roomId: this.GENERAL_ROOM_ID,
      hooks: {
        onMessage: (message: Message) => {
          this.message$.next(message);
        },
        onUserStartedTyping: (user: User) => {
          console.log(`User ${user.name} started typing`);
        },
        onUserStoppedTyping: (user: User) => {
          console.log(`User ${user.name} stopped typing`);
        }
      },
      messageLimit: 20
    };

    this.connectionState$.next(ConnectionState.pending);
    this.currentUserId = userId;

    const user$ = from<User>(this.chatManager.connect());
    const room$ = user$.pipe(switchMap(user => user.subscribeToRoom(roomData)));

    const connect$ = combineLatest(user$, room$).pipe(
      tap(x => console.log('connected!')),
      share()
    );
    connect$.subscribe(([user, room]) => {
      // console.log(user, room);
      this.currentUser = user as User;
      this.connectionState$.next(ConnectionState.ok);
      this.users$.next(room.users);
    }, ((error: any) => {
      console.log(error);
      this.connectionState$.next(ConnectionState.none);
    }));

    return connect$;
  }

  get userId(): string {
    return this.currentUserId;
  }

  sendMessage(text: string): Observable<number> {
    const message = {
      text,
      roomId: this.GENERAL_ROOM_ID
    };
    return from<number>(this.currentUser.sendMessage(message));
  }

  sendTypingNotification() {
    this.currentUser.isTypingIn({ roomId: this.GENERAL_ROOM_ID })
    // .then(() => {
    //   console.log('Success!');
    // })
    .catch(err => {
      console.log(`Error sending typing indicator: ${err}`);
    });
  }
}
