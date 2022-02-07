import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Badriville-admin';

  opened: boolean;

  constructor() {
    this.opened = false;
  }
  
}
