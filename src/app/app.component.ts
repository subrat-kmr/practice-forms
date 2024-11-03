import { Component, Sanitizer } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CommonService } from './service/common.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SignUpComponent } from "./user/sign-up/sign-up.component";
import { UserInfoComponent } from "./user/user-info/user-info.component";
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LoaderService } from './service/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,HttpClientModule, AsyncPipe, SignUpComponent, UserInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    { provide: CommonService, useClass: CommonService }
  ]
})
export class AppComponent {
  title = 'practice-forms';
  name$!:Observable<string>
  users$!:Observable<Object>
  userDetails!:any
  subscription: Subscription;
pipeNumber: any = 1234567890;
  imageUrl!: string;
  html: any;
  loading!: Observable<any>

  constructor(private localSVC:CommonService,
    private sanitizer:DomSanitizer,
    private loaderSVC:LoaderService){
    this.subscription = this.localSVC.getUser().subscribe((name) => {
      console.log('name is--------', name)
      this.userDetails = name})

    this.loading = this.loaderSVC.loading$
  }

  ngOnInit(): void {
    // this.imageUrl = 'https://reqres.in/img/faces/7-image.jpg';
    this.html = this.sanitizer.bypassSecurityTrustHtml('<p>Hello World!</p>');
      this.name$ = this.localSVC.getName()
      this.users$ = this.localSVC.getUser()

    
  }

  loadImage(imageURL:string){
    return this.sanitizer.bypassSecurityTrustUrl(imageURL)
  }


  

}
