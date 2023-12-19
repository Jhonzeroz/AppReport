import { HttpInterceptorFn } from '@angular/common/http';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable()


export class CustomeInterceptor implements HttpInterceptor{

constructor() {}
intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  debugger;
  const token = localStorage.getItem('LoginToken');
  console.log('Token:', token); // Log the token for debugging

  const newCloneRequest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next.handle(newCloneRequest);
}
}