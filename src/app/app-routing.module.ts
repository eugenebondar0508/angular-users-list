import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { UsersListComponent } from './components/users-list/users-list.component';


const routes: Routes = [
  {
    path:'', component: MainLayoutComponent, children: [
      {path: '', redirectTo:'/', pathMatch: 'full'},
      {path: '', component: UsersListComponent},
      {path: 'user/:id', component: UserPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
