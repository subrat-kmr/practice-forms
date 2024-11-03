import { Component } from '@angular/core';
import { UserInfo } from '../../models/user-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
  userInfo: UserInfo = new UserInfo()
}
