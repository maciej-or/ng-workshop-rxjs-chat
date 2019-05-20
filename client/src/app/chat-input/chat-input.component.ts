import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ChatService, ConnectionState } from '../chat.service';
import { fromEvent } from 'rxjs';
import { throttle, throttleTime, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit, AfterViewInit {

  @ViewChild('chatInput') chatInput: ElementRef;

  message: string;

  isConnected = false;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.connectionState$.subscribe(state => {
      this.isConnected = (state === ConnectionState.ok);
    });
  }

  ngAfterViewInit() {
    const keyDown$ = fromEvent(this.chatInput.nativeElement, 'keydown');
    keyDown$.pipe(
      throttleTime(600)
    )
    .subscribe(() => {
      this.chatService.sendTypingNotification();
    });

    // const keyUp$ = fromEvent(this.chatInput.nativeElement, 'keyup');
    // keyUp$.pipe(
    //   debounceTime(1000)
    // ).subscribe(
    //   // send notify 'stop typing'
    // );
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
