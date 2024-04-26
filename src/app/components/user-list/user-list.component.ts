import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse, User } from 'src/app/core/interfaces/users';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['avatar', 'id', 'firstName', 'lastName'];

  usersData: any[] = [];
  currentPageIndex: number = 1;
  previousPageIndex: number = 0;
  usersPerPage: number = 0;
  totalUsers: number = 0;
  pageInfo: ApiResponse = {} as ApiResponse;
  searchValue: string = '';

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  constructor(private _UsersService: UsersService) {
    // this.usersData = new MatTableDataSource<User>();
  }

  ngOnInit() {
    this.fetchData(this.currentPageIndex);
  }

  fetchData(pageIndex: number) {
    this._UsersService.getUsers(pageIndex).subscribe({
      next: (response) => {
        this.usersData = response.data;
        // this.usersData.sort = this.sort;
        // this.usersData.paginator = this.paginator;
        this.totalUsers = response.total;
        this.usersPerPage = response.per_page;
        this.pageInfo = response;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
    });
  }

  pageChanged(event: number): void {
    this.currentPageIndex = event;
    this.fetchData(this.currentPageIndex);
  }


}
