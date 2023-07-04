import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  username!: string;
  password!: string;
  errorMessage!: string;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        console.log('Login successful');
        alert('Login berhasil, Selamat datang!'); // Menampilkan pesan selamat datang
        this.router.navigate(['/members']); // Contoh: Redirect ke halaman members setelah login berhasil
      },
      error => {
        console.error('Login error', error);
        alert('Login gagal!'); // Menampilkan pesan login gagal
      }
    );
  }
  
}
