import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/_services/auth.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  opened: boolean;
  subscription: Subscription | undefined;
  currentUser: any;
  currentUserType = null;
  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {
    this.opened = false;
    this.subscription = this.authService.currentUser.subscribe(
      resData => {
        this.currentUser = resData;
      }, error => {
        Swal.fire('Oops...', 'Something went wrong!', error)
      });
  }

  ngOnInit(): void {
    let type: any = this.authService.currentUserType;
    this.currentUserType = JSON.parse(type);
  }

  onAuthLogout() {

    this.spinner.show();
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    this.authService.setcurrentUserValue();

    if (this.currentUserType == 'super_admin') {
      this.spinner.hide();
      this.router.navigate(['super-admin-login']);
    } else {
      this.spinner.hide();
      this.router.navigate(['login']);
    }
  }

}
