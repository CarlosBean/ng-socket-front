import { Component, OnInit } from "@angular/core";
import { WebsocketService } from "./services/websocket.service";
import { ChatService } from "./services/chat.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(public ws: WebsocketService, public chatService: ChatService) {}

  ngOnInit() {
    this.chatService.getPrivateMessage().subscribe(msg => {
      console.log("private message", msg);
    });
  }
}
