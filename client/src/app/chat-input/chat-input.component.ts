import { Component, OnInit } from '@angular/core';
import { ChatService, ConnectionState } from '../chat.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {

  message: string;

  isConnected = false;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.connectionState$.subscribe(state => {
      this.isConnected = (state === ConnectionState.ok);
    });
  }

  sendMessage() {
    const { chatService, message } = this;

    if (!message) {
      return;
    }

    chatService.sendMessage(message).subscribe(messageId => {
      console.log('sendMessage', messageId);
      this.message = '';
    });
  }
}
