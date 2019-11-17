import { Injectable } from "@angular/core";
import { WebsocketService } from "./websocket.service";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  constructor(public ws: WebsocketService) {}

  sendMessage(message: string) {
    const payload = {
      from: this.ws.getUser().name,
      body: message
    };

    this.ws.emit("message", payload);
  }

  getMessage() {
    return this.ws.listen("new-message");
  }

  getPrivateMessage() {
    return this.ws.listen("private-message");
  }

  getActiveUsers() {
    return this.ws.listen("active-users");
  }

  emitActiveUsers() {
    this.ws.emit("get-users");
  }
}
