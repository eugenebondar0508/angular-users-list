import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces';
import { UsersService } from 'src/app/services/users.service';
import { switchMap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) { }

  user$: Observable<User>

  user: User
  form: FormGroup
  disabled = true
  updating = false

  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  ngOnInit() {
    this.route.params
    .pipe(switchMap((params: Params) => {
      return this.usersService.getById(params['id'])
    })).subscribe((user:User) => {
      this.user = user
      console.log(this.user)
      this.form = new FormGroup({
        name: new FormControl(user.name, Validators.required),
        username: new FormControl(user.username, Validators.required),
        email: new FormControl(user.email, [Validators.required, Validators.email]),
        street: new FormControl(user.address.street, Validators.required),
        city: new FormControl(user.address.city, Validators.required),
        zipcode: new FormControl(user.address.zipcode, Validators.required),
        phone: new FormControl(user.phone, [Validators.required, Validators.minLength(6)]),
        website: new FormControl(user.website, [Validators.required, Validators.pattern(this.reg)]),
        comment: new FormControl()
      })
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.updating = true
    this.usersService.update({
      ...this.user,
      name: this.form.value.name,
      username: this.form.value.username,
      email: this.form.value.email,
      address: {
        street:this.form.value.street,
        city:this.form.value.city,
        zipcode:this.form.value.zipcode
      },
      phone: this.form.value.phone,
      website: this.form.value.website,
    }).subscribe(() => {
      this.updating = false
      alert('Пользователь обновлен')
      this.disabled = true
      console.log(JSON.stringify({
        name: this.form.value.name,
        username: this.form.value.username,
        email: this.form.value.email,
        address: {
          street:this.form.value.street,
          city:this.form.value.city,
          zipcode:this.form.value.zipcode
        },
        phone: this.form.value.phone,
        website: this.form.value.website,
        comment: this.form.value.comment
      }))
    })

  }

  edit() {
    this.disabled = false
  }
}


