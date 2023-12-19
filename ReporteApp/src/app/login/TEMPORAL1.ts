import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginObj: any = {
    "CorreoUser": "",
    "PassUser": ""
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // Verifica si el usuario ya ha iniciado sesión al cargar el componente
    if (this.isUserLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  onLogin() {
    this.http.post('http://localhost:5124/api/Autenticacion/Validar', this.loginObj).subscribe({
      next: (res: any) => {
        if (res.result) {
          alert("Inicio de sesión exitoso: " + res.message);
          localStorage.setItem('LoginToken', res.data.token);
          localStorage.setItem('Correo', res.data.correo);
          localStorage.setItem('NombreUsuario', res.data.nombre);
          localStorage.setItem('Identificador', res.data.iduser);
          this.router.navigateByUrl('/home');
        } else {
          alert("Error al iniciar sesión: " + res.message);
        }
      },
      error: (error: any) => {
        console.error("Error en la petición HTTP:", error);
      },
    });
  }

  private isUserLoggedIn(): boolean {
    return localStorage.getItem('LoginToken') !== null;
  }
}
