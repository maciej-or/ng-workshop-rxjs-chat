import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Message } from '../model/message-model';
import { tap, map, filter } from 'rxjs/operators';
import { emoji } from './emoji.operator';

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

    chatService.message$.pipe(
      tap(m => console.log(m)),
      filter(m => (!m.text.startsWith('spam')) || m.senderId === chatService.userId ),
      emoji()
    )
    .subscribe((m: Message) => {
      console.log(m);
      this.messages.push(m);
    });
  }

}
