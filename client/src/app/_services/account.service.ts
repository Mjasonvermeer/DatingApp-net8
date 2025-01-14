import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../_models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService
{
  private http = inject(HttpClient);
  baselUrl = 'https://localhost:5101/api/';
  currentUser = signal<User | null>(null);

  login(model: any)
  {
    return this.http.post<User>(this.baselUrl + 'account/login', model).pipe(
      map((user) =>
      {
        if (user)
        {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
      })
    );
  }

  register(model: any)
  {
    return this.http.post<User>(this.baselUrl + 'account/register', model).pipe(
      map((user) =>
      {
        if (user)
        {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
        return user;
      })
    );
  }

  logout()
  {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
