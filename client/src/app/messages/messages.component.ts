import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Message } from '../model/message-model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  messages: Message[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    const { chatService } = this;

    chatService.message$.subscribe((m: Message) => {
      console.log(m);
      this.messages.push(m);
    });
  }

}
