import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private nameSource: Subject<string> = new Subject();
  name$: Observable<string> = this.nameSource.asObservable();
  userSource :BehaviorSubject<object> = new BehaviorSubject(new Object())
  userDetails$:Observable<object> = this.userSource

  constructor(private http:HttpClient) { }

  updateName(userName: string): void {
    this.nameSource.next(userName);
  }

  getName(): Observable<string> {
    return this.name$;
  }

  setUser(user:Object): void {
    this.userSource.next(user);
  }
  getUser(): Observable<any> {
    this.get().then((res)=>{
        console.log(res,'qqqqqqqqqqqqqqqqqq')
    })
    return this.userDetails$
  }

  get():Promise<any> {
    const resp:Observable<any> = this.http.get('https://reqres.in/apii/users?page=1',{
      headers: new HttpHeaders({
        'X-Show-Loader': 'true'
      })
    })
    return lastValueFrom(resp)
  }


}
