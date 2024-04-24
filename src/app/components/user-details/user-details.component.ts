import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/interfaces/users';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userId!: number;
  userDetails: User | null = null; // Assuming this will hold the details of the user

  constructor(private _ActivatedRoute: ActivatedRoute, private _UserService: UsersService) { }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(params => {
      this.userId = params.get('id') ? Number(params.get('id')) : 0;
      this.getUserDetails(this.userId);
    });
  }

  getUserDetails(userId: number): void {
    this._UserService.getUserById(userId).subscribe({
      next: (user) => {
        this.userDetails = user.data;
      },
      error: (error) => {
        console.error('Error fetching user details:', error);
      }
    });
  }
}
