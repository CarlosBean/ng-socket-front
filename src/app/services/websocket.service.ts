import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { User } from "../models/user";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class WebsocketService {
  user: User;
  status = false;

  constructor(private socket: Socket, private router: Router) {
    this.loadLocal();
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on("connect", () => {
      console.log("connected to server");
      this.status = true;
      this.loadLocal();
    });

    this.socket.on("disconnect", () => {
      console.log("disconnected to server");
      this.status = false;
    });
  }

  emit(event: string, payload?: any, callback?: (res: any) => void) {
    this.socket.emit(event, payload, callback);
  }

  listen(event: string) {
    return this.socket.fromEvent(event);
  }

  loginWS(name: string) {
    return new Promise((resolve, reject) => {
      this.emit("config-user", { name }, (res: any) => {
        this.user = new User(name);
        this.saveLocal();
        resolve();
      });
    });
  }

  logoutWS() {
    this.user = null;
    localStorage.removeItem("user");
    this.emit("config-user", { name: undefined }, () => {});
    this.router.navigateByUrl("");
  }

  getUser() {
    return this.user;
  }

  saveLocal() {
    localStorage.setItem("user", JSON.stringify(this.user));
  }

  loadLocal() {
    if (localStorage.getItem("user")) {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.loginWS(this.user.name);
    }
  }
}
