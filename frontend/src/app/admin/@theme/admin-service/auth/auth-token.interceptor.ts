import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getTokenSelector } from '../store/auth.selector';
import { exhaustMap, switchMap, take } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.state';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

    constructor(private store: Store<AppState>) { }
    /*
    take(2):
    we use take 2 time because :
     - first time to prevent the application to keep reloading after success login
    - second time to reuse the intercept with routerSelector in for example (gitSingleUser, gitSingleAdmin...)
        because the first time the token will be null but the second time the token will be present
    */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select(getTokenSelector).pipe(
            take(2),
            switchMap(token => {
                if (!token) {
                    return next.handle(req);
                }
                let modifiedReq = req.clone({
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ` + token
                        })
                });

                return next.handle(modifiedReq);
            })
        );

    }
}
