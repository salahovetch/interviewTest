import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UserService } from '../user.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private userServ: UserService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     this.userServ.show();

     return next.handle(request).pipe(
           finalize(() => this.userServ.hide()),
     );
  }
}
