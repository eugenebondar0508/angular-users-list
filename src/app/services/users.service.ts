import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from "../interfaces";

Injectable(
    {
        providedIn: 'root'
    }
)

export class UsersService {
    constructor(private http: HttpClient) {
        
    }

    getAllUsers():Observable<User[]> {
        return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
    }

    getById(id:number):Observable<User> {
        return this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
    }

    update(user:User): Observable<User> {
        return this.http.patch<User>(`https://jsonplaceholder.typicode.com/users/${user.id}.json`, user)
    }
}