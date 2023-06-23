import { Component, OnInit } from '@angular/core';
import { UserAccountService } from './services/user-account.service';
import { userModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user!: userModel

  constructor(private userAccountService: UserAccountService) { }
  ngOnInit(): void {
    
  }
}
