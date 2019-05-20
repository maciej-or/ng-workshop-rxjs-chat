import { Component, OnInit } from '@angular/core';
import { ChatService, ConnectionState } from '../chat.service';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss']
})
export class CurrentUserComponent implements OnInit {

  username: string;

  connectionState = ConnectionState.none;

  connectionDescription: string;

  connectionError = false;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.connectionState$.subscribe(state => {
      this.connectionState = state;
    });
  }

  addUser() {
    const { chatService, username } = this;

    if (!username) {
      return;
    }

    this.connectionDescription = 'connecting...';
    this.connectionError = false;

    chatService.connectToChatkit(username).subscribe(x => {
      this.connectionDescription = 'connected';
    }, ((error: any) => {
      this.connectionDescription = error.message || error.info.error_description;
      this.connectionError = true;
    }));
  }

}
