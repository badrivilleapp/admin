import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })

export class AuthService {

    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient) {
        let value: any = localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(value));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    public get currentUserType(): any {
        let type: any = localStorage.getItem('type');
        return type;
    }

    public setcurrentUserValue(): any {
        return this.currentUserSubject.next(null);
    }
    adminLogin(email: string, password: string) {
        // return this.http.post<any>(`${environment.apiUrl}/api/admin-login`, { email, password })
        //     .pipe(map(res => {
        //         let user = res[0].result;
        //         let type = res[0].type;
        //         let token = res[0].token;
        //         // store user details and jwt token in local storage to keep user logged in between page refreshes
        //         localStorage.setItem('type', JSON.stringify(type));
        //         localStorage.setItem('currentUser', JSON.stringify(user));
        //         localStorage.setItem('token', JSON.stringify(token));
        //         this.currentUserSubject.next(user);
        //         return user;
        //     }));
    }
}