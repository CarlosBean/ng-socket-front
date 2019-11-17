import { Component, OnInit } from "@angular/core";
import { WebsocketService } from "../../services/websocket.service";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.scss"]
})
export class MessagesComponent implements OnInit {
  constructor(public ws: WebsocketService) {}

  ngOnInit() {}

  logout() {
    this.ws.logoutWS();
  }
}
