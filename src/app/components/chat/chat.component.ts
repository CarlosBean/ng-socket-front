import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  @ViewChild('chatbox', { static: false }) chatbox: ElementRef;

  subscription: Subscription;
  message: string;
  messages: any[] = [];

  constructor(public chatService: ChatService) { }

  ngOnInit() {
    this.subscription = this.chatService.getMessage().subscribe((msg: any) => {
      console.log('message: ', msg);
      this.messages.push(msg);
      setTimeout(() => {
        this.chatbox.nativeElement.scrollTop = this.chatbox.nativeElement.scrollHeight;
      }, 0);
    });
  }

  sendMessage(e: Event) {
    if (!this.message || this.message.trim().length === 0) { return; }
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
