import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public ws: WebsocketService) { }

  sendMessage(message: string) {
    const payload = {
      from: 'Carlos',
      body: message
    };

    this.ws.emit('message', payload);
  }

  getMessage() {
    return this.ws.listen('new-message');
  }
}
