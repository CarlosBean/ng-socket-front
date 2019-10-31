import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  status = false;

  constructor(private socket: Socket) {
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('connected to server');
      this.status = true;
    });

    this.socket.on('disconnect', () => {
      console.log('disconnected to server');
      this.status = false;
    });
  }

  emit(event: string, payload?: any, callback?: () => void) {
    this.socket.emit(event, payload, callback);
  }

  listen(event: string) {
    return this.socket.fromEvent(event);
  }
}
