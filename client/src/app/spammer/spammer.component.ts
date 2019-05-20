import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { ChatService, ConnectionState } from '../chat.service';

@Component({
  selector: 'app-spammer',
  templateUrl: './spammer.component.html',
  styleUrls: ['./spammer.component.scss']
})
export class SpammerComponent implements OnInit {

  isWorking = false;

  isConnected = false;

  intervalSubscription: Subscription;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.connectionState$.subscribe(state => {
      this.isConnected = (state === ConnectionState.ok);
    });
  }

  start() {
    this.isWorking = true;
    this.intervalSubscription = interval(1000).subscribe(x => {
      console.log(x);
      this.chatService.sendMessage(`spam ${x}`);
    });
  }

  stop() {
    this.intervalSubscription.unsubscribe();
    this.isWorking = false;
  }
}
