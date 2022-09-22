import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  users: User[] 


  ngOnInit() {
    this.sortedByCity()
  }

  sortedByCity() {
    this.usersService.getAllUsers().subscribe(users => {
      this.users = users.sort((a, b) => {
        return a.address.city.localeCompare(b.address.city);
      })
    })
  }

  sortedByCompany() {
    this.usersService.getAllUsers().subscribe(users => {
      this.users = users.sort((a, b) => {
        return a.company.name.localeCompare(b.company.name);
      })
    })
  }

}
