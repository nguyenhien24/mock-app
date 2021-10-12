import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    const token = this.authService.getAccessToken();
    const refreshToken = this.authService.getRefreshToken();
    if (token) {
      request = request.clone({
        // tao 1 request ms giong request cu
        setHeaders: {
          Authorization: 'Bearer ' + token,
        },
      });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'content-type': 'application/json',
        },
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error.error.error);
        if (error.status === 401) {
          // console.log('gg');
          this.authService.refreshToken(refreshToken).subscribe((res: any) => {
            localStorage.setItem(
              'access_token',
              JSON.stringify(res.access.token)
            );
            localStorage.setItem(
              'refresh_token',
              JSON.stringify(res.refresh.token)
            );
            location.reload();
          });
        }
        return throwError(error);
      })
    );
  }
}
