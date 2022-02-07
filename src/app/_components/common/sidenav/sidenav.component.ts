import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  showFiller = false;
  menuList: any = [];
  currentUserType: any = null;
  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    let type: any = this.authService.currentUserType;
    this.currentUserType = JSON.parse(type);
  }
}
