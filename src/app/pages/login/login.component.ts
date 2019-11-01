import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = '';

  constructor(public ws: WebsocketService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.ws.loginWS(this.username).then(() => {
      this.router.navigateByUrl('/messages');
    });
  }
}
