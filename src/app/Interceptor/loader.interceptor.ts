import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { LoaderService } from '../service/loader.service';

// export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
//   this
//   return next(req);
// };

@Injectable()
export class loaderInterceptor implements HttpInterceptor {

  constructor(public loaderService:LoaderService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.showLoader()
    // Catch any error that occurs during the API request
      catchError((error) => {
        // Handle the error if necessary (logging, alerting, etc.)
        console.error('API Error occurred:', error);
        // Rethrow the error after handling it
        return throwError(() => error);
      })
    return next.handle(req).pipe(
      finalize(()=> this.loaderService.hideLoader())
    )
    
  }

  // Function to decide when to show the loader
  private shouldShowLoader(req: HttpRequest<any>): boolean {
    // Example: Only show loader for specific URL patterns
    const urlIncludes = req.url.includes('/api/important-call');
    
    // Example: Only show loader for specific HTTP methods
    const isPostOrPut = req.method === 'POST' || req.method === 'PUT';

    // Return true or false based on the condition
    return urlIncludes && isPostOrPut;
  }

  // header approach
  shouldDisLoader(req:HttpRequest<any>):boolean{
    return req.headers.get('show-loader') === 'true'
  }
  
}
