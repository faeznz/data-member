// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private serverUrl = 'http://localhost:3000'; // Sesuaikan URL dengan server Express Anda
  private loggedIn = false; // Menyimpan status login pengguna

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.serverUrl}/login`, { username, password })
      .pipe(
        map(response => {
          // Simpan token JWT yang diterima dalam local storage atau cookie
          // Anda juga dapat menyimpan token di bidang lain yang sesuai dengan kebutuhan Anda
          localStorage.setItem('token', response.token);
          this.loggedIn = true;
          return response;
        })
      );
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('token'); // Hapus token dari local storage atau cookie
    this.router.navigate(['/login']); // Redirect ke halaman login setelah logout
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
