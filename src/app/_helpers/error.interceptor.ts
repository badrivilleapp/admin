import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    tokenID: any;
    currentUserType = null;
    constructor
        (
            private authService: AuthService,
            private router: Router
        ) {
        this.tokenID = this.authService.currentUser;
        let type: any = this.authService.currentUserType;
        this.currentUserType = JSON.parse(type);
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401 || err.status === 404) {
                // auto logout if 401 response returned from api
                this.router.navigate(['/login']);
            }
            const error = err.error.error || err.statusText;
            return throwError(error);
        }))
    }
}